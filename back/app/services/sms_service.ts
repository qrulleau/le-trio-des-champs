import twilio from 'twilio'

export default class SmsService {
  private client: twilio.Twilio

  constructor() {
    this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  }

  async sendSms(to: string, message: string): Promise<void> {
    await this.client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
  }

  async sendEventNotification(
    phone: string,
    eventTitle: string,
    eventDate: string,
    eventLocation: string,
    products: string[]
  ): Promise<void> {
    const productList = products.map((p) => `• ${p}`).join('\n')

    const message = `
🌾 Le Trio des Champs
━━━━━━━━━━━━━━━━━━
📅 ${eventTitle} - ${eventDate}
📍 ${eventLocation}

🛒 Produits disponibles :
${productList}

À bientôt !
    `.trim()

    await this.sendSms(phone, message)
  }
}
