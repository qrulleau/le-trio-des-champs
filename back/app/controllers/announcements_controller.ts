import type { HttpContext } from '@adonisjs/core/http'
import Announcement from '#models/announcement'

export default class AnnouncementsController {
  async index({ response }: HttpContext) {
    const announcement = await Announcement.first()
    return response.ok(announcement)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only([
      'title',
      'eventDate',
      'location',
      'showLimitedQuantities',
      'isActive',
    ])
    const announcement = await Announcement.create(data)
    return response.created(announcement)
  }

  async show({ params, response }: HttpContext) {
    const announcement = await Announcement.findOrFail(params.id)
    return response.ok(announcement)
  }

  async update({ params, request, response }: HttpContext) {
    const announcement = await Announcement.findOrFail(params.id)
    const data = request.only([
      'title',
      'eventDate',
      'location',
      'showLimitedQuantities',
      'isActive',
    ])
    announcement.merge(data)
    await announcement.save()
    return response.ok(announcement)
  }

  async destroy({ params, response }: HttpContext) {
    const announcement = await Announcement.findOrFail(params.id)
    await announcement.delete()
    return response.noContent()
  }
}
