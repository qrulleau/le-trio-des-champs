import type { HttpContext } from '@adonisjs/core/http'
import Setting from '#models/setting'
import { updateSettingValidator } from '#validators/setting'

export default class SettingsController {
  async index({ response }: HttpContext) {
    const settings = await Setting.first()
    return response.ok(settings)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateSettingValidator)
    const settings = await Setting.create(payload)
    return response.created(settings)
  }

  async update({ params, request, response }: HttpContext) {
    const settings = await Setting.findOrFail(params.id)
    const payload = await request.validateUsing(updateSettingValidator)
    settings.merge(payload)
    await settings.save()
    return response.ok(settings)
  }

  async destroy({ params, response }: HttpContext) {
    const settings = await Setting.findOrFail(params.id)
    await settings.delete()
    return response.noContent()
  }
}
