import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ApiService } from '../../core/services/api.service'
import { ToastService } from '../../core/services/toast.service'
import { environment } from '../../../environments/environment'
import { NavbarComponent } from '../../shared/components/navbar/navbar.component'
import { FooterComponent } from '../../shared/components/footer/footer.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  baseUrl = environment.apiUrl.replace('/api/v1', '')
  products: any[] = []
  events: any[] = []
  sellingPlaces: any[] = []
  cities: any[] = []
  announcement: any = null

  currentMonth = new Date().getMonth() + 1
  currentYear = new Date().getFullYear()

  subscribeForm = {
    phone: '',
    cityIds: [] as number[],
  }
  subscribeSuccess = false
  subscribeError = ''

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.api.getProducts().subscribe((data) => {
      this.products = [...data]
      this.cdr.detectChanges()
    })
    this.api.getSellingPlaces().subscribe((data) => {
      this.sellingPlaces = [...data]
      this.cdr.detectChanges()
    })
    this.api.getCities().subscribe((data) => {
      this.cities = [...data]
      this.cdr.detectChanges()
    })
    this.api.getEvents(this.currentMonth, this.currentYear).subscribe((data) => {
      this.events = [...data]
      this.cdr.detectChanges()
    })
    this.api.getAnnouncement().subscribe((data) => {
      this.announcement = data
      this.cdr.detectChanges()
    })
  }

  toggleCity(cityId: number) {
    this.subscribeForm.cityIds = this.subscribeForm.cityIds.includes(cityId)
      ? this.subscribeForm.cityIds.filter((id) => id !== cityId)
      : [...this.subscribeForm.cityIds, cityId]
  }

  isCitySelected(cityId: number): boolean {
    return this.subscribeForm.cityIds.includes(cityId)
  }

  subscribe() {
    if (!this.subscribeForm.phone || this.subscribeForm.cityIds.length === 0) {
      this.toast.warning('Veuillez remplir votre numéro et sélectionner au moins une ville.')
      return
    }
    this.api.createSubscriber(this.subscribeForm).subscribe({
      next: () => {
        this.subscribeSuccess = true
        this.subscribeForm = { phone: '', cityIds: [] }
        this.toast.success('Inscription confirmée !')
      },
      error: (err) => {
        if (err.status === 409)
          this.toast.info('Ce numéro est déjà inscrit. Vos villes ont été mises à jour.')
        else if (err.status === 422)
          this.toast.error('Numéro invalide. Format attendu : 06XXXXXXXX ou 07XXXXXXXX')
        else this.toast.error('Une erreur est survenue, veuillez réessayer.')
      },
    })
  }

  prevMonth() {
    if (this.currentMonth === 1) {
      this.currentMonth = 12
      this.currentYear--
    } else this.currentMonth--
    this.api.getEvents(this.currentMonth, this.currentYear).subscribe((data) => {
      this.events = [...data]
      this.cdr.detectChanges()
    })
  }

  nextMonth() {
    if (this.currentMonth === 12) {
      this.currentMonth = 1
      this.currentYear++
    } else this.currentMonth++
    this.api.getEvents(this.currentMonth, this.currentYear).subscribe((data) => {
      this.events = [...data]
      this.cdr.detectChanges()
    })
  }

  getMonthName(month: number, year: number): string {
    return new Date(year, month - 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  }

  getCityColor(location: string): string {
    const city = this.cities.find((c) => c.name === location)
    return city ? city.color : '#2d4a2f'
  }

  getPriceAmount(price: string): string {
    const match = price.match(/^[\d,.]+ ?€/)
    return match ? match[0] : price
  }

  getPriceUnit(price: string): string {
    return price.replace(/^[\d,.]+ ?€ ?/, '').trim()
  }
}
