import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'

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

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadSellingPlaces()
  }

  loadSellingPlaces() {
    this.api.getSellingPlaces().subscribe((data) => {
      this.sellingPlaces = [...data]
      this.cdr.detectChanges()
    })
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
      this.api.updateSellingPlace(this.editingPlace.id, this.form).subscribe({
        next: () => {
          this.toast.success('Lieu modifié avec succès')
          this.loadSellingPlaces()
          this.closeForm()
        },
        error: () => this.toast.error('Erreur lors de la modification'),
      })
    } else {
      this.api.createSellingPlace(this.form).subscribe({
        next: () => {
          this.toast.success('Lieu ajouté avec succès')
          this.loadSellingPlaces()
          this.closeForm()
        },
        error: () => this.toast.error("Erreur lors de l'ajout"),
      })
    }
  }

  delete(id: number) {
    this.api.deleteSellingPlace(id).subscribe({
      next: () => {
        this.toast.success('Lieu supprimé')
        this.loadSellingPlaces()
      },
      error: () => this.toast.error('Erreur lors de la suppression'),
    })
  }
}
