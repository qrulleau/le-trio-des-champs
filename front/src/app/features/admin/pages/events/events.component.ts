import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {
  dates: any[] = []
  cities: any[] = []
  viewMode: 'month' | 'list' = 'month'

  cursor = new Date()
  today = new Date().toISOString().split('T')[0]

  newDate = {
    cityId: '',
    date: '',
    time: '17h00 – 19h00',
    capacity: 80,
    notes: '',
  }

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.cursor.setDate(1)
    this.loadData()
  }

  loadData() {
    this.api.getDistributionDates().subscribe((data) => {
      this.dates = data
      this.cdr.detectChanges()
    })
    this.api.getCities().subscribe((data) => {
      this.cities = data
      this.cdr.detectChanges()
    })
  }

  get monthLabel() {
    return this.cursor.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  }

  get upcomingCount() {
    return this.dates.filter((d) => d.date >= this.today).length
  }
  get permanenceCount() {
    return this.dates.filter((d) => d.city?.type === 'permanence').length
  }
  get tourneeCount() {
    return this.dates.filter((d) => d.city?.type === 'tournee').length
  }

  prevMonth() {
    this.cursor = new Date(this.cursor.getFullYear(), this.cursor.getMonth() - 1, 1)
    this.cdr.detectChanges()
  }
  nextMonth() {
    this.cursor = new Date(this.cursor.getFullYear(), this.cursor.getMonth() + 1, 1)
    this.cdr.detectChanges()
  }
  goToday() {
    this.cursor = new Date()
    this.cursor.setDate(1)
    this.cdr.detectChanges()
  }

  get calendarCells(): any[] {
    const year = this.cursor.getFullYear()
    const month = this.cursor.getMonth()
    const firstDow = (new Date(year, month, 1).getDay() + 6) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const prevDays = new Date(year, month, 0).getDate()
    const cells: any[] = []

    for (let i = firstDow - 1; i >= 0; i--) {
      cells.push({ day: prevDays - i, current: false, iso: '' })
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const events = this.dates.filter((x) => x.date?.startsWith(iso))
      cells.push({ day: d, current: true, iso, events, isToday: iso === this.today })
    }
    const tail = (7 - (cells.length % 7)) % 7
    for (let i = 1; i <= tail; i++) cells.push({ day: i, current: false, iso: '' })
    return cells
  }

  get sortedDates() {
    return [...this.dates].sort((a, b) => (a.date || '').localeCompare(b.date || ''))
  }

  addDate() {
    if (!this.newDate.cityId || !this.newDate.date) {
      this.toast.warning('Choisissez une ville et une date.')
      return
    }
    this.api
      .createDistributionDate({
        cityId: Number(this.newDate.cityId),
        date: this.newDate.date,
        time: this.newDate.time,
        capacity: this.newDate.capacity,
        notes: this.newDate.notes,
      })
      .subscribe({
        next: () => {
          this.toast.success('Date ajoutée')
          this.newDate = { cityId: '', date: '', time: '17h00 – 19h00', capacity: 80, notes: '' }
          this.loadData()
        },
        error: () => this.toast.error("Erreur lors de l'ajout"),
      })
  }

  deleteDate(id: number) {
    if (!confirm('Supprimer cette date ? Les réservations associées seront supprimées.')) return
    this.api.deleteDistributionDate(id).subscribe({
      next: () => {
        this.toast.success('Date supprimée')
        this.loadData()
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }
}
