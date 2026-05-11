import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import Event from '#models/event'
import Subscriber from '#models/subscriber'
import SmsService from '#services/sms_service'
import Product from '#models/product'
import { DateTime } from 'luxon'

export default class SendSmsNotifications extends BaseCommand {
  static commandName = 'sms:notify'
  static description = 'Send SMS notifications to subscribers for upcoming events'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const smsService = new SmsService()
    const today = DateTime.now()

    // Récupère les événements dans 24h et 48h
    const targetDates = [
      today.plus({ hours: 24 }).toISODate(),
      today.plus({ hours: 48 }).toISODate(),
    ]

    const products = await Product.all()
    const productNames = products.map((p) => `${p.name} - ${p.price}`)

    for (const targetDate of targetDates) {
      const events = await Event.query().where('date', targetDate)

      for (const event of events) {
        // Récupère tous les abonnés avec leurs villes
        const subscribers = await Subscriber.query().preload('cities')

        for (const subscriber of subscribers) {
          try {
            await smsService.sendEventNotification(
              subscriber.phone,
              event.title,
              event.date.toFormat('dd/MM/yyyy'),
              event.location,
              productNames
            )
            this.logger.info(`SMS envoyé à ${subscriber.phone}`)
          } catch (error) {
            this.logger.error(`Erreur envoi SMS à ${subscriber.phone}: ${error.message}`)
          }
        }
      }
    }

    this.logger.info('Notifications SMS terminées')
  }
}
