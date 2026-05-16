import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
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
    'subscribers.public.store': { paramsTuple?: []; params?: {} }
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
    'announcements.public.index': { paramsTuple?: []; params?: {} }
    'admin.announcements.index': { paramsTuple?: []; params?: {} }
    'admin.announcements.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.index': { paramsTuple?: []; params?: {} }
    'admin.settings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.index': { paramsTuple?: []; params?: {} }
    'admin.subscribers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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
    'announcements.public.index': { paramsTuple?: []; params?: {} }
    'admin.announcements.index': { paramsTuple?: []; params?: {} }
    'admin.announcements.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.index': { paramsTuple?: []; params?: {} }
    'admin.settings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.index': { paramsTuple?: []; params?: {} }
    'admin.subscribers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'cities.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.announcements.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'cities.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.announcements.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'cities.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'selling_places.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'events.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.announcements.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.subscribers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}