import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscriber_cities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('subscriber_id').unsigned().references('id').inTable('subscribers').onDelete('CASCADE')
      table.integer('city_id').unsigned().references('id').inTable('cities').onDelete('CASCADE')
      table.unique(['subscriber_id', 'city_id']) // évite les doublons
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
