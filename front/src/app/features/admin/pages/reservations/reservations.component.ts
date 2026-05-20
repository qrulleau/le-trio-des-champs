import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.component.html',
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = []
  filter: 'all' | 'pending' | 'confirmed' | 'cancelled' = 'all'

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadReservations()
  }

  loadReservations() {
    this.api.getReservations().subscribe((data) => {
      this.reservations = (data as any)?.data ?? data ?? []
      this.cdr.detectChanges()
    })
  }

  get filtered() {
    if (this.filter === 'all') return this.sorted
    return this.sorted.filter((r) => r.status === this.filter)
  }

  get sorted() {
    return [...this.reservations].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  get pendingCount() {
    return this.reservations.filter((r) => r.status === 'pending').length
  }
  get confirmedCount() {
    return this.reservations.filter((r) => r.status === 'confirmed').length
  }
  get cancelledCount() {
    return this.reservations.filter((r) => r.status === 'cancelled').length
  }
  get totalRevenue() {
    return this.reservations
      .filter((r) => r.status !== 'cancelled')
      .reduce((s, r) => s + parseFloat(r.total || 0), 0)
      .toFixed(2)
  }

  confirm(id: number) {
    this.api.updateReservation(id, { status: 'confirmed' }).subscribe({
      next: () => {
        this.toast.success('Réservation confirmée')
        this.loadReservations()
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  cancel(id: number) {
    if (!confirm('Annuler cette réservation ?')) return
    this.api.updateReservation(id, { status: 'cancelled' }).subscribe({
      next: () => {
        this.toast.success('Réservation annulée')
        this.loadReservations()
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  delete(id: number) {
    if (!confirm('Supprimer définitivement ?')) return
    this.api.deleteReservation(id).subscribe({
      next: () => {
        this.toast.success('Supprimée')
        this.loadReservations()
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  getStatusStyle(status: string): string {
    if (status === 'confirmed') return 'background:var(--accent);color:var(--paper)'
    if (status === 'cancelled') return 'background:var(--bg-2);color:var(--ink-mute)'
    return 'background:var(--accent-3);color:var(--ink)'
  }

  getStatusLabel(status: string): string {
    const map: any = { pending: 'En attente', confirmed: 'Confirmée', cancelled: 'Annulée' }
    return map[status] ?? status
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  timeAgo(dateStr: string): string {
    const s = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
    if (s < 60) return "à l'instant"
    if (s < 3600) return `il y a ${Math.floor(s / 60)} min`
    if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`
    return `il y a ${Math.floor(s / 86400)} j`
  }

  exportCSV() {
    const rows = [
      ['id', 'client', 'email', 'date', 'ville', 'produits', 'total', 'statut', 'creee_le'],
    ]
    this.reservations.forEach((r) => {
      rows.push([
        r.id,
        r.user?.fullName || '',
        r.user?.email || '',
        r.distributionDate?.date || '',
        r.distributionDate?.city?.name || '',
        (r.items || []).map((it: any) => `${it.product?.name || '?'} x${it.qty}`).join('; '),
        r.total,
        r.status,
        new Date(r.createdAt).toLocaleString('fr-FR'),
      ])
    })
    const csv = rows
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'reservations.csv'
    a.click()
  }
}
