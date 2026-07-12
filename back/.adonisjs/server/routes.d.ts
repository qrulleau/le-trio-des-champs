import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.update': { paramsTuple?: []; params?: {} }
    'profile.profile.change_password': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'cities.index': { paramsTuple?: []; params?: {} }
    'cities.store': { paramsTuple?: []; params?: {} }
    'cities.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cities.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cities.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.index': { paramsTuple?: []; params?: {} }
    'products.store': { paramsTuple?: []; params?: {} }
    'products.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.index': { paramsTuple?: []; params?: {} }
    'selling_places.store': { paramsTuple?: []; params?: {} }
    'selling_places.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.index': { paramsTuple?: []; params?: {} }
    'events.store': { paramsTuple?: []; params?: {} }
    'events.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'distribution_dates.index': { paramsTuple?: []; params?: {} }
    'distribution_dates.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subscribers.public.store': { paramsTuple?: []; params?: {} }
    'site_images.index': { paramsTuple?: []; params?: {} }
    'site_contents.index': { paramsTuple?: []; params?: {} }
    'site_gallery.index': { paramsTuple?: []; params?: {} }
    'announcements.public.index': { paramsTuple?: []; params?: {} }
    'admin.announcements.index': { paramsTuple?: []; params?: {} }
    'admin.announcements.store': { paramsTuple?: []; params?: {} }
    'admin.announcements.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.announcements.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.announcements.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.index': { paramsTuple?: []; params?: {} }
    'admin.settings.store': { paramsTuple?: []; params?: {} }
    'admin.settings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.index': { paramsTuple?: []; params?: {} }
    'admin.subscribers.store': { paramsTuple?: []; params?: {} }
    'admin.subscribers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.distribution_dates.index': { paramsTuple?: []; params?: {} }
    'admin.distribution_dates.store': { paramsTuple?: []; params?: {} }
    'admin.distribution_dates.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.distribution_dates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.distribution_dates.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reservations.index': { paramsTuple?: []; params?: {} }
    'admin.reservations.store': { paramsTuple?: []; params?: {} }
    'admin.reservations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reservations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reservations.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contact_people.index': { paramsTuple?: []; params?: {} }
    'admin.contact_people.store': { paramsTuple?: []; params?: {} }
    'admin.contact_people.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contact_people.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.date_product_stocks.index': { paramsTuple: [ParamValue]; params: {'dateId': ParamValue} }
    'admin.date_product_stocks.upsert': { paramsTuple: [ParamValue]; params: {'dateId': ParamValue} }
    'admin.product_images.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.product_images.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.site_images.index': { paramsTuple?: []; params?: {} }
    'admin.site_images.store': { paramsTuple: [ParamValue]; params: {'slotKey': ParamValue} }
    'admin.site_images.destroy': { paramsTuple: [ParamValue]; params: {'slotKey': ParamValue} }
    'admin.site_contents.index': { paramsTuple?: []; params?: {} }
    'admin.site_contents.upsert': { paramsTuple?: []; params?: {} }
    'admin.site_contents.bulk_upsert': { paramsTuple?: []; params?: {} }
    'admin.site_gallery.index': { paramsTuple?: []; params?: {} }
    'admin.site_gallery.store': { paramsTuple?: []; params?: {} }
    'admin.site_gallery.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.site_gallery.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.reservations.store': { paramsTuple?: []; params?: {} }
    'user.reservations.my_reservations': { paramsTuple?: []; params?: {} }
    'user.reservations.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'cities.store': { paramsTuple?: []; params?: {} }
    'products.store': { paramsTuple?: []; params?: {} }
    'selling_places.store': { paramsTuple?: []; params?: {} }
    'events.store': { paramsTuple?: []; params?: {} }
    'subscribers.public.store': { paramsTuple?: []; params?: {} }
    'admin.announcements.store': { paramsTuple?: []; params?: {} }
    'admin.settings.store': { paramsTuple?: []; params?: {} }
    'admin.subscribers.store': { paramsTuple?: []; params?: {} }
    'admin.distribution_dates.store': { paramsTuple?: []; params?: {} }
    'admin.reservations.store': { paramsTuple?: []; params?: {} }
    'admin.contact_people.store': { paramsTuple?: []; params?: {} }
    'admin.product_images.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.site_images.store': { paramsTuple: [ParamValue]; params: {'slotKey': ParamValue} }
    'admin.site_contents.upsert': { paramsTuple?: []; params?: {} }
    'admin.site_contents.bulk_upsert': { paramsTuple?: []; params?: {} }
    'admin.site_gallery.store': { paramsTuple?: []; params?: {} }
    'user.reservations.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'cities.index': { paramsTuple?: []; params?: {} }
    'cities.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.index': { paramsTuple?: []; params?: {} }
    'products.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.index': { paramsTuple?: []; params?: {} }
    'selling_places.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.index': { paramsTuple?: []; params?: {} }
    'events.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'distribution_dates.index': { paramsTuple?: []; params?: {} }
    'distribution_dates.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'site_images.index': { paramsTuple?: []; params?: {} }
    'site_contents.index': { paramsTuple?: []; params?: {} }
    'site_gallery.index': { paramsTuple?: []; params?: {} }
    'announcements.public.index': { paramsTuple?: []; params?: {} }
    'admin.announcements.index': { paramsTuple?: []; params?: {} }
    'admin.announcements.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.index': { paramsTuple?: []; params?: {} }
    'admin.settings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.index': { paramsTuple?: []; params?: {} }
    'admin.subscribers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.distribution_dates.index': { paramsTuple?: []; params?: {} }
    'admin.distribution_dates.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reservations.index': { paramsTuple?: []; params?: {} }
    'admin.reservations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contact_people.index': { paramsTuple?: []; params?: {} }
    'admin.date_product_stocks.index': { paramsTuple: [ParamValue]; params: {'dateId': ParamValue} }
    'admin.site_images.index': { paramsTuple?: []; params?: {} }
    'admin.site_contents.index': { paramsTuple?: []; params?: {} }
    'admin.site_gallery.index': { paramsTuple?: []; params?: {} }
    'user.reservations.my_reservations': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'cities.index': { paramsTuple?: []; params?: {} }
    'cities.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.index': { paramsTuple?: []; params?: {} }
    'products.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.index': { paramsTuple?: []; params?: {} }
    'selling_places.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.index': { paramsTuple?: []; params?: {} }
    'events.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'distribution_dates.index': { paramsTuple?: []; params?: {} }
    'distribution_dates.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'site_images.index': { paramsTuple?: []; params?: {} }
    'site_contents.index': { paramsTuple?: []; params?: {} }
    'site_gallery.index': { paramsTuple?: []; params?: {} }
    'announcements.public.index': { paramsTuple?: []; params?: {} }
    'admin.announcements.index': { paramsTuple?: []; params?: {} }
    'admin.announcements.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.index': { paramsTuple?: []; params?: {} }
    'admin.settings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.index': { paramsTuple?: []; params?: {} }
    'admin.subscribers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.distribution_dates.index': { paramsTuple?: []; params?: {} }
    'admin.distribution_dates.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reservations.index': { paramsTuple?: []; params?: {} }
    'admin.reservations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contact_people.index': { paramsTuple?: []; params?: {} }
    'admin.date_product_stocks.index': { paramsTuple: [ParamValue]; params: {'dateId': ParamValue} }
    'admin.site_images.index': { paramsTuple?: []; params?: {} }
    'admin.site_contents.index': { paramsTuple?: []; params?: {} }
    'admin.site_gallery.index': { paramsTuple?: []; params?: {} }
    'user.reservations.my_reservations': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'profile.profile.update': { paramsTuple?: []; params?: {} }
    'profile.profile.change_password': { paramsTuple?: []; params?: {} }
    'cities.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.announcements.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.distribution_dates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reservations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contact_people.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.date_product_stocks.upsert': { paramsTuple: [ParamValue]; params: {'dateId': ParamValue} }
  }
  PATCH: {
    'cities.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.announcements.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.distribution_dates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reservations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contact_people.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.site_gallery.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.reservations.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'cities.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.announcements.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.distribution_dates.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reservations.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contact_people.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.product_images.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.site_images.destroy': { paramsTuple: [ParamValue]; params: {'slotKey': ParamValue} }
    'admin.site_gallery.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}