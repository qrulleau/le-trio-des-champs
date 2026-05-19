import { Injectable, signal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { tap, catchError } from 'rxjs/operators'
import { EMPTY, firstValueFrom } from 'rxjs'
import { environment } from '../../../environments/environment'

export interface CurrentUser {
  id: number
  fullName: string
  email: string
  role: 'admin' | 'user'
  initials: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl

  readonly currentUser = signal<CurrentUser | null>(null)
  readonly isLoggedIn = computed(() => !!this.currentUser())
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin')
  readonly userName = computed(() => this.currentUser()?.fullName ?? null)

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.data.token)
        if (response.data?.user) {
          this.currentUser.set(response.data.user)
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

  // Retourne une Promise pour APP_INITIALIZER
  loadCurrentUser(): Promise<void> {
    return firstValueFrom(
      this.http.get<any>(`${this.baseUrl}/account/profile`).pipe(
        tap((response) => {
          const user = response?.data ?? response
          this.currentUser.set(user ?? null)
        }),
        catchError(() => {
          // Token expiré ou invalide — on nettoie
          localStorage.removeItem('token')
          this.currentUser.set(null)
          return EMPTY
        })
      )
    ).catch(() => {})
  }

  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
}
