import type { HttpContext } from '@adonisjs/core/http'
import SellingPlace from '#models/selling_place'

export default class SellingPlacesController {
  async index({ response }: HttpContext) {
    const sellingPlaces = await SellingPlace.all()
    return response.ok(sellingPlaces)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'address', 'schedule'])
    const sellingPlace = await SellingPlace.create(data)
    return response.created(sellingPlace)
  }

  async show({ params, response }: HttpContext) {
    const sellingPlace = await SellingPlace.findOrFail(params.id)
    return response.ok(sellingPlace)
  }

  async update({ params, request, response }: HttpContext) {
    const sellingPlace = await SellingPlace.findOrFail(params.id)
    const data = request.only(['name', 'address', 'schedule'])
    sellingPlace.merge(data)
    await sellingPlace.save()
    return response.ok(sellingPlace)
  }

  async destroy({ params, response }: HttpContext) {
    const sellingPlace = await SellingPlace.findOrFail(params.id)
    await sellingPlace.delete()
    return response.noContent()
  }
}
