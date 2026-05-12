import type { HttpContext } from '@adonisjs/core/http'
import Subscriber from '#models/subscriber'
import { createSubscriberValidator } from '#validators/subscriber'

export default class SubscribersController {
  async index({ response }: HttpContext) {
    const subscribers = await Subscriber.query().preload('cities')
    return response.ok(subscribers)
  }

  async store({ request, response }: HttpContext) {
    const { phone, cityIds } = await request.validateUsing(createSubscriberValidator)

    const existing = await Subscriber.query()
      .where('phone', phone)
      .first()

    if (existing) {
      await existing.related('cities').sync(cityIds, false)
      return response.ok(existing)
    }

    const subscriber = await Subscriber.create({ phone })
    await subscriber.related('cities').attach(cityIds)
    return response.created(subscriber)
  }

  async show({ params, response }: HttpContext) {
    const subscriber = await Subscriber.query()
      .where('id', params.id)
      .preload('cities')
      .firstOrFail()
    return response.ok(subscriber)
  }

  async destroy({ params, response }: HttpContext) {
    const subscriber = await Subscriber.findOrFail(params.id)
    await subscriber.delete()
    return response.noContent()
  }
}
