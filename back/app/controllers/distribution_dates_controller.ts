import type { HttpContext } from '@adonisjs/core/http'
import DistributionDate from '#models/distribution_date'
import {
  createDistributionDateValidator,
  updateDistributionDateValidator,
} from '#validators/distribution_date'

export default class DistributionDatesController {
  async index({ response }: HttpContext) {
    const dates = await DistributionDate.query().preload('city').orderBy('date', 'asc')
    return response.ok(dates)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createDistributionDateValidator)
    const date = await DistributionDate.create(payload)
    await date.load('city')
    return response.created(date)
  }

  async show({ params, response }: HttpContext) {
    const date = await DistributionDate.query()
      .where('id', params.id)
      .preload('city')
      .preload('reservations')
      .firstOrFail()
    return response.ok(date)
  }

  async update({ params, request, response }: HttpContext) {
    const date = await DistributionDate.findOrFail(params.id)
    const payload = await request.validateUsing(updateDistributionDateValidator)
    date.merge(payload)
    await date.save()
    await date.load('city')
    return response.ok(date)
  }

  async destroy({ params, response }: HttpContext) {
    const date = await DistributionDate.findOrFail(params.id)
    await date.delete()
    return response.noContent()
  }
}
