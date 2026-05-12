import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { tap } from 'rxjs/operators'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { email, password }).pipe(
        tap((response) => {
            localStorage.setItem('token', response.data.token)
        })
    )
  }

  logout() {
    this.http.post(`${this.baseUrl}/account/logout`, {}).subscribe()
    localStorage.removeItem('token')
    this.router.navigate(['/admin/login'])
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }
}
