import limiter from '@adonisjs/limiter/services/main'

export const subscriberThrottle = limiter.define('subscribers', () => {
  return limiter.allowRequests(5).every('1 minute')
})

export const reservationThrottle = limiter.define('reservations', () => {
  return limiter.allowRequests(10).every('1 minute')
})

export const authThrottle = limiter.define('auth', () => {
  return limiter.allowRequests(10).every('1 minute').blockFor('20 mins')
})
