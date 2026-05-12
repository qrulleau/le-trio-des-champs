import { SubscriberCitySchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Subscriber from './subscriber.js'
import City from './city.js'

export default class SubscriberCity extends SubscriberCitySchema {
  static table = 'subscriber_cities'

  @belongsTo(() => Subscriber)
  declare subscriber: BelongsTo<typeof Subscriber>

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>
}
