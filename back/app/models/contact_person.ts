import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class ContactPerson extends BaseModel {
  static table = 'contact_people'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare role: string | null

  @column()
  declare phone: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
