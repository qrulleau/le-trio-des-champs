import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['date_id'])
      table.dropColumn('date_id')
      table.integer('distribution_date_id').unsigned().references('id').inTable('distribution_dates').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['distribution_date_id'])
      table.dropColumn('distribution_date_id')
      table.integer('date_id').unsigned().references('id').inTable('dates').onDelete('CASCADE')
    })
  }
}
