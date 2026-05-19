import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ApiService } from '../../../../core/services/api.service'
import { AuthService } from '../../../../core/services/auth.service'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService)
  private auth = inject(AuthService)
  private cdr = inject(ChangeDetectorRef)

  userName = this.auth.userName()
  today = new Date().toISOString().split('T')[0]

  reservations: any[] = []
  distributionDates: any[] = []
  subscribers: any[] = []
  products: any[] = []

  ngOnInit() {
    this.api.getDistributionDates().subscribe((data) => {
      this.distributionDates = data
      this.cdr.detectChanges()
    })
    this.api.getReservations().subscribe((data) => {
      this.reservations = (data as any)?.data ?? data ?? []
      this.cdr.detectChanges()
    })
    this.api.getSubscribers().subscribe((data) => {
      this.subscribers = (data as any)?.data ?? data ?? []
      this.cdr.detectChanges()
    })
    this.api.getProducts().subscribe((data) => {
      this.products = data
      this.cdr.detectChanges()
    })
  }

  get upcomingDates() {
    return this.distributionDates
      .filter((d) => d.date >= this.today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 6)
  }

  get recentReservations() {
    return [...this.reservations]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }

  get pendingCount() {
    return this.reservations.filter((r) => r.status === 'pending').length
  }
  get confirmedCount() {
    return this.reservations.filter((r) => r.status === 'confirmed').length
  }
  get activeSubscribers() {
    return this.subscribers.filter((s) => s.active !== false).length
  }
  get totalRevenue() {
    return this.reservations
      .filter((r) => r.status !== 'cancelled')
      .reduce((s, r) => s + parseFloat(r.total || 0), 0)
      .toFixed(2)
  }

  get topProducts() {
    const totals: any = {}
    this.reservations
      .filter((r) => r.status !== 'cancelled')
      .forEach((r) => {
        ;(r.items || []).forEach((it: any) => {
          totals[it.productId] = (totals[it.productId] || 0) + it.qty
        })
      })
    return this.products
      .map((p) => ({ ...p, qty: totals[p.id] || 0 }))
      .sort((a, b) => b.qty - a.qty)
  }

  get maxQty() {
    return Math.max(1, ...this.topProducts.map((p) => p.qty))
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  getStatusStyle(status: string): string {
    if (status === 'confirmed') return 'background:var(--accent);color:var(--paper)'
    if (status === 'cancelled') return 'background:var(--bg-2);color:var(--ink-mute)'
    return 'background:var(--accent-3);color:var(--ink)'
  }

  getStatusLabel(status: string): string {
    const map: any = { pending: 'en attente', confirmed: 'confirmée', cancelled: 'annulée' }
    return map[status] ?? status
  }
}
