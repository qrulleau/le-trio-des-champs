import vine from '@vinejs/vine'

import vine from '@vinejs/vine'

export const createSubscriberValidator = vine.compile(
  vine.object({
    phone: vine.string().trim(),
    email: vine.string().trim().email(),
    cityIds: vine.array(vine.number()),
  })
)
