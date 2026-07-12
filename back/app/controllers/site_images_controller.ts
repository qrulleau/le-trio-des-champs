import type { HttpContext } from '@adonisjs/core/http'
import SiteImage from '#models/site_image'
import sharp from 'sharp'
import { join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import app from '@adonisjs/core/services/app'

export default class SiteImagesController {
  async index({ response }: HttpContext) {
    const images = await SiteImage.all()
    const map: Record<string, string | null> = {}
    images.forEach((img) => {
      map[img.slotKey] = img.url
    })
    return response.ok(map)
  }

  async store({ params, request, response }: HttpContext) {
    const slotKey = params.slotKey
    const image = request.file('image', { size: '8mb', extnames: ['jpg', 'jpeg', 'png', 'webp'] })

    if (!image || !image.isValid) {
      return response.badRequest({ message: image?.errors || 'Fichier invalide' })
    }

    const uploadsDir = app.publicPath('uploads/site')
    await mkdir(uploadsDir, { recursive: true })

    const filename = `${slotKey.replace(/\./g, '-')}-${randomUUID()}.jpg`
    const filepath = join(uploadsDir, filename)

    await sharp(image.tmpPath!)
      .resize(1600, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(filepath)

    const url = `/uploads/site/${filename}`
    await SiteImage.updateOrCreate({ slotKey }, { url })

    return response.ok({ slotKey, url })
  }

  async destroy({ params, response }: HttpContext) {
    const img = await SiteImage.findBy('slot_key', params.slotKey)
    if (img) {
      img.url = null
      await img.save()
    }
    return response.ok({ message: 'Image retiree' })
  }
}
