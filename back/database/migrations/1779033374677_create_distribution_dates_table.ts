import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'distribution_dates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('city_id').unsigned().references('id').inTable('cities').onDelete('CASCADE')
      table.date('date').notNullable()
      table.string('time', 50).notNullable().defaultTo('17h00 – 19h00')
      table.integer('capacity').notNullable().defaultTo(80)
      table.text('notes').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
