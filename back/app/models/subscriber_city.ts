import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Subscriber from './subscriber.js'
import City from './city.js'

export default class SubscriberCity extends BaseModel {
  static table = 'subscriber_cities'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare subscriberId: number

  @column()
  declare cityId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Subscriber)
  declare subscriber: BelongsTo<typeof Subscriber>

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>
}
