import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class SiteGallery extends BaseModel {
  static table = 'site_gallery'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare url: string | null

  @column()
  declare caption: string | null

  @column()
  declare position: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
