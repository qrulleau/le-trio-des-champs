import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ApiService } from '../../../../core/services/api.service'

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscribers.component.html',
})
export class SubscribersComponent implements OnInit {
  subscribers: any[] = []
  subscribersByCity: { [key: string]: any[] } = {}

  private api = inject(ApiService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadSubscribers()
  }

  loadSubscribers() {
    this.api.getSubscribers().subscribe((data) => {
      this.subscribers = [...data]
      this.groupByCity()
      this.cdr.detectChanges()
    })
  }

  groupByCity() {
    this.subscribersByCity = {}
    for (const subscriber of this.subscribers) {
      for (const city of subscriber.cities || []) {
        if (!this.subscribersByCity[city.name]) {
          this.subscribersByCity[city.name] = []
        }
        this.subscribersByCity[city.name].push(subscriber)
      }
    }
  }

  getCityNames(): string[] {
    return Object.keys(this.subscribersByCity)
  }

  delete(id: number) {
    this.api.deleteSubscriber(id).subscribe(() => this.loadSubscribers())
  }

  exportCsv() {
    const rows = [['Téléphone', 'Villes', 'Date inscription']]
    for (const sub of this.subscribers) {
      rows.push([
        sub.phone,
        sub.cities?.map((c: any) => c.name).join(' | ') || '',
        new Date(sub.createdAt).toLocaleDateString('fr-FR'),
      ])
    }
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'abonnes.csv'
    a.click()
  }
}
