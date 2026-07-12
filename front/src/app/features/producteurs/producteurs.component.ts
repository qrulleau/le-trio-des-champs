import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { ApiService } from '../../core/services/api.service'
import { NavbarComponent } from '../../shared/components/navbar/navbar.component'
import { FooterComponent } from '../../shared/components/footer/footer.component'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-producteurs',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './producteurs.component.html',
})
export class ProducteursComponent implements OnInit {
  baseUrl = environment.apiUrl.replace('/api/v1', '')
  siteImages: Record<string, string | null> = {}
  siteContents: Record<string, string | null> = {}

  practices = [
    {
      key: 'prod-pr1',
      title: 'Cultivé en bio',
      body: 'Pas de pesticides de synthèse. Des sols vivants, nourris naturellement, pour des légumes qui ont du goût.',
      placeholder: 'Photo : sol, culture bio',
      icon: '<svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 40 C8 22 20 8 40 8 C40 28 28 40 8 40 Z"/><path d="M8 40 L30 18"/></svg>',
    },
    {
      key: 'prod-pr2',
      title: 'À 50 km de votre assiette',
      body: "Nos champs sont dans l'Oise. Entre la récolte et l'étal, il n'y a que la route du camion — et le moins d'intermédiaires possible.",
      placeholder: 'Photo : le camion sur la route',
      icon: '<svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 44 C24 44 38 31 38 19 C38 11 32 5 24 5 C16 5 10 11 10 19 C10 31 24 44 24 44 Z"/><circle cx="24" cy="19" r="5"/></svg>',
    },
    {
      key: 'prod-pr3',
      title: 'Au rythme des saisons',
      body: "On récolte ce qui est prêt. Les pommes de terre se conservent et se gardent bien ; le reste arrive frais, quand c'est le moment.",
      placeholder: 'Photo : saison, cagettes datées',
      icon: '<svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="11" width="32" height="30" rx="3"/><path d="M8 19 h32 M16 6 v8 M32 6 v8"/></svg>',
    },
  ]

  crops = [
    {
      key: 'prod-crop-pdt',
      name: 'Pommes de terre',
      sub: 'de plein champ · longue conservation',
      tag: 'le best-seller',
      tagBg: 'var(--accent-2)',
      tagColor: 'var(--paper)',
    },
    {
      key: 'prod-crop-oj',
      name: 'Oignons jaunes',
      sub: 'doux & fermes',
      tag: '',
      tagBg: '',
      tagColor: '',
    },
    {
      key: 'prod-crop-or',
      name: 'Oignons rouges',
      sub: 'saveur prononcée',
      tag: '',
      tagBg: '',
      tagColor: '',
    },
    {
      key: 'prod-crop-oeufs',
      name: 'Œufs fermiers',
      sub: 'plein air',
      tag: 'en tournée',
      tagBg: 'var(--paper)',
      tagColor: 'var(--ink)',
    },
  ]

  team = [
    {
      key: 'prod-m1',
      name: "MT'",
      role: 'Producteur bio · fondateur',
      bio: "Fruits et légumes biologiques dans l'Oise. La tête et les mains derrière le Trio.",
      placeholder: 'Photo membre 1',
    },
    {
      key: 'prod-m2',
      name: '[Prénom]',
      role: 'Producteur · [spécialité]',
      bio: "[Quelques mots : ce qu'il cultive, depuis quand, son rôle dans les tournées…]",
      placeholder: 'Photo membre 2',
    },
    {
      key: 'prod-m3',
      name: '[Prénom]',
      role: 'Producteur · [spécialité]',
      bio: "[Quelques mots : ce qu'il cultive, depuis quand, son rôle dans les tournées…]",
      placeholder: 'Photo membre 3',
    },
  ]

  private api = inject(ApiService)
  private cdr = inject(ChangeDetectorRef)
  private sanitizer = inject(DomSanitizer)

  ngOnInit() {
    this.api.getSiteImages().subscribe((data) => {
      this.siteImages = data ?? {}
      this.cdr.detectChanges()
    })
    this.api.getSiteContents().subscribe((data) => {
      this.siteContents = data ?? {}
      this.cdr.detectChanges()
    })
  }

  img(key: string): string | null {
    return this.siteImages[key] ?? null
  }
  c(key: string, fallback = ''): string {
    return this.siteContents[key] ?? fallback
  }

  renderRich(text: string, emColor = 'var(--accent-2)'): SafeHtml {
    if (!text) return ''
    const html = text
      .split('\n')
      .join('<br>')
      .replace(/\*([^*]+)\*/g, `<em style="font-style:italic;color:${emColor}">$1</em>`)
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
