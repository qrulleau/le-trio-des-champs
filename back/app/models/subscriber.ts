import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import City from './city.js'

export default class Subscriber extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare phone: string

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => City, {
    pivotTable: 'subscriber_cities',
  })
  declare cities: ManyToMany<typeof City>
}
