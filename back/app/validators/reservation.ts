import vine from '@vinejs/vine'

export const createReservationValidator = vine.compile(
  vine.object({
    dateId: vine.number().positive(),
    items: vine
      .array(
        vine.object({
          productId: vine.number().positive(),
          qty: vine.number().positive().max(100),
        })
      )
      .minLength(1)
      .maxLength(10),
  })
)

export const updateReservationStatusValidator = vine.compile(
  vine.object({
    status: vine.enum(['pending', 'confirmed', 'cancelled']),
  })
)
