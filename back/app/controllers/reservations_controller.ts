import type { HttpContext } from '@adonisjs/core/http'
import Reservation from '#models/reservation'
import ReservationItem from '#models/reservation_item'
import Product from '#models/product'
import {
  createReservationValidator,
  updateReservationStatusValidator,
} from '#validators/reservation'

export default class ReservationsController {
  async index({ response }: HttpContext) {
    const reservations = await Reservation.query()
      .preload('user')
      .preload('date', (q) => q.preload('lieu'))
      .preload('items', (q) => q.preload('product'))
      .orderBy('created_at', 'desc')
    return response.ok(reservations)
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createReservationValidator)

    // Calcul du total
    let total = 0
    for (const item of payload.items) {
      const product = await Product.findOrFail(item.productId)
      total += product.price * item.qty // à adapter selon le format du prix
    }

    const reservation = await Reservation.create({
      userId: user.id,
      dateId: payload.dateId,
      status: 'pending',
      total,
    })

    for (const item of payload.items) {
      const product = await Product.findOrFail(item.productId)
      await ReservationItem.create({
        reservationId: reservation.id,
        productId: item.productId,
        qty: item.qty,
        unitPrice: 0, // à adapter
      })
    }

    await reservation.load('items', (q) => q.preload('product'))
    await reservation.load('date', (q) => q.preload('lieu'))

    return response.created(reservation)
  }

  async show({ params, response }: HttpContext) {
    const reservation = await Reservation.query()
      .where('id', params.id)
      .preload('user')
      .preload('date', (q) => q.preload('lieu'))
      .preload('items', (q) => q.preload('product'))
      .firstOrFail()
    return response.ok(reservation)
  }

  async update({ params, request, response }: HttpContext) {
    const reservation = await Reservation.findOrFail(params.id)
    const payload = await request.validateUsing(updateReservationStatusValidator)
    reservation.merge(payload)
    await reservation.save()
    return response.ok(reservation)
  }

  async destroy({ params, response }: HttpContext) {
    const reservation = await Reservation.findOrFail(params.id)
    await reservation.delete()
    return response.noContent()
  }

  async myReservations({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const reservations = await Reservation.query()
      .where('user_id', user.id)
      .preload('date', (q) => q.preload('lieu'))
      .preload('items', (q) => q.preload('product'))
      .orderBy('created_at', 'desc')
    return response.ok(reservations)
  }
}
