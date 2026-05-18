import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import City from '#models/city'
import Reservation from '#models/reservation'

export default class DistributionDate extends BaseModel {
  static table = 'distribution_dates'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cityId: number

  @column()
  declare date: string

  @column()
  declare time: string

  @column()
  declare capacity: number

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>

  @hasMany(() => Reservation)
  declare reservations: HasMany<typeof Reservation>
}
