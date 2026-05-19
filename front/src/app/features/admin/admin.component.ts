import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, RouterOutlet } from '@angular/router'
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private auth = inject(AuthService)

  menuItems = [
    { label: 'Tableau de bord', icon: '🏠', path: '/admin', exact: true },
    { label: 'Produits', icon: '📦', path: '/admin/products', exact: false },
    { label: 'Calendrier', icon: '📅', path: '/admin/events', exact: false },
    { label: 'Villes', icon: '📍', path: '/admin/cities', exact: false },
    { label: 'Réservations', icon: '📋', path: '/admin/reservations', exact: false },
    { label: 'Abonnés SMS', icon: '🔔', path: '/admin/subscribers', exact: false },
    { label: 'Annonce', icon: '📢', path: '/admin/announcement', exact: false },
    { label: 'Lieux de vente', icon: '🏪', path: '/admin/selling-places', exact: false },
    { label: 'Paramètres', icon: '⚙️', path: '/admin/settings', exact: false },
  ]

  logout() {
    this.auth.logout()
  }
}
