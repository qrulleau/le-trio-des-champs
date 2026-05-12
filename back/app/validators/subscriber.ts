import vine from '@vinejs/vine'

export const createSubscriberValidator = vine.compile(
  vine.object({
    phone: vine.string().trim().regex(/^(\+33|0)[67]\d{8}$/),
    cityIds: vine.array(vine.number()).minLength(1),
  })
)
