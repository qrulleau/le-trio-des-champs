import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Date from '#models/date'

export default class Lieu extends BaseModel {
  static table = 'lieux'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare type: 'permanence' | 'tournee'

  @column()
  declare color: string

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Date)
  declare dates: HasMany<typeof Date>
}
