import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ApiService } from '../../core/services/api.service'
import { AuthService } from '../../core/services/auth.service'
import { ToastService } from '../../core/services/toast.service'
import { NavbarComponent } from '../../shared/components/navbar/navbar.component'
import { FooterComponent } from '../../shared/components/footer/footer.component'

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  readonly auth = inject(AuthService)
  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  reservations: any[] = []
  today = new Date().toISOString().split('T')[0]

  profileForm = { fullName: '', email: '', phone: '' }
  passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' }

  ngOnInit() {
    const user = this.auth.currentUser()
    if (user) {
      this.profileForm = {
        fullName: user.fullName || '',
        email: user.email || '',
        phone: (user as any).phone || '',
      }
    }
    this.api.getMyReservations().subscribe({
      next: (data) => {
        this.reservations = Array.isArray(data) ? data : ((data as any)?.data ?? [])
        this.cdr.detectChanges()
      },
      error: () => {
        this.reservations = []
      },
    })
  }

  saveProfile() {
    this.api.updateProfile(this.profileForm).subscribe({
      next: (data) => {
        const user = (data as any)?.data ?? data
        this.auth.currentUser.set(user)
        this.toast.success('Profil mis à jour')
      },
      error: () => this.toast.error('Erreur lors de la mise à jour'),
    })
  }

  changePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      this.toast.error('Les mots de passe ne correspondent pas')
      return
    }
    this.api
      .changePassword({
        currentPassword: this.passwordForm.currentPassword,
        newPassword: this.passwordForm.newPassword,
      })
      .subscribe({
        next: () => {
          this.toast.success('Mot de passe mis à jour')
          setTimeout(() => {
            this.passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' }
            this.cdr.detectChanges()
          }, 0)
        },
        error: (err) => {
          if (err.status === 400) this.toast.error('Mot de passe actuel incorrect')
          else this.toast.error('Erreur')
        },
      })
  }

  isUpcoming(r: any): boolean {
    const date = r.distributionDate?.date?.split('T')[0]
    return r.status === 'confirmed' && date >= this.today
  }

  getStatusLabel(r: any): string {
    if (r.status === 'cancelled') return 'ANNULÉE'
    const date = r.distributionDate?.date?.split('T')[0]
    return date >= this.today ? 'À VENIR' : 'PASSÉE'
  }

  getStatusStyle(r: any): string {
    if (r.status === 'cancelled') return 'background:var(--bg-2);color:var(--ink-mute)'
    const date = r.distributionDate?.date?.split('T')[0]
    return date >= this.today
      ? 'background:var(--accent);color:var(--paper)'
      : 'background:var(--bg-2);color:var(--ink-soft)'
  }

  cancelReservation(id: number) {
    if (!confirm('Annuler cette réservation ?')) return
    this.api.cancelReservation(id).subscribe({
      next: () => {
        this.toast.success('Réservation annulée')
        this.api.getMyReservations().subscribe({
          next: (data) => {
            this.reservations = Array.isArray(data) ? data : ((data as any)?.data ?? [])
            this.cdr.detectChanges()
          },
        })
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }
}
