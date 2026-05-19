import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    description: vine.string().trim().maxLength(500).optional(),
    price: vine.string().trim().maxLength(50),
    imageUrl: vine.string().trim().url().maxLength(500).optional(),
    unit: vine.string().trim().maxLength(100).optional(),
    stockPerDate: vine.number().min(0).optional(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    description: vine.string().trim().maxLength(500).optional(),
    price: vine.string().trim().maxLength(50).optional(),
    imageUrl: vine.string().trim().url().maxLength(500).optional(),
    unit: vine.string().trim().maxLength(100).optional(),
    stockPerDate: vine.number().min(0).optional(),
  })
)
