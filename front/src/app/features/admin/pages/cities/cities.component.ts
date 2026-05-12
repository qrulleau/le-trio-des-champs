import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cities.component.html',
})
export class CitiesComponent implements OnInit {
  cities: any[] = []
  showForm = false
  editingCity: any = null
  cityToDelete: number | null = null

  suggestedColors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33F5',
    '#FFD700', '#00CED1', '#FF8C00', '#8A2BE2',
    '#00FF7F', '#FF1493',
  ]

  form = {
    name: '',
    color: '#FF5733',
  }

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCities()
  }

  loadCities() {
    this.api.getCities().subscribe((data) => {
      this.cities = [...data]
      this.cdr.detectChanges()
    })
  }

  openForm(city?: any) {
    if (city) {
      this.editingCity = city
      this.form = { ...city }
    } else {
      this.editingCity = null
      this.form = { name: '', color: '#FF5733' }
    }
    this.showForm = true
  }

  closeForm() {
    this.showForm = false
    this.editingCity = null
  }

  submit() {
    if (this.editingCity) {
      this.api.updateCity(this.editingCity.id, this.form).subscribe({
        next: () => {
          this.toast.success('Ville modifiée avec succès')
          this.loadCities()
          this.closeForm()
        },
        error: () => this.toast.error('Erreur lors de la modification'),
      })
    } else {
      this.api.createCity(this.form).subscribe({
        next: () => {
          this.toast.success('Ville ajoutée avec succès')
          this.loadCities()
          this.closeForm()
        },
        error: () => this.toast.error('Erreur lors de l\'ajout'),
      })
    }
  }

  confirmDelete(id: number) {
    this.cityToDelete = id
  }

  cancelDelete() {
    this.cityToDelete = null
  }

  delete() {
    if (this.cityToDelete) {
      this.api.deleteCity(this.cityToDelete).subscribe({
        next: () => {
          this.toast.success('Ville supprimée avec succès')
          this.cityToDelete = null
          this.loadCities()
        },
        error: () => this.toast.error('Erreur lors de la suppression'),
      })
    }
  }
}
