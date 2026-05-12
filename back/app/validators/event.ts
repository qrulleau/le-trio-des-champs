import vine from '@vinejs/vine'

import vine from '@vinejs/vine'

export const createEventValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    location: vine.string().trim(),
    description: vine.string().trim().optional(),
    date: vine.date(),
    isRecurring: vine.boolean().optional(),
  })
)

export const updateEventValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    location: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    date: vine.date().optional(),
    isRecurring: vine.boolean().optional(),
  })
)
