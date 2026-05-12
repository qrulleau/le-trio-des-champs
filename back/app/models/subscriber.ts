import { SubscriberSchema } from '#database/schema'
import { manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import City from './city.js'

export default class Subscriber extends SubscriberSchema {
  @manyToMany(() => City, {
    pivotTable: 'subscriber_cities',
  })
  declare cities: ManyToMany<typeof City>
}
