import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { ApiService } from '../../core/services/api.service'
import { AuthService } from '../../core/services/auth.service'
import { ToastService } from '../../core/services/toast.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  tab: 'login' | 'signup' = 'login'
  loginForm = { email: '', password: '' }
  signupForm = { fullName: '', email: '', password: '', passwordConfirmation: '' }
  error = ''

  private api = inject(ApiService)
  private auth = inject(AuthService)
  private router = inject(Router)
  private toast = inject(ToastService)

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.redirectAfterLogin()
    }
  }

  login() {
    this.error = ''
    this.api.login(this.loginForm).subscribe({
      next: (data) => {
        this.auth.setToken(data.data.token)
        // Si le back renvoie l'user dans la réponse, on le set directement
        if (data.data?.user) {
          this.auth.currentUser.set(data.data.user)
          this.toast.success('Connexion réussie !')
          this.redirectAfterLogin()
        } else {
          // Sinon on charge le profil puis on redirige
          this.auth.loadCurrentUser()
          setTimeout(() => {
            this.toast.success('Connexion réussie !')
            this.redirectAfterLogin()
          }, 300)
        }
      },
      error: () => {
        this.error = 'Identifiants invalides.'
      },
    })
  }

  signup() {
    this.error = ''
    if (this.signupForm.password !== this.signupForm.passwordConfirmation) {
      this.error = 'Les mots de passe ne correspondent pas.'
      return
    }
    this.api.signup(this.signupForm).subscribe({
      next: (data) => {
        this.auth.setToken(data.data.token)
        if (data.data?.user) {
          this.auth.currentUser.set(data.data.user)
        } else {
          this.auth.loadCurrentUser()
        }
        this.toast.success('Compte créé avec succès !')
        this.redirectAfterLogin()
      },
      error: () => {
        this.error = 'Erreur lors de la création du compte.'
      },
    })
  }

  private redirectAfterLogin() {
    if (this.auth.isAdmin()) {
      this.router.navigate(['/admin'])
    } else {
      this.router.navigate(['/reservation'])
    }
  }
}
