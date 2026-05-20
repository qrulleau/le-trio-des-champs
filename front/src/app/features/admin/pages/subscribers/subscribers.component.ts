import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribers.component.html',
})
export class SubscribersComponent implements OnInit {
  subscribers: any[] = []
  cities: any[] = []
  search = ''
  newPhone = ''
  newCityIds: number[] = []

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.api.getSubscribers().subscribe((data) => {
      this.subscribers = Array.isArray(data) ? data : ((data as any)?.data ?? [])
      this.cdr.detectChanges()
    })
    this.api.getCities().subscribe((data) => {
      this.cities = data
      this.cdr.detectChanges()
    })
  }

  get filtered() {
    const q = this.search.toLowerCase().trim()
    if (!q) return this.sorted
    return this.sorted.filter((s) => s.phone?.toLowerCase().includes(q))
  }

  get sorted() {
    return [...this.subscribers].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  get recentCount() {
    return this.subscribers.filter(
      (s) => Date.now() - new Date(s.createdAt).getTime() < 1000 * 60 * 60 * 24 * 30
    ).length
  }

  get activeCount() {
    return this.subscribers.filter((s) => s.active !== false).length
  }

  getCityChips(sub: any): any[] {
    return (sub.cities || []).map((c: any) => {
      if (typeof c === 'object') return c
      const city = this.cities.find((x) => x.id === parseInt(c) || x.name === c)
      return city || { name: c, color: 'var(--ink-mute)' }
    })
  }

  toggleActive(sub: any) {
    this.api.updateSubscriber(sub.id, { active: !sub.active }).subscribe({
      next: () => {
        this.toast.success('Statut mis à jour')
        this.loadData()
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  toggleNewCity(cityId: number) {
    this.newCityIds = this.newCityIds.includes(cityId)
      ? this.newCityIds.filter((id) => id !== cityId)
      : [...this.newCityIds, cityId]
  }

  addSubscriber() {
    if (!this.newPhone.trim()) {
      this.toast.warning('Renseignez un numéro.')
      return
    }
    if (this.newCityIds.length === 0) {
      this.toast.warning('Choisissez au moins une ville.')
      return
    }
    this.api.createSubscriber({ phone: this.newPhone, cityIds: this.newCityIds }).subscribe({
      next: () => {
        this.toast.success('Abonné ajouté')
        this.newPhone = ''
        this.newCityIds = []
        this.loadData()
      },
      error: (err) => {
        if (err.status === 409) this.toast.info('Ce numéro est déjà inscrit.')
        else this.toast.error('Erreur')
      },
    })
  }

  async copyNumbers() {
    const list = this.subscribers
      .filter((s) => s.active !== false)
      .map((s) => s.phone)
      .join(', ')
    try {
      await navigator.clipboard.writeText(list)
      this.toast.success('Numéros copiés !')
    } catch {
      this.toast.error('Impossible de copier')
    }
  }

  exportCSV() {
    const rows = [['phone', 'villes', 'inscrit_le', 'actif']]
    this.subscribers.forEach((s) =>
      rows.push([
        s.phone,
        this.getCityChips(s)
          .map((c: any) => c.name)
          .join('; '),
        new Date(s.createdAt).toLocaleDateString('fr-FR'),
        s.active !== false ? 'oui' : 'non',
      ])
    )
    const csv = rows
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'abonnes-sms.csv'
    a.click()
  }

  delete(id: number) {
    if (!confirm('Supprimer cet abonné ? Action irréversible.')) return
    this.api.deleteSubscriber(id).subscribe({
      next: () => {
        this.toast.success('Abonné supprimé')
        this.loadData()
      },
      error: () => this.toast.error('Erreur'),
    })
  }
}
