import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

export const authGuard = () => {
  const auth = inject(AuthService)
  const router = inject(Router)

  // On vérifie le token — suffisant pour laisser passer,
  // le composant admin gèrera si le token est expiré
  if (auth.getToken()) {
    return true
  }

  router.navigate(['/login'])
  return false
}
