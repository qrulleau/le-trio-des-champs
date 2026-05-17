import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lieux'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.string('address', 300).notNullable()
      table.enum('type', ['permanence', 'tournee']).notNullable().defaultTo('tournee')
      table.string('color', 20).notNullable().defaultTo('accent')
      table.text('notes').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
