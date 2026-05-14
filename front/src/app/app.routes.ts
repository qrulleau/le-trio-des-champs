import { Routes } from '@angular/router'
import { HomeComponent } from './features/home/home.component'
import { MentionsLegalesComponent } from './features/legal/mentions-legales.component'
import { PolitiqueConfidentialiteComponent } from './features/legal/politique-confidentialite.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'mentions-legales',
    component: MentionsLegalesComponent,
  },
  {
    path: 'politique-confidentialite',
    component: PolitiqueConfidentialiteComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
]
