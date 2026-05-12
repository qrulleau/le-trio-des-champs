import vine from '@vinejs/vine'

export const createCityValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    color: vine.string().trim().maxLength(7),
  })
)

export const updateCityValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    color: vine.string().trim().maxLength(7).optional(),
  })
)
