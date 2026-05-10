/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'cities.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/cities',
    tokens: [{"old":"/api/v1/cities","type":0,"val":"api","end":""},{"old":"/api/v1/cities","type":0,"val":"v1","end":""},{"old":"/api/v1/cities","type":0,"val":"cities","end":""}],
    types: placeholder as Registry['cities.index']['types'],
  },
  'cities.store': {
    methods: ["POST"],
    pattern: '/api/v1/cities',
    tokens: [{"old":"/api/v1/cities","type":0,"val":"api","end":""},{"old":"/api/v1/cities","type":0,"val":"v1","end":""},{"old":"/api/v1/cities","type":0,"val":"cities","end":""}],
    types: placeholder as Registry['cities.store']['types'],
  },
  'cities.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/cities/:id',
    tokens: [{"old":"/api/v1/cities/:id","type":0,"val":"api","end":""},{"old":"/api/v1/cities/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/cities/:id","type":0,"val":"cities","end":""},{"old":"/api/v1/cities/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cities.show']['types'],
  },
  'cities.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/cities/:id',
    tokens: [{"old":"/api/v1/cities/:id","type":0,"val":"api","end":""},{"old":"/api/v1/cities/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/cities/:id","type":0,"val":"cities","end":""},{"old":"/api/v1/cities/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cities.update']['types'],
  },
  'cities.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/cities/:id',
    tokens: [{"old":"/api/v1/cities/:id","type":0,"val":"api","end":""},{"old":"/api/v1/cities/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/cities/:id","type":0,"val":"cities","end":""},{"old":"/api/v1/cities/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cities.destroy']['types'],
  },
  'products.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/products',
    tokens: [{"old":"/api/v1/products","type":0,"val":"api","end":""},{"old":"/api/v1/products","type":0,"val":"v1","end":""},{"old":"/api/v1/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.index']['types'],
  },
  'products.store': {
    methods: ["POST"],
    pattern: '/api/v1/products',
    tokens: [{"old":"/api/v1/products","type":0,"val":"api","end":""},{"old":"/api/v1/products","type":0,"val":"v1","end":""},{"old":"/api/v1/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.store']['types'],
  },
  'products.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.show']['types'],
  },
  'products.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.update']['types'],
  },
  'products.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.destroy']['types'],
  },
  'selling_places.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/selling-places',
    tokens: [{"old":"/api/v1/selling-places","type":0,"val":"api","end":""},{"old":"/api/v1/selling-places","type":0,"val":"v1","end":""},{"old":"/api/v1/selling-places","type":0,"val":"selling-places","end":""}],
    types: placeholder as Registry['selling_places.index']['types'],
  },
  'selling_places.store': {
    methods: ["POST"],
    pattern: '/api/v1/selling-places',
    tokens: [{"old":"/api/v1/selling-places","type":0,"val":"api","end":""},{"old":"/api/v1/selling-places","type":0,"val":"v1","end":""},{"old":"/api/v1/selling-places","type":0,"val":"selling-places","end":""}],
    types: placeholder as Registry['selling_places.store']['types'],
  },
  'selling_places.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/selling-places/:id',
    tokens: [{"old":"/api/v1/selling-places/:id","type":0,"val":"api","end":""},{"old":"/api/v1/selling-places/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/selling-places/:id","type":0,"val":"selling-places","end":""},{"old":"/api/v1/selling-places/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['selling_places.show']['types'],
  },
  'selling_places.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/selling-places/:id',
    tokens: [{"old":"/api/v1/selling-places/:id","type":0,"val":"api","end":""},{"old":"/api/v1/selling-places/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/selling-places/:id","type":0,"val":"selling-places","end":""},{"old":"/api/v1/selling-places/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['selling_places.update']['types'],
  },
  'selling_places.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/selling-places/:id',
    tokens: [{"old":"/api/v1/selling-places/:id","type":0,"val":"api","end":""},{"old":"/api/v1/selling-places/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/selling-places/:id","type":0,"val":"selling-places","end":""},{"old":"/api/v1/selling-places/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['selling_places.destroy']['types'],
  },
  'events.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/events',
    tokens: [{"old":"/api/v1/events","type":0,"val":"api","end":""},{"old":"/api/v1/events","type":0,"val":"v1","end":""},{"old":"/api/v1/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['events.index']['types'],
  },
  'events.store': {
    methods: ["POST"],
    pattern: '/api/v1/events',
    tokens: [{"old":"/api/v1/events","type":0,"val":"api","end":""},{"old":"/api/v1/events","type":0,"val":"v1","end":""},{"old":"/api/v1/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['events.store']['types'],
  },
  'events.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/events/:id',
    tokens: [{"old":"/api/v1/events/:id","type":0,"val":"api","end":""},{"old":"/api/v1/events/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:id","type":0,"val":"events","end":""},{"old":"/api/v1/events/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['events.show']['types'],
  },
  'events.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/events/:id',
    tokens: [{"old":"/api/v1/events/:id","type":0,"val":"api","end":""},{"old":"/api/v1/events/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:id","type":0,"val":"events","end":""},{"old":"/api/v1/events/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['events.update']['types'],
  },
  'events.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/events/:id',
    tokens: [{"old":"/api/v1/events/:id","type":0,"val":"api","end":""},{"old":"/api/v1/events/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/events/:id","type":0,"val":"events","end":""},{"old":"/api/v1/events/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['events.destroy']['types'],
  },
  'subscribers.public.store': {
    methods: ["POST"],
    pattern: '/api/v1/subscribers',
    tokens: [{"old":"/api/v1/subscribers","type":0,"val":"api","end":""},{"old":"/api/v1/subscribers","type":0,"val":"v1","end":""},{"old":"/api/v1/subscribers","type":0,"val":"subscribers","end":""}],
    types: placeholder as Registry['subscribers.public.store']['types'],
  },
  'admin.announcements.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/announcements',
    tokens: [{"old":"/api/v1/admin/announcements","type":0,"val":"api","end":""},{"old":"/api/v1/admin/announcements","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/announcements","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/announcements","type":0,"val":"announcements","end":""}],
    types: placeholder as Registry['admin.announcements.index']['types'],
  },
  'admin.announcements.store': {
    methods: ["POST"],
    pattern: '/api/v1/admin/announcements',
    tokens: [{"old":"/api/v1/admin/announcements","type":0,"val":"api","end":""},{"old":"/api/v1/admin/announcements","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/announcements","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/announcements","type":0,"val":"announcements","end":""}],
    types: placeholder as Registry['admin.announcements.store']['types'],
  },
  'admin.announcements.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/announcements/:id',
    tokens: [{"old":"/api/v1/admin/announcements/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/announcements/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/announcements/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/announcements/:id","type":0,"val":"announcements","end":""},{"old":"/api/v1/admin/announcements/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.announcements.show']['types'],
  },
  'admin.announcements.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/admin/announcements/:id',
    tokens: [{"old":"/api/v1/admin/announcements/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/announcements/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/announcements/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/announcements/:id","type":0,"val":"announcements","end":""},{"old":"/api/v1/admin/announcements/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.announcements.update']['types'],
  },
  'admin.announcements.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/admin/announcements/:id',
    tokens: [{"old":"/api/v1/admin/announcements/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/announcements/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/announcements/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/announcements/:id","type":0,"val":"announcements","end":""},{"old":"/api/v1/admin/announcements/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.announcements.destroy']['types'],
  },
  'admin.settings.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/settings',
    tokens: [{"old":"/api/v1/admin/settings","type":0,"val":"api","end":""},{"old":"/api/v1/admin/settings","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/settings","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/settings","type":0,"val":"settings","end":""}],
    types: placeholder as Registry['admin.settings.index']['types'],
  },
  'admin.settings.store': {
    methods: ["POST"],
    pattern: '/api/v1/admin/settings',
    tokens: [{"old":"/api/v1/admin/settings","type":0,"val":"api","end":""},{"old":"/api/v1/admin/settings","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/settings","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/settings","type":0,"val":"settings","end":""}],
    types: placeholder as Registry['admin.settings.store']['types'],
  },
  'admin.settings.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/settings/:id',
    tokens: [{"old":"/api/v1/admin/settings/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/settings/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/settings/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/settings/:id","type":0,"val":"settings","end":""},{"old":"/api/v1/admin/settings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.settings.show']['types'],
  },
  'admin.settings.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/admin/settings/:id',
    tokens: [{"old":"/api/v1/admin/settings/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/settings/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/settings/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/settings/:id","type":0,"val":"settings","end":""},{"old":"/api/v1/admin/settings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.settings.update']['types'],
  },
  'admin.settings.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/admin/settings/:id',
    tokens: [{"old":"/api/v1/admin/settings/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/settings/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/settings/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/settings/:id","type":0,"val":"settings","end":""},{"old":"/api/v1/admin/settings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.settings.destroy']['types'],
  },
  'admin.subscribers.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/subscribers',
    tokens: [{"old":"/api/v1/admin/subscribers","type":0,"val":"api","end":""},{"old":"/api/v1/admin/subscribers","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/subscribers","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/subscribers","type":0,"val":"subscribers","end":""}],
    types: placeholder as Registry['admin.subscribers.index']['types'],
  },
  'admin.subscribers.store': {
    methods: ["POST"],
    pattern: '/api/v1/admin/subscribers',
    tokens: [{"old":"/api/v1/admin/subscribers","type":0,"val":"api","end":""},{"old":"/api/v1/admin/subscribers","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/subscribers","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/subscribers","type":0,"val":"subscribers","end":""}],
    types: placeholder as Registry['admin.subscribers.store']['types'],
  },
  'admin.subscribers.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/subscribers/:id',
    tokens: [{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"subscribers","end":""},{"old":"/api/v1/admin/subscribers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.subscribers.show']['types'],
  },
  'admin.subscribers.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/admin/subscribers/:id',
    tokens: [{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"subscribers","end":""},{"old":"/api/v1/admin/subscribers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.subscribers.update']['types'],
  },
  'admin.subscribers.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/admin/subscribers/:id',
    tokens: [{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/subscribers/:id","type":0,"val":"subscribers","end":""},{"old":"/api/v1/admin/subscribers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.subscribers.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
