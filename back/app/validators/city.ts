import vine from '@vinejs/vine'

export const createCityValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    color: vine
      .string()
      .trim()
      .regex(/^#[0-9a-fA-F]{6}$/),
  })
)

export const updateCityValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    color: vine
      .string()
      .trim()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .optional(),
  })
)
