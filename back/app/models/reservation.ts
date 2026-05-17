import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Date from '#models/date'
import ReservationItem from '#models/reservation_item'

export default class Reservation extends BaseModel {
  static table = 'reservations'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare dateId: number

  @column()
  declare status: 'pending' | 'confirmed' | 'cancelled'

  @column()
  declare total: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Date)
  declare date: BelongsTo<typeof Date>

  @hasMany(() => ReservationItem)
  declare items: HasMany<typeof ReservationItem>
}
