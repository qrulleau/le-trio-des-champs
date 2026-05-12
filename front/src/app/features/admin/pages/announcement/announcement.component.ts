import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './announcement.component.html',
})
export class AnnouncementComponent implements OnInit {
  announcement: any = null
  isActive = false

  form = {
    title: '',
    eventDate: '',
    location: '',
    showLimitedQuantities: false,
    isActive: false,
  }

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadAnnouncement()
  }

  loadAnnouncement() {
    this.api.getAnnouncement().subscribe((data) => {
      if (data) {
        this.announcement = data
        this.form = {
          title: data.title || '',
          eventDate: data.eventDate || '',
          location: data.location || '',
          showLimitedQuantities: data.showLimitedQuantities || false,
          isActive: data.isActive || false,
        }
        this.isActive = data.isActive || false
      }
    })
  }

  save() {
    if (this.announcement) {
      this.api.updateAnnouncement(this.announcement.id, this.form).subscribe((data) => {
        this.announcement = data
        this.isActive = data.isActive
      })
    } else {
      this.api.updateAnnouncement(0, this.form).subscribe((data) => {
        this.announcement = data
        this.isActive = data.isActive
      })
    }
  }

  toggleActive() {
    this.form.isActive = !this.form.isActive
    this.save()
  }
}
