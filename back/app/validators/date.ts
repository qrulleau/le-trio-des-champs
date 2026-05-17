import vine from '@vinejs/vine'

export const createDateValidator = vine.compile(
  vine.object({
    lieuId: vine.number().positive(),
    date: vine
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/),
    time: vine.string().trim().maxLength(50).optional(),
    capacity: vine.number().positive().optional(),
    notes: vine.string().trim().maxLength(500).optional(),
  })
)

export const updateDateValidator = vine.compile(
  vine.object({
    lieuId: vine.number().positive().optional(),
    date: vine
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    time: vine.string().trim().maxLength(50).optional(),
    capacity: vine.number().positive().optional(),
    notes: vine.string().trim().maxLength(500).optional(),
  })
)
