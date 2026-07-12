import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ApiService } from '../../../../core/services/api.service'
import { ToastService } from '../../../../core/services/toast.service'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-medias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medias.component.html',
})
export class MediasComponent implements OnInit {
  images: Record<string, string | null> = {}
  gallery: any[] = []
  baseUrl = environment.apiUrl.replace('/api/v1', '')

  sharedSlots = [
    {
      key: 'prod-portrait',
      label: 'Portrait principal',
      ratio: '4/5',
      hint: "Grand cliché du collage : MT' ou la ferme",
    },
    {
      key: 'prod-portrait-2',
      label: 'Photo détail (collage)',
      ratio: '4/3',
      hint: 'Petite photo inclinée : mains, récolte, tracteur…',
    },
  ]

  producteursSlots = [
    {
      key: 'prod-hero',
      label: 'Photo du hero',
      ratio: '16/9',
      wide: true,
      hint: "MT' dans son champ, au lever du jour",
    },
    { key: 'prod-pr1', label: 'Pilier · Bio & local', ratio: '4/3', wide: false, hint: '' },
    { key: 'prod-pr2', label: 'Pilier · Circuit court', ratio: '4/3', wide: false, hint: '' },
    { key: 'prod-pr3', label: 'Pilier · De saison', ratio: '4/3', wide: false, hint: '' },
    {
      key: 'prod-field',
      label: 'Grande bande champ',
      ratio: '21/9',
      wide: true,
      hint: 'Photo large pleine page entre les sections',
    },
    {
      key: 'prod-crop-pdt',
      label: 'Culture · Pommes de terre',
      ratio: '1/1',
      wide: false,
      hint: '',
    },
    { key: 'prod-crop-oj', label: 'Culture · Oignons jaunes', ratio: '1/1', wide: false, hint: '' },
    { key: 'prod-crop-or', label: 'Culture · Oignons rouges', ratio: '1/1', wide: false, hint: '' },
    { key: 'prod-crop-oeufs', label: 'Culture · Oeufs', ratio: '1/1', wide: false, hint: '' },
    { key: 'prod-note', label: 'Encart oignons rouges', ratio: '4/3', wide: false, hint: '' },
    { key: 'prod-m1', label: 'Equipe · Membre 1', ratio: '3/4', wide: false, hint: '' },
    { key: 'prod-m2', label: 'Equipe · Membre 2', ratio: '3/4', wide: false, hint: '' },
    { key: 'prod-m3', label: 'Equipe · Membre 3', ratio: '3/4', wide: false, hint: '' },
  ]

  private api = inject(ApiService)
  private toast = inject(ToastService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.api.getSiteImages().subscribe((data) => {
      this.images = data
      this.cdr.detectChanges()
    })
    this.api.getSiteGallery().subscribe((data) => {
      this.gallery = data
      this.cdr.detectChanges()
    })
  }

  onFileSelected(slotKey: string, event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    this.api.uploadSiteImage(slotKey, file).subscribe({
      next: (data) => {
        this.images = { ...this.images, [slotKey]: data.url }
        this.toast.success('Photo mise à jour')
        this.cdr.detectChanges()
      },
      error: () => this.toast.error("Erreur lors de l'upload"),
    })
  }

  removeImage(slotKey: string) {
    if (!confirm('Retirer cette image ?')) return
    this.api.deleteSiteImage(slotKey).subscribe({
      next: () => {
        this.images = { ...this.images, [slotKey]: null }
        this.toast.success('Image retirée')
        this.cdr.detectChanges()
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  addGalleryItem(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    this.api.addGalleryItem(file, '').subscribe({
      next: (item) => {
        this.gallery = [...this.gallery, item]
        this.toast.success('Photo ajoutée')
        this.cdr.detectChanges()
      },
      error: () => this.toast.error("Erreur lors de l'upload"),
    })
  }

  updateCaption(id: number, caption: string) {
    this.api.updateGalleryItem(id, { caption }).subscribe({
      next: () => {
        this.gallery = this.gallery.map((i) => (i.id === id ? { ...i, caption } : i))
        this.toast.success('Légende mise à jour')
      },
      error: () => this.toast.error('Erreur'),
    })
  }

  moveItem(id: number, dir: number) {
    const idx = this.gallery.findIndex((i) => i.id === id)
    if (idx < 0) return
    const newIdx = idx + dir
    if (newIdx < 0 || newIdx >= this.gallery.length) return
    const updated = [...this.gallery]
    ;[updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]]
    updated[idx].position = idx
    updated[newIdx].position = newIdx
    this.gallery = updated
    this.api.updateGalleryItem(id, { position: newIdx }).subscribe()
    this.api.updateGalleryItem(updated[idx].id, { position: idx }).subscribe()
    this.cdr.detectChanges()
  }

  deleteGalleryItem(id: number) {
    if (!confirm('Retirer cette photo de la galerie ?')) return
    this.api.deleteGalleryItem(id).subscribe({
      next: () => {
        this.gallery = this.gallery.filter((i) => i.id !== id)
        this.toast.success('Photo retirée')
        this.cdr.detectChanges()
      },
      error: () => this.toast.error('Erreur'),
    })
  }
}
