import vine from '@vinejs/vine'

export const createEventValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(200),
    location: vine.string().trim().minLength(2).maxLength(200),
    description: vine.string().trim().maxLength(1000).optional(),
    date: vine.date(),
    isRecurring: vine.boolean().optional(),
  })
)

export const updateEventValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(200).optional(),
    location: vine.string().trim().minLength(2).maxLength(200).optional(),
    description: vine.string().trim().maxLength(1000).optional(),
    date: vine.date().optional(),
    isRecurring: vine.boolean().optional(),
  })
)
