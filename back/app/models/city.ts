import { CitySchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import SubscriberCity from './subscriber_city.js'

export default class City extends CitySchema {
  @hasMany(() => SubscriberCity)
  declare subscriberCities: HasMany<typeof SubscriberCity>
}
