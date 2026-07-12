import type { HttpContext } from '@adonisjs/core/http'
import SiteContent from '#models/site_content'

export default class SiteContentsController {
  async index({ response }: HttpContext) {
    const contents = await SiteContent.all()
    const map: Record<string, string | null> = {}
    contents.forEach((c) => {
      map[c.contentKey] = c.value
    })
    return response.ok(map)
  }

  async upsert({ request, response }: HttpContext) {
    const { key, value } = request.only(['key', 'value'])
    if (!key) return response.badRequest({ message: 'key requis' })
    await SiteContent.updateOrCreate({ contentKey: key }, { value })
    return response.ok({ key, value })
  }

  async bulkUpsert({ request, response }: HttpContext) {
    const { entries } = request.only(['entries'])
    if (!Array.isArray(entries))
      return response.badRequest({ message: 'entries doit etre un tableau' })
    for (const { key, value } of entries) {
      await SiteContent.updateOrCreate({ contentKey: key }, { value })
    }
    return response.ok({ updated: entries.length })
  }
}
