import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import DistributionDate from '#models/distribution_date'

export default class City extends BaseModel {
  static table = 'cities'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare color: string

  @column()
  declare address: string | null

  @column()
  declare type: 'permanence' | 'tournee'

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => DistributionDate)
  declare distributionDates: HasMany<typeof DistributionDate>
}
