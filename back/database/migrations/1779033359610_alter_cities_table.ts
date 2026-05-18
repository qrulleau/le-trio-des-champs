import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cities'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('address', 300).nullable()
      table.enum('type', ['permanence', 'tournee']).notNullable().defaultTo('tournee')
      table.text('notes').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('address')
      table.dropColumn('type')
      table.dropColumn('notes')
    })
  }
}
