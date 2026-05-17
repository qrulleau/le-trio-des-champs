import type { HttpContext } from '@adonisjs/core/http'
import Lieu from '#models/lieu'
import { createLieuValidator, updateLieuValidator } from '#validators/lieu'

export default class LieuxController {
  async index({ response }: HttpContext) {
    const lieux = await Lieu.query().preload('dates').orderBy('name', 'asc')
    return response.ok(lieux)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createLieuValidator)
    const lieu = await Lieu.create(payload)
    return response.created(lieu)
  }

  async show({ params, response }: HttpContext) {
    const lieu = await Lieu.query().where('id', params.id).preload('dates').firstOrFail()
    return response.ok(lieu)
  }

  async update({ params, request, response }: HttpContext) {
    const lieu = await Lieu.findOrFail(params.id)
    const payload = await request.validateUsing(updateLieuValidator)
    lieu.merge(payload)
    await lieu.save()
    return response.ok(lieu)
  }

  async destroy({ params, response }: HttpContext) {
    const lieu = await Lieu.findOrFail(params.id)
    await lieu.delete()
    return response.noContent()
  }
}
