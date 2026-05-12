import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  stats = [
    { label: 'Produits', value: '...', icon: '📦', color: 'bg-blue-500', link: '/admin/products', action: 'Gérer les produits' },
    { label: 'Annonce', value: 'Inactive', icon: '📢', color: 'bg-orange-500', link: '/admin/announcement', action: 'Modifier la bannière' },
    { label: 'Lieux de vente', value: '...', icon: '📍', color: 'bg-green-500', link: '/admin/selling-places', action: 'Gérer les adresses' },
    { label: 'Contact', value: '✓', icon: '✉️', color: 'bg-purple-500', link: '/admin/settings', action: 'Coordonnées' },
  ];

  guides = [
    { title: 'Gérer les produits', desc: 'Ajoutez, modifiez ou supprimez vos produits. Changez les prix, descriptions et images facilement.', icon: '📦' },
    { title: 'Annonces exceptionnelles', desc: 'Modifiez la bannière en haut de la page pour annoncer vos événements spéciaux.', icon: '📢' },
    { title: 'Lieux de vente', desc: 'Gérez les jours et horaires de vos ventes régulières avec les adresses complètes.', icon: '📍' },
    { title: 'Coordonnées', desc: 'Mettez à jour votre email et vos numéros de téléphone pour rester joignable.', icon: '✉️' },
  ];

  constructor(private api: ApiService) {}
}
