import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string().trim().optional(),
    price: vine.string().trim(),
    imageUrl: vine.string().trim().optional(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    price: vine.string().trim().optional(),
    imageUrl: vine.string().trim().optional(),
  })
)
