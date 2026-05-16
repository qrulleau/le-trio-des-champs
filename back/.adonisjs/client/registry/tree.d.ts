/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  cities: {
    index: typeof routes['cities.index']
    store: typeof routes['cities.store']
    show: typeof routes['cities.show']
    update: typeof routes['cities.update']
    destroy: typeof routes['cities.destroy']
  }
  products: {
    index: typeof routes['products.index']
    store: typeof routes['products.store']
    show: typeof routes['products.show']
    update: typeof routes['products.update']
    destroy: typeof routes['products.destroy']
  }
  sellingPlaces: {
    index: typeof routes['selling_places.index']
    store: typeof routes['selling_places.store']
    show: typeof routes['selling_places.show']
    update: typeof routes['selling_places.update']
    destroy: typeof routes['selling_places.destroy']
  }
  events: {
    index: typeof routes['events.index']
    store: typeof routes['events.store']
    show: typeof routes['events.show']
    update: typeof routes['events.update']
    destroy: typeof routes['events.destroy']
  }
  subscribers: {
    public: {
      store: typeof routes['subscribers.public.store']
    }
  }
  announcements: {
    public: {
      index: typeof routes['announcements.public.index']
    }
  }
  admin: {
    announcements: {
      index: typeof routes['admin.announcements.index']
      store: typeof routes['admin.announcements.store']
      show: typeof routes['admin.announcements.show']
      update: typeof routes['admin.announcements.update']
      destroy: typeof routes['admin.announcements.destroy']
    }
    settings: {
      index: typeof routes['admin.settings.index']
      store: typeof routes['admin.settings.store']
      show: typeof routes['admin.settings.show']
      update: typeof routes['admin.settings.update']
      destroy: typeof routes['admin.settings.destroy']
    }
    subscribers: {
      index: typeof routes['admin.subscribers.index']
      store: typeof routes['admin.subscribers.store']
      show: typeof routes['admin.subscribers.show']
      update: typeof routes['admin.subscribers.update']
      destroy: typeof routes['admin.subscribers.destroy']
    }
  }
}
