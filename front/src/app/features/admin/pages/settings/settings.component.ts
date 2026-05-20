import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  settings: any = null
  people: any[] = []
  newPhone = ''

  form = {
    headline: '',
    lead: '',
    email: '',
    phones: [] as string[],
  }

  newPerson = { name: '', role: '', phone: '' }

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.api.getSettings().subscribe((data) => {
      if (data) {
        this.settings = data
        this.form = {
          headline: data.headline || '',
          lead: data.lead || '',
          email: data.email || '',
          phones:
            typeof data.phones === 'string' ? JSON.parse(data.phones || '[]') : data.phones || [],
        }
        this.cdr.detectChanges()
      }
    })
    this.api.getContactPeople().subscribe((data) => {
      this.people = Array.isArray(data) ? data : ((data as any)?.data ?? [])
      this.cdr.detectChanges()
    })
  }

  get phonesList(): string[] {
    if (!this.form.phones) return []
    if (typeof this.form.phones === 'string') {
      try {
        return JSON.parse(this.form.phones as any)
      } catch {
        return []
      }
    }
    return this.form.phones
  }

  addPhone() {
    if (this.newPhone.trim()) {
      this.form.phones = [...this.form.phones, this.newPhone.trim()]
      this.newPhone = ''
    }
  }

  removePhone(index: number) {
    this.form.phones = this.form.phones.filter((_, i) => i !== index)
  }

  saveSettings() {
    const action = this.settings
      ? this.api.updateSettings(this.settings.id, this.form)
      : this.api.createSettings(this.form)
    action.subscribe({
      next: (response) => {
        this.settings = response
        this.toast.success('Enregistré')
        this.cdr.detectChanges()
      },
      error: () => this.toast.error("Erreur lors de l'enregistrement"),
    })
  }

  addPerson() {
    if (!this.newPerson.name.trim() || !this.newPerson.phone.trim()) {
      this.toast.warning('Nom et téléphone requis.')
      return
    }
    this.api.createContactPerson(this.newPerson).subscribe({
      next: () => {
        this.toast.success('Personne ajoutée')
        this.newPerson = { name: '', role: '', phone: '' }
        this.loadData()
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  updatePerson(person: any) {
    this.api
      .updateContactPerson(person.id, { name: person.name, role: person.role, phone: person.phone })
      .subscribe({
        next: () => this.toast.success('Mis à jour'),
        error: () => this.toast.error('Erreur'),
      })
  }

  deletePerson(id: number) {
    if (!confirm('Retirer cette personne ?')) return
    this.api.deleteContactPerson(id).subscribe({
      next: () => {
        this.toast.success('Supprimé')
        this.loadData()
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  get previewHeadline(): string {
    return this.form.headline.replace(/\*([^*]+)\*/g, '$1')
  }
}
