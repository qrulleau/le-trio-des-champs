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

const CitiesController = () => import('#controllers/cities_controller')
const ProductsController = () => import('#controllers/products_controller')
const SellingPlacesController = () => import('#controllers/selling_places_controller')
const EventsController = () => import('#controllers/events_controller')
const SubscribersController = () => import('#controllers/subscribers_controller')
const AnnouncementsController = () => import('#controllers/announcements_controller')
const SettingsController = () => import('#controllers/settings_controller')

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
    router.post('subscribers', [SubscribersController, 'store']).as('subscribers.public.store')

    // Routes admin (protégées)
    router
      .group(() => {
        router.resource('announcements', AnnouncementsController).apiOnly()
        router.resource('settings', SettingsController).apiOnly()
        router.resource('subscribers', SubscribersController).apiOnly()
      })
      .use(middleware.auth())
      .prefix('admin')
      .as('admin')
  })
  .prefix('/api/v1')
