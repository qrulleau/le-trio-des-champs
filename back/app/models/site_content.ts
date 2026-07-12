import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class SiteContent extends BaseModel {
  static table = 'site_contents'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare contentKey: string

  @column()
  declare value: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
