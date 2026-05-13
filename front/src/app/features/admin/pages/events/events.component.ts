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
  events: any[] = []
  cities: any[] = []

  showForm = false
  editingEvent: any = null

  formDay = ''
  formMonth = ''
  formYear = ''

  days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))
  months = [
    { value: '01', label: 'Janvier' },
    { value: '02', label: 'Février' },
    { value: '03', label: 'Mars' },
    { value: '04', label: 'Avril' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Juin' },
    { value: '07', label: 'Juillet' },
    { value: '08', label: 'Août' },
    { value: '09', label: 'Septembre' },
    { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Décembre' },
  ]
  years = Array.from({ length: 5 }, (_, i) => String(new Date().getFullYear() + i))

  form = {
    title: '',
    location: '',
    description: '',
    date: '',
    isRecurring: false,
  }

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadEvents()
    this.loadCities()
  }

  loadEvents() {
    this.api.getEvents().subscribe((data) => {
      this.events = [...data]
      this.cdr.detectChanges()
    })
  }

  loadCities() {
    this.api.getCities().subscribe((data) => {
      this.cities = [...data]
      this.cdr.detectChanges()
    })
  }

  openForm(event?: any) {
    if (event) {
      this.editingEvent = event
      this.form = {
        title: event.title,
        location: event.location,
        description: event.description || '',
        date: event.date?.split('T')[0] || '',
        isRecurring: event.isRecurring || false,
      }
      if (event.date) {
        const parts = event.date.split('T')[0].split('-')
        this.formYear = parts[0]
        this.formMonth = parts[1]
        this.formDay = parts[2]
      }
    } else {
      this.editingEvent = null
      this.form = { title: '', location: '', description: '', date: '', isRecurring: false }
      this.formDay = ''
      this.formMonth = ''
      this.formYear = ''
    }
    this.showForm = true
  }

  closeForm() {
    this.showForm = false
    this.editingEvent = null
  }

  submit() {
    this.form.date = `${this.formYear}-${this.formMonth}-${this.formDay}`
    if (this.editingEvent) {
      this.api.updateEvent(this.editingEvent.id, this.form).subscribe({
        next: () => {
          this.toast.success('Événement modifié avec succès')
          this.loadEvents()
          this.closeForm()
        },
        error: () => this.toast.error('Erreur lors de la modification'),
      })
    } else {
      this.api.createEvent(this.form).subscribe({
        next: () => {
          this.toast.success('Événement ajouté avec succès')
          this.loadEvents()
          this.closeForm()
        },
        error: () => this.toast.error("Erreur lors de l'ajout"),
      })
    }
  }

  delete(id: number) {
    this.api.deleteEvent(id).subscribe({
      next: () => {
        this.toast.success('Événement supprimé')
        this.loadEvents()
      },
      error: () => this.toast.error('Erreur lors de la suppression'),
    })
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }
}
