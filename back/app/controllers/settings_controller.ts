import type { HttpContext } from '@adonisjs/core/http'
import Setting from '#models/setting'

export default class SettingsController {
  async index({ response }: HttpContext) {
    const settings = await Setting.first()
    return response.ok(settings)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['email', 'phones', 'instagramUrl', 'facebookUrl'])
    const settings = await Setting.create(data)
    return response.created(settings)
  }

  async update({ params, request, response }: HttpContext) {
    const settings = await Setting.findOrFail(params.id)
    const data = request.only(['email', 'phones', 'instagramUrl', 'facebookUrl'])
    settings.merge(data)
    await settings.save()
    return response.ok(settings)
  }

  async destroy({ params, response }: HttpContext) {
    const settings = await Setting.findOrFail(params.id)
    await settings.delete()
    return response.noContent()
  }
}
