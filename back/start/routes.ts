/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { subscriberThrottle } from '#start/limiter'

const CitiesController = () => import('#controllers/cities_controller')
const ProductsController = () => import('#controllers/products_controller')
const SellingPlacesController = () => import('#controllers/selling_places_controller')
const EventsController = () => import('#controllers/events_controller')
const SubscribersController = () => import('#controllers/subscribers_controller')
const AnnouncementsController = () => import('#controllers/announcements_controller')
const SettingsController = () => import('#controllers/settings_controller')
const LieuxController = () => import('#controllers/lieux_controller')
const DatesController = () => import('#controllers/dates_controller')
const ReservationsController = () => import('#controllers/reservations_controller')

router
  .group(() => {
    // Auth
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    // Routes publiques
    router.resource('cities', CitiesController).apiOnly()
    router.resource('products', ProductsController).apiOnly()
    router.resource('selling-places', SellingPlacesController).apiOnly()
    router.resource('events', EventsController).apiOnly()
    router.resource('lieux', LieuxController).apiOnly().only(['index', 'show'])
    router.resource('dates', DatesController).apiOnly().only(['index', 'show'])
    router.post('subscribers', [SubscribersController, 'store'])
    .as('subscribers.public.store')
    .use(subscriberThrottle)

    router.get('announcements', [AnnouncementsController, 'index'])
    .as('announcements.public.index')

    // Routes admin (protégées)
    router
      .group(() => {
        router.resource('announcements', AnnouncementsController).apiOnly()
        router.resource('settings', SettingsController).apiOnly()
        router.resource('subscribers', SubscribersController).apiOnly()
        router.resource('lieux', LieuxController).apiOnly()
        router.resource('dates', DatesController).apiOnly()
        router.resource('reservations', ReservationsController).apiOnly()
        router.get('reservations/my', [ReservationsController, 'myReservations'])
      })
      .use(middleware.auth())
      .prefix('admin')
      .as('admin')

    // Route réservations pour utilisateurs connectés
    router
      .group(() => {
        router.post('reservations', [ReservationsController, 'store'])
        router.get('reservations/my', [ReservationsController, 'myReservations'])
      })
  .use(middleware.auth())
  .prefix('user')
  .as('user')
  })
  .prefix('/api/v1')
