import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import sharp from 'sharp'
import { join } from 'node:path'
import { writeFile, mkdir } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import app from '@adonisjs/core/services/app'

export default class ProductImagesController {
  async store({ params, request, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const image = request.file('image', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })

    if (!image || !image.isValid) {
      return response.badRequest({ message: image?.errors || 'Fichier invalide' })
    }

    const uploadsDir = app.publicPath('uploads/products')
    await mkdir(uploadsDir, { recursive: true })

    const filename = `${randomUUID()}.jpg`
    const filepath = join(uploadsDir, filename)

    // Resize + crop 4:3 (800x600) avec sharp
    await sharp(image.tmpPath!)
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 82 })
      .toFile(filepath)

    // Met à jour l'imageUrl du produit
    product.imageUrl = `/uploads/products/${filename}`
    await product.save()

    return response.ok({ imageUrl: product.imageUrl })
  }

  async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    product.imageUrl = null
    await product.save()
    return response.ok({ message: 'Image supprimée' })
  }
}
