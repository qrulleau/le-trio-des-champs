import type { HttpContext } from '@adonisjs/core/http'
import Date from '#models/date'
import { createDateValidator, updateDateValidator } from '#validators/date'

export default class DatesController {
  async index({ response }: HttpContext) {
    const dates = await Date.query().preload('lieu').orderBy('date', 'asc')
    return response.ok(dates)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createDateValidator)
    const date = await Date.create(payload)
    await date.load('lieu')
    return response.created(date)
  }

  async show({ params, response }: HttpContext) {
    const date = await Date.query()
      .where('id', params.id)
      .preload('lieu')
      .preload('reservations')
      .firstOrFail()
    return response.ok(date)
  }

  async update({ params, request, response }: HttpContext) {
    const date = await Date.findOrFail(params.id)
    const payload = await request.validateUsing(updateDateValidator)
    date.merge(payload)
    await date.save()
    await date.load('lieu')
    return response.ok(date)
  }

  async destroy({ params, response }: HttpContext) {
    const date = await Date.findOrFail(params.id)
    await date.delete()
    return response.noContent()
  }
}
