import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs'

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
  suggestions: string[] = []
  searchSubject = new Subject<string>()

  suggestedColors = [
    '#2d4a2f', // vert accent
    '#b85c3a', // terra cotta
    '#c9943c', // doré
    '#5a4a3d', // brun
    '#8a7868', // brun clair
    '#ebe1cf', // beige
    '#231911', // ink
  ]

  form = {
    name: '',
    color: '#FF5733',
  }

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private http = inject(HttpClient)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadCities()
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query.length < 2) return []
          return this.http.get<any[]>(
            `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom&boost=population&limit=5`
          )
        })
      )
      .subscribe((results) => {
        this.suggestions = results.map((r) => r.nom)
        this.cdr.detectChanges()
      })
  }

  onCitySearch(value: string) {
    this.searchSubject.next(value)
  }

  selectSuggestion(name: string) {
    this.form.name = name
    this.suggestions = []
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
    this.suggestions = []
    this.showForm = true
  }

  closeForm() {
    this.showForm = false
    this.editingCity = null
    this.suggestions = []
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
        error: () => this.toast.error("Erreur lors de l'ajout"),
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
