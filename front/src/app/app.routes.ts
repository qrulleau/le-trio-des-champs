import { Routes } from '@angular/router'
import { HomeComponent } from './features/home/home.component'
import { MentionsLegalesComponent } from './features/legal/mentions-legales.component'
import { PolitiqueConfidentialiteComponent } from './features/legal/politique-confidentialite.component'
import { LoginComponent } from './features/auth/login.component'
import { AccountComponent } from './features/account/account.component'
import { ReservationComponent } from './features/reservation/reservation.component'

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
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'reservation',
    component: ReservationComponent,
  },
]
