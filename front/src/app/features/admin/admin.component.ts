import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  menuItems = [
    { label: 'Tableau de bord', icon: '🏠', path: '/admin' },
    { label: 'Produits', icon: '📦', path: '/admin/products' },
    { label: 'Annonce exceptionnelle', icon: '📢', path: '/admin/announcement' },
    { label: 'Calendrier', icon: '📅', path: '/admin/events' },
    { label: 'Villes', icon: '📍', path: '/admin/cities' },
    { label: 'Abonnés', icon: '🔔', path: '/admin/subscribers' },
    { label: 'Lieux de vente', icon: '👥', path: '/admin/selling-places' },
    { label: 'Contact', icon: '✉️', path: '/admin/settings' },
  ];
}
