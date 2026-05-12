import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../../../core/services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = {
    email: '',
    password: '',
  }
  error = ''
  loading = false

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = ''
    this.loading = true
    this.auth.login(this.form.email, this.form.password).subscribe({
      next: () => {
        this.loading = false
        this.router.navigate(['/admin'])
      },
      error: () => {
        this.loading = false
        this.error = 'Email ou mot de passe incorrect'
      },
    })
  }
}
