import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Reservation from '#models/reservation'
import Product from '#models/product'

export default class ReservationItem extends BaseModel {
  static table = 'reservation_items'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare reservationId: number

  @column()
  declare productId: number

  @column()
  declare qty: number

  @column()
  declare unitPrice: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Reservation)
  declare reservation: BelongsTo<typeof Reservation>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
