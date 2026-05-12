import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribers.component.html',
})
export class SubscribersComponent implements OnInit {
  subscribers: any[] = []
  filteredSubscribers: any[] = []
  cities: string[] = []
  selectedCity = ''
  currentPage = 1
  pageSize = 10

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadSubscribers()
  }

  loadSubscribers() {
    this.api.getSubscribers().subscribe((data) => {
      this.subscribers = [...data]
      this.extractCities()
      this.applyFilter()
      this.cdr.detectChanges()
    })
  }

  extractCities() {
    const citySet = new Set<string>()
    for (const sub of this.subscribers) {
      for (const city of sub.cities || []) {
        citySet.add(city.name)
      }
    }
    this.cities = Array.from(citySet)
  }

  applyFilter() {
    if (this.selectedCity) {
      this.filteredSubscribers = this.subscribers.filter((sub) =>
        sub.cities?.some((c: any) => c.name === this.selectedCity)
      )
    } else {
      this.filteredSubscribers = [...this.subscribers]
    }
    this.currentPage = 1
  }

  get paginatedSubscribers() {
    const start = (this.currentPage - 1) * this.pageSize
    return this.filteredSubscribers.slice(start, start + this.pageSize)
  }

  get totalPages() {
    return Math.ceil(this.filteredSubscribers.length / this.pageSize)
  }

  getCityNames(subscriber: any): string {
    return subscriber.cities?.map((c: any) => c.name).join(', ') || '-'
  }

  delete(id: number) {
    this.api.deleteSubscriber(id).subscribe({
      next: () => {
        this.toast.success('Abonné supprimé')
        this.loadSubscribers()
      },
      error: () => this.toast.error('Erreur lors de la suppression'),
    })
  }
}
