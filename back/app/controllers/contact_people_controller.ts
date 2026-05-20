import type { HttpContext } from '@adonisjs/core/http'
import ContactPerson from '#models/contact_person'
import vine from '@vinejs/vine'

const personValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100),
    role: vine.string().trim().maxLength(100).optional(),
    phone: vine.string().trim().maxLength(20),
  })
)

export default class ContactPeopleController {
  async index({ response }: HttpContext) {
    const people = await ContactPerson.all()
    return response.ok(people)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(personValidator)
    const person = await ContactPerson.create(payload)
    return response.created(person)
  }

  async update({ params, request, response }: HttpContext) {
    const person = await ContactPerson.findOrFail(params.id)
    const payload = await request.validateUsing(personValidator)
    person.merge(payload)
    await person.save()
    return response.ok(person)
  }

  async destroy({ params, response }: HttpContext) {
    const person = await ContactPerson.findOrFail(params.id)
    await person.delete()
    return response.noContent()
  }
}
