import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: any[] = []
  baseUrl = environment.apiUrl.replace('/api/v1', '')

  newProduct = {
    name: '',
    unit: '',
    price: '',
    stockPerDate: 0,
    description: '',
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

  addProduct() {
    if (!this.newProduct.name.trim()) {
      this.toast.warning('Renseignez au moins un nom.')
      return
    }
    this.api.createProduct(this.newProduct).subscribe({
      next: () => {
        this.toast.success('Produit ajouté')
        this.newProduct = { name: '', unit: '', price: '', stockPerDate: 0, description: '' }
        this.loadProducts()
      },
      error: () => this.toast.error("Erreur lors de l'ajout"),
    })
  }

  updateField(product: any, field: string, value: any) {
    this.api.updateProduct(product.id, { [field]: value }).subscribe({
      next: () => this.toast.success('Modifié'),
      error: () => this.toast.error('Erreur'),
    })
  }

  onImageSelected(product: any, event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    this.api.uploadProductImage(product.id, file).subscribe({
      next: (data) => {
        product.imageUrl = data.imageUrl
        this.toast.success('Photo mise à jour')
        this.cdr.detectChanges()
      },
      error: () => this.toast.error("Erreur lors de l'upload"),
    })
  }

  removeImage(product: any) {
    if (!confirm('Retirer la photo de ce produit ?')) return
    this.api.deleteProductImage(product.id).subscribe({
      next: () => {
        product.imageUrl = null
        this.toast.success('Photo retirée')
        this.cdr.detectChanges()
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  delete(id: number) {
    if (!confirm('Supprimer ce produit ?')) return
    this.api.deleteProduct(id).subscribe({
      next: () => {
        this.toast.success('Produit supprimé')
        this.loadProducts()
      },
      error: () => this.toast.error('Erreur lors de la suppression'),
    })
  }

  get totalStock() {
    return this.products.reduce((s, p) => s + (p.stockPerDate || 0), 0)
  }
  get avgPrice() {
    if (!this.products.length) return '0'
    const avg =
      this.products.reduce((s, p) => s + parseFloat(p.price) || 0, 0) / this.products.length
    return avg.toFixed(2)
  }
}
