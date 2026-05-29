import type { HttpContext } from '@adonisjs/core/http'
import DateProductStock from '#models/date_product_stock'
import Product from '#models/product'
import vine from '@vinejs/vine'

const upsertValidator = vine.compile(
  vine.object({
    productId: vine.number(),
    stock: vine.number().min(0),
  })
)

export default class DateProductStocksController {
  // GET /admin/distribution-dates/:dateId/stocks
  async index({ params, response }: HttpContext) {
    const products = await Product.all()
    const stocks = await DateProductStock.query().where('distribution_date_id', params.dateId)

    const result = products.map((p) => {
      const entry = stocks.find((s) => s.productId === p.id)
      return {
        productId: p.id,
        name: p.name,
        unit: p.unit,
        stock: entry?.stock ?? 0,
      }
    })

    return response.ok(result)
  }

  // PUT /admin/distribution-dates/:dateId/stocks
  async upsert({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(upsertValidator)

    await DateProductStock.updateOrCreate(
      { distributionDateId: params.dateId, productId: payload.productId },
      { stock: payload.stock }
    )

    return response.ok({ message: 'Stock mis à jour' })
  }
}
