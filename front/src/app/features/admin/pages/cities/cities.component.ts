import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs'

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cities.component.html',
})
export class CitiesComponent implements OnInit {
  cities: any[] = []
  dates: any[] = []
  reservations: any[] = []
  editingId: number | null = null
  suggestions: string[] = []
  searchSubject = new Subject<string>()
  today = new Date().toISOString().split('T')[0]

  themeColors = [
    { label: 'Vert', swatch: '#2d4a2f' },
    { label: 'Terra cotta', swatch: '#b85c3a' },
    { label: 'Dore', swatch: '#c9943c' },
    { label: 'Brun fonce', swatch: '#231911' },
    { label: 'Brun', swatch: '#5a4a3d' },
    { label: 'Brun clair', swatch: '#8a7868' },
  ]

  newCity = { name: '', address: '', type: 'tournee', color: '#2d4a2f' }

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private http = inject(HttpClient)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadData()
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query.length < 2) return []
          return this.http.get<any[]>(
            `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom&boost=population&limit=5`
          )
        })
      )
      .subscribe((results) => {
        this.suggestions = results.map((r) => r.nom)
        this.cdr.detectChanges()
      })
  }

  loadData() {
    this.api.getCities().subscribe((data) => {
      this.cities = [...data]
      this.cdr.detectChanges()
    })
    this.api.getDistributionDates().subscribe((data) => {
      this.dates = data
      this.cdr.detectChanges()
    })
    this.api.getReservations().subscribe((data) => {
      this.reservations = (data as any)?.data ?? data ?? []
      this.cdr.detectChanges()
    })
  }

  onCitySearch(value: string) {
    this.searchSubject.next(value)
  }
  selectSuggestion(name: string) {
    this.newCity.name = name
    this.suggestions = []
  }

  get permanenceCount() {
    return this.cities.filter((c) => c.type === 'permanence').length
  }
  get tourneeCount() {
    return this.cities.filter((c) => c.type === 'tournee').length
  }

  upcomingDatesForCity(cityId: number) {
    return this.dates.filter((d) => d.cityId === cityId && d.date >= this.today).length
  }

  reservationsForCity(cityId: number) {
    const dateIds = this.dates.filter((d) => d.cityId === cityId).map((d) => d.id)
    return this.reservations.filter(
      (r) => dateIds.includes(r.distributionDateId) && r.status !== 'cancelled'
    ).length
  }

  addCity() {
    if (!this.newCity.name.trim()) {
      this.toast.warning('Renseignez au moins un nom.')
      return
    }
    this.api.createCity(this.newCity).subscribe({
      next: () => {
        this.toast.success('Ville ajoutée')
        this.newCity = { name: '', address: '', type: 'tournee', color: '#2d4a2f' }
        this.loadData()
      },
      error: () => this.toast.error("Erreur lors de l'ajout"),
    })
  }

  startEdit(city: any) {
    this.editingId = city.id
  }
  cancelEdit() {
    this.editingId = null
    this.loadData()
  }

  saveEdit(city: any) {
    this.api
      .updateCity(city.id, {
        name: city.name,
        address: city.address,
        type: city.type,
        color: city.color,
      })
      .subscribe({
        next: () => {
          this.toast.success('Ville mise à jour')
          this.editingId = null
          this.loadData()
        },
        error: () => this.toast.error('Erreur'),
      })
  }

  delete(id: number) {
    if (!confirm('Supprimer cette ville ? Les dates associées seront supprimées.')) return
    this.api.deleteCity(id).subscribe({
      next: () => {
        this.toast.success('Ville supprimée')
        this.loadData()
      },
      error: () => this.toast.error('Erreur'),
    })
  }
}
