import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'

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

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.api.getProducts().subscribe((data) => (this.products = data))
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
      this.api.updateProduct(this.editingProduct.id, this.form).subscribe(() => {
        this.loadProducts()
        this.closeForm()
      })
    } else {
      this.api.createProduct(this.form).subscribe(() => {
        this.loadProducts()
        this.closeForm()
      })
    }
  }

  delete(id: number) {
    if (confirm('Supprimer ce produit ?')) {
      this.api.deleteProduct(id).subscribe(() => this.loadProducts())
    }
  }
}
