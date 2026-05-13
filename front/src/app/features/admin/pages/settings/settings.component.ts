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
  newPhone = ''

  form = {
    email: '',
    phones: [] as string[],
    instagramUrl: '',
    facebookUrl: '',
  }

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadSettings()
  }

  loadSettings() {
    this.api.getSettings().subscribe((data) => {
      if (data) {
        this.settings = data
        this.form = {
          email: data.email || '',
          phones: data.phones || [],
          instagramUrl: data.instagramUrl || '',
          facebookUrl: data.facebookUrl || '',
        }
        this.cdr.detectChanges()
      }
    })
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

  save() {
    if (this.settings) {
      this.api.updateSettings(this.settings.id, this.form).subscribe({
        next: (data) => {
          this.settings = data
          this.toast.success('Coordonnées enregistrées avec succès')
          this.cdr.detectChanges()
        },
        error: () => this.toast.error("Erreur lors de l'enregistrement"),
      })
    } else {
      this.api.updateSettings(0, this.form).subscribe({
        next: (data) => {
          this.settings = data
          this.toast.success('Coordonnées enregistrées avec succès')
          this.cdr.detectChanges()
        },
        error: () => this.toast.error("Erreur lors de l'enregistrement"),
      })
    }
  }
}
