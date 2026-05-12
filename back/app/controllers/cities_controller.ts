import type { HttpContext } from '@adonisjs/core/http'
import City from '#models/city'
import { createCityValidator, updateCityValidator } from '#validators/city'

export default class CitiesController {
  async index({ response }: HttpContext) {
    const cities = await City.all()
    return response.ok(cities)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCityValidator)
    const city = await City.create(payload)
    return response.created(city)
  }

  async show({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    return response.ok(city)
  }

  async update({ params, request, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    const payload = await request.validateUsing(updateCityValidator)
    city.merge(payload)
    await city.save()
    return response.ok(city)
  }

  async destroy({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    await city.delete()
    return response.noContent()
  }
}
