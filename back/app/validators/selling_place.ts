import vine from '@vinejs/vine'

export const createSellingPlaceValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    address: vine.string().trim(),
    schedule: vine.string().trim(),
  })
)

export const updateSellingPlaceValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    address: vine.string().trim().optional(),
    schedule: vine.string().trim().optional(),
  })
)
