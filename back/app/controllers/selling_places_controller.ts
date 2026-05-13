import type { HttpContext } from '@adonisjs/core/http'
import SellingPlace from '#models/selling_place'
import { createSellingPlaceValidator, updateSellingPlaceValidator } from '#validators/selling_place'

export default class SellingPlacesController {
  async index({ response }: HttpContext) {
    const sellingPlaces = await SellingPlace.all()
    return response.ok(sellingPlaces)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateSettingValidator)
    const settings = await Setting.create({
      ...payload,
      phones: payload.phones ? JSON.stringify(payload.phones) : null,
    })
    return response.created(settings)
  }

  async show({ params, response }: HttpContext) {
    const sellingPlace = await SellingPlace.findOrFail(params.id)
    return response.ok(sellingPlace)
  }

  async update({ params, request, response }: HttpContext) {
    const settings = await Setting.findOrFail(params.id)
    const payload = await request.validateUsing(updateSettingValidator)
    settings.merge({
      ...payload,
      phones: payload.phones ? JSON.stringify(payload.phones) : null,
    })
    await settings.save()
    return response.ok(settings)
  }

  async destroy({ params, response }: HttpContext) {
    const sellingPlace = await SellingPlace.findOrFail(params.id)
    await sellingPlace.delete()
    return response.noContent()
  }
}
