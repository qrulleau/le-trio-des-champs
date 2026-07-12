import type { HttpContext } from '@adonisjs/core/http'
import SiteGallery from '#models/site_gallery'
import sharp from 'sharp'
import { join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import app from '@adonisjs/core/services/app'

export default class SiteGalleryController {
  async index({ response }: HttpContext) {
    const items = await SiteGallery.query().orderBy('position', 'asc')
    return response.ok(items)
  }

  async store({ request, response }: HttpContext) {
    const image = request.file('image', { size: '8mb', extnames: ['jpg', 'jpeg', 'png', 'webp'] })
    const caption = request.input('caption', '')
    const maxPos = await SiteGallery.query().max('position as max')
    const position = ((maxPos[0] as any).$extras.max ?? 0) + 1

    if (!image || !image.isValid) {
      return response.badRequest({ message: image?.errors || 'Fichier invalide' })
    }

    const uploadsDir = app.publicPath('uploads/gallery')
    await mkdir(uploadsDir, { recursive: true })

    const filename = `gallery-${randomUUID()}.jpg`
    const filepath = join(uploadsDir, filename)

    await sharp(image.tmpPath!)
      .resize(1200, 900, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85 })
      .toFile(filepath)

    const item = await SiteGallery.create({
      url: `/uploads/gallery/${filename}`,
      caption,
      position,
    })

    return response.ok(item)
  }

  async update({ params, request, response }: HttpContext) {
    const item = await SiteGallery.findOrFail(params.id)
    const { caption, position } = request.only(['caption', 'position'])
    if (caption !== undefined) item.caption = caption
    if (position !== undefined) item.position = position
    await item.save()
    return response.ok(item)
  }

  async destroy({ params, response }: HttpContext) {
    const item = await SiteGallery.findOrFail(params.id)
    await item.delete()
    return response.ok({ message: 'Supprimé' })
  }
}
