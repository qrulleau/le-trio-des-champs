import vine from '@vinejs/vine'

export const createLieuValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    address: vine.string().trim().minLength(5).maxLength(300),
    type: vine.enum(['permanence', 'tournee']),
    color: vine.string().trim().maxLength(20).optional(),
    notes: vine.string().trim().maxLength(500).optional(),
  })
)

export const updateLieuValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    address: vine.string().trim().minLength(5).maxLength(300).optional(),
    type: vine.enum(['permanence', 'tournee']).optional(),
    color: vine.string().trim().maxLength(20).optional(),
    notes: vine.string().trim().maxLength(500).optional(),
  })
)
