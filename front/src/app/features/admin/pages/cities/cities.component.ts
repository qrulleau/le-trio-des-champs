import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'

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

  suggestedColors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33F5',
    '#FFD700', '#00CED1', '#FF8C00', '#8A2BE2',
    '#00FF7F', '#FF1493',
  ]

  form = {
    name: '',
    color: '#FF5733',
  }

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCities()
  }

  loadCities() {
    this.api.getCities().subscribe((data) => (this.cities = data))
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
      this.api.updateCity(this.editingCity.id, this.form).subscribe(() => {
        this.loadCities()
        this.closeForm()
      })
    } else {
      this.api.createCity(this.form).subscribe(() => {
        this.loadCities()
        this.closeForm()
      })
    }
  }

  delete(id: number) {
    if (confirm('Supprimer cette ville ?')) {
      this.api.deleteCity(id).subscribe(() => this.loadCities())
    }
  }
}
