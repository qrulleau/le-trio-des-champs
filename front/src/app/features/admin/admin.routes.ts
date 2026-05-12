import { Routes } from '@angular/router'

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./admin.component').then((m) => m.AdminComponent),
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
          import('./pages/announcement/announcement.component').then((m) => m.AnnouncementComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then((m) => m.SettingsComponent),
      },
      {
        path: 'selling-places',
        loadComponent: () =>
          import('./pages/selling-places/selling-places.component').then((m) => m.SellingPlacesComponent),
      },
    ],
  },
]
