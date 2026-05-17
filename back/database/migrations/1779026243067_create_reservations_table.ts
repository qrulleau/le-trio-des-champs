import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('date_id').unsigned().references('id').inTable('dates').onDelete('CASCADE')
      table.enum('status', ['pending', 'confirmed', 'cancelled']).notNullable().defaultTo('pending')
      table.decimal('total', 8, 2).notNullable().defaultTo(0)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
