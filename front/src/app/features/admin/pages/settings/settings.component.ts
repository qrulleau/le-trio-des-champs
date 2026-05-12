import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'

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

  constructor(private api: ApiService) {}

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
      this.api.updateSettings(this.settings.id, this.form).subscribe((data) => {
        this.settings = data
      })
    } else {
      this.api.updateSettings(0, this.form).subscribe((data) => {
        this.settings = data
      })
    }
  }
}
