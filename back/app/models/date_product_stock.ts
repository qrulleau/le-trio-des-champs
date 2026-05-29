import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import DistributionDate from '#models/distribution_date'
import Product from '#models/product'

export default class DateProductStock extends BaseModel {
  static table = 'date_product_stocks'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare distributionDateId: number

  @column()
  declare productId: number

  @column()
  declare stock: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => DistributionDate)
  declare distributionDate: BelongsTo<typeof DistributionDate>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
