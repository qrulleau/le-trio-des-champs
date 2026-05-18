import { Injectable, signal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { tap, catchError } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { environment } from '../../../environments/environment'

export interface CurrentUser {
  id: number
  fullName: string
  email: string
  role: 'admin' | 'user'
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl

  // Signal central — toute l'appli s'y abonne
  readonly currentUser = signal<CurrentUser | null>(null)

  // Dérivés pratiques
  readonly isLoggedIn = computed(() => !!this.currentUser())
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin')
  readonly userName = computed(() => this.currentUser()?.fullName ?? null)

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Au démarrage : si un token existe, on charge le profil
    if (this.getToken()) {
      this.loadCurrentUser()
    }
  }

  // ─── Auth

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.data.token)
        // Le back renvoie parfois l'user dans la réponse de login
        if (response.data?.user) {
          this.currentUser.set(response.data.user)
        } else {
          this.loadCurrentUser()
        }
      })
    )
  }

  logout() {
    this.http
      .post(`${this.baseUrl}/account/logout`, {})
      .pipe(catchError(() => EMPTY))
      .subscribe()
    localStorage.removeItem('token')
    this.currentUser.set(null)
    this.router.navigate(['/login'])
  }

  // ─── Profil

  loadCurrentUser() {
    this.http
      .get<any>(`${this.baseUrl}/account/profile`)
      .pipe(catchError(() => EMPTY))
      .subscribe((response) => {
        // Accepte { data: user } ou directement l'objet user
        const user = response?.data ?? response
        this.currentUser.set(user ?? null)
      })
  }

  // ─── Token helpers

  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
}
