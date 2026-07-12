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
const DistributionDatesController = () => import('#controllers/distribution_dates_controller')
const ReservationsController = () => import('#controllers/reservations_controller')
const ContactPeopleController = () => import('#controllers/contact_people_controller')
const DateProductStocksController = () => import('#controllers/date_product_stocks_controller')
const ProductImagesController = () => import('#controllers/product_images_controller')
const SiteImagesController = () => import('#controllers/site_images_controller')
const SiteContentsController = () => import('#controllers/site_contents_controller')
const SiteGalleryController = () => import('#controllers/site_gallery_controller')

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
                router.put('profile', [controllers.Profile, 'update'])
                router.put('password', [controllers.Profile, 'changePassword'])
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
        router.resource('distribution-dates', DistributionDatesController).apiOnly().only(['index', 'show'])
        router.post('subscribers', [SubscribersController, 'store'])
        .as('subscribers.public.store')
        .use(subscriberThrottle)
        router.get('site-images', [SiteImagesController, 'index'])
        router.get('site-contents', [SiteContentsController, 'index'])
        router.get('site-gallery', [SiteGalleryController, 'index'])
        router.get('announcements', [AnnouncementsController, 'index'])
        .as('announcements.public.index')

        // Routes admin (protégées)
        router
        .group(() => {
                router.resource('announcements', AnnouncementsController).apiOnly()
                router.resource('settings', SettingsController).apiOnly()
                router.resource('subscribers', SubscribersController).apiOnly()
                router.resource('distribution-dates', DistributionDatesController).apiOnly()
                router.resource('reservations', ReservationsController).apiOnly()
                router.resource('contact-people', ContactPeopleController).apiOnly().except(['show'])
                router.get('distribution-dates/:dateId/stocks', [DateProductStocksController, 'index'])
                router.put('distribution-dates/:dateId/stocks', [DateProductStocksController, 'upsert'])
                router.post('products/:id/image', [ProductImagesController, 'store'])
                router.delete('products/:id/image', [ProductImagesController, 'destroy'])
                router.get('site-images', [SiteImagesController, 'index'])
                router.post('site-images/:slotKey', [SiteImagesController, 'store'])
                router.delete('site-images/:slotKey', [SiteImagesController, 'destroy'])
                router.get('site-contents', [SiteContentsController, 'index'])
                router.post('site-contents', [SiteContentsController, 'upsert'])
                router.post('site-contents/bulk', [SiteContentsController, 'bulkUpsert'])
                router.get('site-gallery', [SiteGalleryController, 'index'])
                router.post('site-gallery', [SiteGalleryController, 'store'])
                router.patch('site-gallery/:id', [SiteGalleryController, 'update'])
                router.delete('site-gallery/:id', [SiteGalleryController, 'destroy'])
                })
        .use(middleware.auth())
            .prefix('admin')
            .as('admin')

            // Route réservations pour utilisateurs connectés
            router
            .group(() => {
                    router.post('reservations', [ReservationsController, 'store'])
                    router.get('reservations/my', [ReservationsController, 'myReservations'])
            router.patch('reservations/:id/cancel', [ReservationsController, 'cancel'])
                    })
        .use(middleware.auth())
            .prefix('user')
            .as('user')
})
.prefix('/api/v1')
