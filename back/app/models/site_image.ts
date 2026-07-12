import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class SiteImage extends BaseModel {
  static table = 'site_images'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slotKey: string

  @column()
  declare url: string | null

  @column()
  declare alt: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
