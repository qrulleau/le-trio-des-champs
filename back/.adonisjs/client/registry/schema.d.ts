/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'cities.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/cities'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cities_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cities_controller').default['index']>>>
    }
  }
  'cities.store': {
    methods: ["POST"]
    pattern: '/api/v1/cities'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/city').createCityValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/city').createCityValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cities_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cities_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cities.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/cities/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cities_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cities_controller').default['show']>>>
    }
  }
  'cities.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/cities/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/city').updateCityValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/city').updateCityValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cities_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cities_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cities.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/cities/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cities_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cities_controller').default['destroy']>>>
    }
  }
  'products.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/products'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['index']>>>
    }
  }
  'products.store': {
    methods: ["POST"]
    pattern: '/api/v1/products'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product').createProductValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/product').createProductValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['show']>>>
    }
  }
  'products.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/products/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product').updateProductValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/product').updateProductValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['destroy']>>>
    }
  }
  'selling_places.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/selling-places'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/selling_places_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/selling_places_controller').default['index']>>>
    }
  }
  'selling_places.store': {
    methods: ["POST"]
    pattern: '/api/v1/selling-places'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/selling_places_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/selling_places_controller').default['store']>>>
    }
  }
  'selling_places.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/selling-places/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/selling_places_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/selling_places_controller').default['show']>>>
    }
  }
  'selling_places.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/selling-places/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/selling_places_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/selling_places_controller').default['update']>>>
    }
  }
  'selling_places.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/selling-places/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/selling_places_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/selling_places_controller').default['destroy']>>>
    }
  }
  'events.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/events'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/events_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/events_controller').default['index']>>>
    }
  }
  'events.store': {
    methods: ["POST"]
    pattern: '/api/v1/events'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/event').createEventValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/event').createEventValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/events_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/events_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'events.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/events/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/events_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/events_controller').default['show']>>>
    }
  }
  'events.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/events/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/event').updateEventValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/event').updateEventValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/events_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/events_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'events.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/events/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/events_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/events_controller').default['destroy']>>>
    }
  }
  'distribution_dates.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/distribution-dates'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['index']>>>
    }
  }
  'distribution_dates.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/distribution-dates/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['show']>>>
    }
  }
  'subscribers.public.store': {
    methods: ["POST"]
    pattern: '/api/v1/subscribers'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/subscriber').createSubscriberValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/subscriber').createSubscriberValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'announcements.public.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/announcements'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['index']>>>
    }
  }
  'admin.announcements.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/announcements'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['index']>>>
    }
  }
  'admin.announcements.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/announcements'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/announcement').updateAnnouncementValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/announcement').updateAnnouncementValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.announcements.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/announcements/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['show']>>>
    }
  }
  'admin.announcements.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/admin/announcements/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/announcement').updateAnnouncementValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/announcement').updateAnnouncementValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.announcements.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/announcements/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/announcements_controller').default['destroy']>>>
    }
  }
  'admin.settings.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/settings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings_controller').default['index']>>>
    }
  }
  'admin.settings.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/settings'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/setting').updateSettingValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/setting').updateSettingValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.settings.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/settings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings_controller').default['show']>>>
    }
  }
  'admin.settings.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/admin/settings/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/setting').updateSettingValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/setting').updateSettingValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.settings.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/settings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings_controller').default['destroy']>>>
    }
  }
  'admin.subscribers.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/subscribers'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['index']>>>
    }
  }
  'admin.subscribers.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/subscribers'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/subscriber').createSubscriberValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/subscriber').createSubscriberValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.subscribers.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/subscribers/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['show']>>>
    }
  }
  'admin.subscribers.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/admin/subscribers/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['update']>>>
    }
  }
  'admin.subscribers.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/subscribers/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscribers_controller').default['destroy']>>>
    }
  }
  'admin.distribution_dates.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/distribution-dates'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['index']>>>
    }
  }
  'admin.distribution_dates.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/distribution-dates'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/distribution_date').createDistributionDateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/distribution_date').createDistributionDateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.distribution_dates.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/distribution-dates/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['show']>>>
    }
  }
  'admin.distribution_dates.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/admin/distribution-dates/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/distribution_date').updateDistributionDateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/distribution_date').updateDistributionDateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.distribution_dates.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/distribution-dates/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/distribution_dates_controller').default['destroy']>>>
    }
  }
  'admin.reservations.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/reservations'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['index']>>>
    }
  }
  'admin.reservations.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/reservations'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/reservation').createReservationValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/reservation').createReservationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.reservations.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/reservations/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['show']>>>
    }
  }
  'admin.reservations.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/admin/reservations/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/reservation').updateReservationStatusValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/reservation').updateReservationStatusValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.reservations.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/reservations/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['destroy']>>>
    }
  }
  'user.reservations.store': {
    methods: ["POST"]
    pattern: '/api/v1/user/reservations'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/reservation').createReservationValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/reservation').createReservationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user.reservations.my_reservations': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/user/reservations/my'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['myReservations']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['myReservations']>>>
    }
  }
  'user.reservations.cancel': {
    methods: ["PATCH"]
    pattern: '/api/v1/user/reservations/:id/cancel'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['cancel']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reservations_controller').default['cancel']>>>
    }
  }
}
