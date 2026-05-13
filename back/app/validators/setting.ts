import vine from '@vinejs/vine'

export const updateSettingValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().optional(),
    phones: vine.array(vine.string().trim()).optional(),
    instagramUrl: vine.string().trim().optional(),
    facebookUrl: vine.string().trim().optional(),
  })
)
