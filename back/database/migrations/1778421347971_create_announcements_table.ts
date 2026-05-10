import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'announcement'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('event_date').nullable()
      table.string('location').notNullable()
      table.boolean('show_limited_quantities').defaultTo(false)
      table.boolean('is_active').defaultTo(false)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
