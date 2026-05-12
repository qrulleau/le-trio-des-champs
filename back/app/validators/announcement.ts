import vine from '@vinejs/vine'

import vine from '@vinejs/vine'

export const updateAnnouncementValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    eventDate: vine.string().trim().optional(),
    location: vine.string().trim().optional(),
    showLimitedQuantities: vine.boolean().optional(),
    isActive: vine.boolean().optional(),
  })
)
