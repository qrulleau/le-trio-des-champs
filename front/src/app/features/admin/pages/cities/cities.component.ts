import { Component, OnInit, ChangeDetectorRef, inject, NgZone } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'
import { debounceTime, distinctUntilChanged, forkJoin, Subject, switchMap } from 'rxjs'

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cities.component.html',
})
export class CitiesComponent implements OnInit {
  cities: any[] = []
  dates: any[] = []
  reservations: any[] = []
  editingId: number | null = null
  suggestions: string[] = []
  searchSubject = new Subject<string>()
  today = new Date().toISOString().split('T')[0]
  upcomingMap: Record<number, number> = {}
  reservationsMap: Record<number, number> = {}

  themeColors = [
    { label: 'Vert', swatch: '#2d4a2f' },
    { label: 'Terra cotta', swatch: '#b85c3a' },
    { label: 'Dore', swatch: '#c9943c' },
    { label: 'Brun fonce', swatch: '#231911' },
    { label: 'Brun', swatch: '#5a4a3d' },
    { label: 'Brun clair', swatch: '#8a7868' },
  ]

  newCity = { name: '', address: '', type: 'tournee', color: '#2d4a2f' }

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private http = inject(HttpClient)
  private cdr = inject(ChangeDetectorRef)
  private zone = inject(NgZone)

  ngOnInit() {
    this.loadData()
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
        this.cdr.markForCheck()
      })
  }

  loadData() {
    forkJoin({
      cities: this.api.getCities(),
      dates: this.api.getDistributionDates(),
      reservations: this.api.getReservations(),
    }).subscribe(({ cities, dates, reservations }) => {
      this.cities = [...cities]
      this.dates = dates
      this.reservations = (reservations as any)?.data ?? reservations ?? []
      this.buildMaps()
      this.cdr.detectChanges()
    })
  }

  buildMaps() {
    this.upcomingMap = {}
    this.reservationsMap = {}
    this.cities.forEach((c) => {
      this.upcomingMap[c.id] = this.dates.filter(
        (d) => d.cityId === c.id && d.date >= this.today
      ).length
      const dateIds = this.dates.filter((d) => d.cityId === c.id).map((d) => d.id)
      this.reservationsMap[c.id] = this.reservations.filter(
        (r) => dateIds.includes(r.distributionDateId) && r.status !== 'cancelled'
      ).length
    })
  }

  onCitySearch(value: string) {
    this.searchSubject.next(value)
  }
  selectSuggestion(name: string) {
    this.newCity.name = name
    this.suggestions = []
  }

  get permanenceCount() {
    return this.cities.filter((c) => c.type === 'permanence').length
  }
  get tourneeCount() {
    return this.cities.filter((c) => c.type === 'tournee').length
  }

  addCity() {
    if (!this.newCity.name.trim()) {
      this.toast.warning('Renseignez au moins un nom.')
      return
    }
    this.api.createCity(this.newCity).subscribe({
      next: () => {
        this.toast.success('Ville ajoutée')
        this.newCity = { name: '', address: '', type: 'tournee', color: '#2d4a2f' }
        setTimeout(() => this.loadData(), 0)
      },
      error: () => this.toast.error("Erreur lors de l'ajout"),
    })
  }

  startEdit(city: any) {
    this.editingId = city.id
  }
  cancelEdit() {
    this.editingId = null
    setTimeout(() => this.loadData(), 0)
  }

  saveEdit(city: any) {
    this.api
      .updateCity(city.id, {
        name: city.name,
        address: city.address,
        type: city.type,
        color: city.color,
      })
      .subscribe({
        next: () => {
          this.editingId = null
          this.cdr.detectChanges()
        },
        error: () => this.toast.error('Erreur'),
      })
  }

  delete(id: number) {
    if (!confirm('Supprimer cette ville ? Les dates associées seront supprimées.')) return
    this.api.deleteCity(id).subscribe({
      next: () => {
        this.toast.success('Ville supprimée')
        setTimeout(() => this.loadData(), 0)
      },
      error: () => this.toast.error('Erreur'),
    })
  }
}
