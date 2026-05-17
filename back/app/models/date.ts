import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Lieu from '#models/lieu'
import Reservation from '#models/reservation'

export default class Date extends BaseModel {
  static table = 'dates'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare lieuId: number

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

  @belongsTo(() => Lieu)
  declare lieu: BelongsTo<typeof Lieu>

  @hasMany(() => Reservation)
  declare reservations: HasMany<typeof Reservation>
}
