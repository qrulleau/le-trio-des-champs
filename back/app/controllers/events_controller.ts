import type { HttpContext } from '@adonisjs/core/http'
import Event from '#models/event'
import { createEventValidator, updateEventValidator } from '#validators/event'

export default class EventsController {
  async index({ request, response }: HttpContext) {
    const { month, year } = request.qs()
    let query = Event.query().orderBy('date', 'asc')
    if (month && year) {
      query = query
        .whereRaw('EXTRACT(MONTH FROM date) = ?', [month])
        .whereRaw('EXTRACT(YEAR FROM date) = ?', [year])
    }
    const events = await query
    return response.ok(events)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createEventValidator)
    const event = await Event.create(payload)
    return response.created(event)
  }

  async show({ params, response }: HttpContext) {
    const event = await Event.findOrFail(params.id)
    return response.ok(event)
  }

  async update({ params, request, response }: HttpContext) {
    const event = await Event.findOrFail(params.id)
    const payload = await request.validateUsing(updateEventValidator)
    event.merge(payload)
    await event.save()
    return response.ok(event)
  }

  async destroy({ params, response }: HttpContext) {
    const event = await Event.findOrFail(params.id)
    await event.delete()
    return response.noContent()
  }
}
