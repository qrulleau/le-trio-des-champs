import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'

@Component({
  selector: 'app-selling-places',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './selling-places.component.html',
})
export class SellingPlacesComponent implements OnInit {
  sellingPlaces: any[] = []
  showForm = false
  editingPlace: any = null

  form = {
    name: '',
    address: '',
    schedule: '',
  }

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadSellingPlaces()
  }

  loadSellingPlaces() {
    this.api.getSellingPlaces().subscribe((data) => (this.sellingPlaces = data))
  }

  openForm(place?: any) {
    if (place) {
      this.editingPlace = place
      this.form = { ...place }
    } else {
      this.editingPlace = null
      this.form = { name: '', address: '', schedule: '' }
    }
    this.showForm = true
  }

  closeForm() {
    this.showForm = false
    this.editingPlace = null
  }

  submit() {
    if (this.editingPlace) {
      this.api.updateSellingPlace(this.editingPlace.id, this.form).subscribe(() => {
        this.loadSellingPlaces()
        this.closeForm()
      })
    } else {
      this.api.createSellingPlace(this.form).subscribe(() => {
        this.loadSellingPlaces()
        this.closeForm()
      })
    }
  }

  delete(id: number) {
    if (confirm('Supprimer ce lieu de vente ?')) {
      this.api.deleteSellingPlace(id).subscribe(() => this.loadSellingPlaces())
    }
  }
}
