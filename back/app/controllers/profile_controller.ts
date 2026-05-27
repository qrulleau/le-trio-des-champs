import vine from '@vinejs/vine'
import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

const updateProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100).optional(),
    email: vine.string().trim().email().optional(),
    phone: vine.string().trim().maxLength(20).optional(),
  })
)

const changePasswordValidator = vine.compile(
  vine.object({
    currentPassword: vine.string(),
    newPassword: vine.string().minLength(4),
  })
)

export default class ProfileController {
  async show({ auth, serialize }: HttpContext) {
    return serialize(UserTransformer.transform(auth.getUserOrFail()))
  }

  async update({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(updateProfileValidator)
    user.merge(payload)
    await user.save()
    return response.ok(UserTransformer.transform(user))
  }

  async changePassword({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { currentPassword, newPassword } = await request.validateUsing(changePasswordValidator)
    const valid = await hash.verify(user.password, currentPassword)
    if (!valid) return response.badRequest({ message: 'Mot de passe actuel incorrect' })
    user.password = newPassword
    await user.save()
    return response.ok({ message: 'Mot de passe mis à jour' })
  }
}
