import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule, Router } from '@angular/router'
import { ApiService } from '../../core/services/api.service'
import { AuthService } from '../../core/services/auth.service'
import { ToastService } from '../../core/services/toast.service'

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reservation.component.html',
})
export class ReservationComponent implements OnInit {
  lieux: any[] = []
  dates: any[] = []
  products: any[] = []
  Math = Math

  selectedLieu: any = null
  selectedDate: any = null
  items: { productId: number; qty: number; product: any }[] = []

  step: 'lieu' | 'date' | 'products' | 'confirm' | 'success' = 'lieu'

  private api = inject(ApiService)
  private auth = inject(AuthService)
  private router = inject(Router)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'])
      return
    }
    this.loadData()
  }

  loadData() {
    this.api.getLieux().subscribe((data) => {
      this.lieux = [...data]
      this.cdr.detectChanges()
    })
    this.api.getDates().subscribe((data) => {
      this.dates = [...data]
      this.cdr.detectChanges()
    })
    this.api.getProducts().subscribe((data) => {
      this.products = [...data]
      this.cdr.detectChanges()
    })
  }

  getDatesForLieu(lieuId: number) {
    const today = new Date().toISOString().split('T')[0]
    return this.dates.filter((d) => d.lieuId === lieuId && d.date >= today)
  }

  selectLieu(lieu: any) {
    this.selectedLieu = lieu
    this.selectedDate = null
    this.step = 'date'
  }

  selectDate(date: any) {
    this.selectedDate = date
    this.items = this.products.map((p) => ({ productId: p.id, qty: 0, product: p }))
    this.step = 'products'
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      const price = parseFloat(item.product.price) || 0
      return total + price * item.qty
    }, 0)
  }

  hasItems(): boolean {
    return this.items.some((i) => i.qty > 0)
  }

  goToConfirm() {
    if (!this.hasItems()) {
      this.toast.warning('Sélectionnez au moins un produit.')
      return
    }
    this.step = 'confirm'
  }

  confirm() {
    const payload = {
      dateId: this.selectedDate.id,
      items: this.items
        .filter((i) => i.qty > 0)
        .map((i) => ({
          productId: i.productId,
          qty: i.qty,
        })),
    }
    this.api.createReservation(payload).subscribe({
      next: () => {
        this.step = 'success'
        this.toast.success('Réservation confirmée !')
      },
      error: () => {
        this.toast.error('Erreur lors de la réservation.')
      },
    })
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  reset() {
    this.selectedLieu = null
    this.selectedDate = null
    this.items = []
    this.step = 'lieu'
  }
}
