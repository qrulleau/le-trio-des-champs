import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {
  events: any[] = []
  showForm = false
  editingEvent: any = null

  form = {
    title: '',
    location: '',
    description: '',
    date: '',
    isRecurring: false,
  }

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadEvents()
  }

  loadEvents() {
    this.api.getEvents().subscribe((data) => (this.events = data))
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
    } else {
      this.editingEvent = null
      this.form = { title: '', location: '', description: '', date: '', isRecurring: false }
    }
    this.showForm = true
  }

  closeForm() {
    this.showForm = false
    this.editingEvent = null
  }

  submit() {
    if (this.editingEvent) {
      this.api.updateEvent(this.editingEvent.id, this.form).subscribe(() => {
        this.loadEvents()
        this.closeForm()
      })
    } else {
      this.api.createEvent(this.form).subscribe(() => {
        this.loadEvents()
        this.closeForm()
      })
    }
  }

  delete(id: number) {
    if (confirm('Supprimer cet événement ?')) {
      this.api.deleteEvent(id).subscribe(() => this.loadEvents())
    }
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
