import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('phones').alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('phones').alter()
    })
  }
}
