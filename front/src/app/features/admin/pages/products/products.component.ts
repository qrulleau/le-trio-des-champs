import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: any[] = []
  showForm = false
  editingProduct: any = null

  form = {
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  }

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.api.getProducts().subscribe((data) => {
      this.products = [...data]
      this.cdr.detectChanges()
    })
  }

  openForm(product?: any) {
    if (product) {
      this.editingProduct = product
      this.form = { ...product }
    } else {
      this.editingProduct = null
      this.form = { name: '', description: '', price: '', imageUrl: '' }
    }
    this.showForm = true
  }

  closeForm() {
    this.showForm = false
    this.editingProduct = null
  }

  submit() {
    if (this.editingProduct) {
      this.api.updateProduct(this.editingProduct.id, this.form).subscribe({
        next: () => {
          this.toast.success('Produit modifié avec succès')
          this.loadProducts()
          this.closeForm()
        },
        error: () => this.toast.error('Erreur lors de la modification'),
      })
    } else {
      this.api.createProduct(this.form).subscribe({
        next: () => {
          this.toast.success('Produit ajouté avec succès')
          this.loadProducts()
          this.closeForm()
        },
        error: () => this.toast.error("Erreur lors de l'ajout"),
      })
    }
  }

  delete(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: () => {
        this.toast.success('Produit supprimé')
        this.loadProducts()
      },
      error: () => this.toast.error('Erreur lors de la suppression'),
    })
  }
}
