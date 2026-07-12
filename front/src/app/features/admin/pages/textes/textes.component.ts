import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'

const GROUPS = [
  {
    title: 'Accueil — Hero',
    where: 'Accueil',
    fields: [
      { key: 'home.hero.script', label: 'Petite accroche manuscrite', type: 'line' },
      { key: 'home.hero.title', label: 'Grand titre', type: 'area', rich: true },
      { key: 'home.hero.lead', label: "Texte d'introduction", type: 'area' },
      { key: 'home.hero.cta1', label: 'Bouton principal', type: 'line' },
      { key: 'home.hero.cta2', label: 'Bouton secondaire', type: 'line' },
    ],
  },
  {
    title: 'Accueil — Qui sommes-nous',
    where: 'Accueil',
    fields: [
      { key: 'home.story.stamp', label: 'Pastille (cachet rond)', type: 'line' },
      { key: 'home.story.eyebrow', label: 'Surtitre', type: 'line' },
      { key: 'home.story.title', label: 'Titre', type: 'area', rich: true },
      { key: 'home.story.body', label: 'Paragraphe', type: 'area' },
      { key: 'home.story.link', label: 'Lien vers Producteurs', type: 'line' },
    ],
  },
  {
    title: 'Accueil — Nos engagements',
    where: 'Accueil',
    fields: [
      { key: 'home.values.eyebrow', label: 'Surtitre', type: 'line' },
      { key: 'home.values.title', label: 'Titre', type: 'area', rich: true },
      { key: 'home.values.t1', label: 'Engagement 1 — titre', type: 'line' },
      { key: 'home.values.b1', label: 'Engagement 1 — texte', type: 'area' },
      { key: 'home.values.t2', label: 'Engagement 2 — titre', type: 'line' },
      { key: 'home.values.b2', label: 'Engagement 2 — texte', type: 'area' },
      { key: 'home.values.t3', label: 'Engagement 3 — titre', type: 'line' },
      { key: 'home.values.b3', label: 'Engagement 3 — texte', type: 'area' },
    ],
  },
  {
    title: 'Accueil — Permanence',
    where: 'Accueil',
    fields: [
      { key: 'home.schedule.eyebrow', label: 'Surtitre', type: 'line' },
      { key: 'home.schedule.title', label: 'Titre', type: 'area', rich: true },
      { key: 'home.schedule.body', label: 'Paragraphe', type: 'area' },
    ],
  },
  {
    title: 'Accueil — Réservation',
    where: 'Accueil',
    fields: [
      { key: 'home.reservation.eyebrow', label: 'Surtitre', type: 'line' },
      { key: 'home.reservation.title', label: 'Titre', type: 'area', rich: true },
      { key: 'home.reservation.lead', label: "Texte d'introduction", type: 'area' },
    ],
  },
  {
    title: 'Accueil — Alertes SMS',
    where: 'Accueil',
    fields: [
      { key: 'home.sms.eyebrow', label: 'Surtitre', type: 'line' },
      { key: 'home.sms.title', label: 'Titre', type: 'area', rich: true },
      { key: 'home.sms.lead', label: "Texte d'introduction", type: 'area' },
    ],
  },
  {
    title: 'Producteurs — Hero',
    where: 'Producteurs',
    fields: [
      { key: 'prod.hero.script', label: 'Accroche manuscrite', type: 'line' },
      { key: 'prod.hero.title', label: 'Titre', type: 'line', rich: true },
      { key: 'prod.hero.lead', label: 'Introduction', type: 'area' },
      { key: 'prod.hero.cta1', label: 'Bouton principal', type: 'line' },
      { key: 'prod.hero.cta2', label: 'Bouton secondaire', type: 'line' },
    ],
  },
  {
    title: 'Producteurs — Notre histoire',
    where: 'Producteurs',
    fields: [
      { key: 'prod.story.stamp', label: 'Pastille (cachet rond)', type: 'line' },
      { key: 'prod.story.eyebrow', label: 'Surtitre', type: 'line' },
      { key: 'prod.story.title', label: 'Titre', type: 'area', rich: true },
      { key: 'prod.story.body1', label: 'Paragraphe 1', type: 'area' },
      { key: 'prod.story.body2', label: 'Paragraphe 2', type: 'area' },
      { key: 'prod.story.sign', label: 'Signature', type: 'line' },
    ],
  },
  {
    title: 'Producteurs — Citation',
    where: 'Producteurs',
    fields: [
      { key: 'prod.band.quote', label: 'Citation (grande bande)', type: 'area', rich: true },
      { key: 'prod.band.by', label: 'Attribution', type: 'line' },
    ],
  },
]

@Component({
  selector: 'app-textes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textes.component.html',
})
export class TextesComponent implements OnInit {
  groups = GROUPS
  content: Record<string, string> = {}
  saving: Record<string, boolean> = {}

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.api.getSiteContents().subscribe((data) => {
      this.content = data ?? {}
      this.cdr.detectChanges()
    })
  }

  getValue(key: string): string {
    return this.content[key] ?? ''
  }

  onBlur(key: string, value: string) {
    if (this.content[key] === value) return
    this.content = { ...this.content, [key]: value }
    this.saving[key] = true
    this.api.updateSiteContent(key, value).subscribe({
      next: () => {
        this.saving[key] = false
        this.toast.success('Enregistré')
      },
      error: () => {
        this.saving[key] = false
        this.toast.error('Erreur')
      },
    })
  }
}
