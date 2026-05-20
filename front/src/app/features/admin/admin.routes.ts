import { Routes } from '@angular/router'
import { authGuard } from '../../core/guards/auth.guard'

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin.component').then((m) => m.AdminComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: 'cities',
        loadComponent: () =>
          import('./pages/cities/cities.component').then((m) => m.CitiesComponent),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./pages/events/events.component').then((m) => m.EventsComponent),
      },
      {
        path: 'subscribers',
        loadComponent: () =>
          import('./pages/subscribers/subscribers.component').then((m) => m.SubscribersComponent),
      },
      {
        path: 'announcement',
        loadComponent: () =>
          import('./pages/announcement/announcement.component').then(
            (m) => m.AnnouncementComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then((m) => m.SettingsComponent),
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('./pages/reservations/reservations.component').then(
            (m) => m.ReservationsComponent
          ),
      },
      {
        path: 'selling-places',
        loadComponent: () =>
          import('./pages/selling-places/selling-places.component').then(
            (m) => m.SellingPlacesComponent
          ),
      },
    ],
  },
]
