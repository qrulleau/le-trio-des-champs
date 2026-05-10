import type { HttpContext } from '@adonisjs/core/http'
import City from '#models/city'

export default class CitiesController {
  async index({ response }: HttpContext) {
    const cities = await City.all()
    return response.ok(cities)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'color'])
    const city = await City.create(data)
    return response.created(city)
  }

  async show({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    return response.ok(city)
  }

  async update({ params, request, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    const data = request.only(['name', 'color'])
    city.merge(data)
    await city.save()
    return response.ok(city)
  }

  async destroy({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    await city.delete()
    return response.noContent()
  }
}
