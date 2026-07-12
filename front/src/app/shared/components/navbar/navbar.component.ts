import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav style="background: var(--bg); border-bottom: 1px solid var(--rule)">
      <div
        class="wrap"
        style="display:flex;justify-content:space-between;align-items:center;gap:16px;padding-top:20px;padding-bottom:20px;flex-wrap:wrap"
      >
        <a
          routerLink="/"
          style="display:flex;align-items:center;gap:10px;color:var(--ink);text-decoration:none"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-3)"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 22V8" />
            <path d="M12 8 C10 8 8 6.5 8 4.5 C10 4.5 12 6 12 8 Z" />
            <path d="M12 8 C14 8 16 6.5 16 4.5 C14 4.5 12 6 12 8 Z" />
            <path d="M12 13 C10 13 8 11.5 8 9.5 C10 9.5 12 11 12 13 Z" />
            <path d="M12 13 C14 13 16 11.5 16 9.5 C14 9.5 12 11 12 13 Z" />
            <path d="M12 18 C10 18 8 16.5 8 14.5 C10 14.5 12 16 12 18 Z" />
            <path d="M12 18 C14 18 16 16.5 16 14.5 C14 14.5 12 16 12 18 Z" />
          </svg>
          <span style="font-family:var(--font-display);font-size:19px">Le Trio des Champs</span>
        </a>

        <div
          class="topbar-right"
          style="display:flex;align-items:center;gap:22px;font-size:13px;color:var(--ink-soft);font-weight:500"
        >
          <a routerLink="/producteurs" class="topbar-link">Producteurs</a>
          <a href="#produits" class="topbar-link">Produits</a>
          <a href="#dates" class="topbar-link">Dates</a>
          <a href="#alertes" class="topbar-link">Alertes SMS</a>
          <a href="#contact" class="topbar-link">Contact</a>

          @if (auth.isLoggedIn()) {
            @if (auth.isAdmin()) {
              <a
                routerLink="/admin"
                style="font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-2);border-bottom:1px solid var(--accent-2);padding-bottom:1px"
                >Admin</a
              >
            }
            <span
              style="display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:var(--paper);border:1px solid var(--rule);color:var(--ink);white-space:nowrap;font-size:13px"
            >
              <span
                style="width:6px;height:6px;border-radius:999px;background:var(--accent);display:inline-block;flex-shrink:0"
              ></span>
              {{ auth.userName() }}
            </span>
            <a routerLink="/account" style="color:var(--ink);font-weight:600">Mon compte</a>
            <button
              (click)="logout()"
              style="appearance:none;background:none;border:none;padding:0;font-family:var(--font-body);font-size:13px;color:var(--ink-mute);cursor:pointer;font-weight:500"
            >
              Déconnexion
            </button>
          }

          @if (!auth.isLoggedIn()) {
            <span
              class="topbar-pill"
              style="display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:var(--paper);border:1px solid var(--rule);color:var(--ink);white-space:nowrap"
            >
              <span
                style="width:6px;height:6px;border-radius:999px;background:var(--accent-2);display:inline-block;flex-shrink:0"
              ></span>
              Permanence chaque lundi <span style="color:var(--ink-mute)">+ tournée Picardie</span>
            </span>
            <a
              routerLink="/login"
              style="display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:999px;background:var(--ink);color:var(--paper);font-size:13px;font-weight:600;white-space:nowrap"
              >Se connecter</a
            >
          }
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  readonly auth: AuthService = inject(AuthService)

  logout(): void {
    this.auth.logout()
  }
}
