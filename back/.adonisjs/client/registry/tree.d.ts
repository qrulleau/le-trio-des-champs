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
  lieux: {
    index: typeof routes['lieux.index']
    show: typeof routes['lieux.show']
  }
  dates: {
    index: typeof routes['dates.index']
    show: typeof routes['dates.show']
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
    lieux: {
      index: typeof routes['admin.lieux.index']
      store: typeof routes['admin.lieux.store']
      show: typeof routes['admin.lieux.show']
      update: typeof routes['admin.lieux.update']
      destroy: typeof routes['admin.lieux.destroy']
    }
    dates: {
      index: typeof routes['admin.dates.index']
      store: typeof routes['admin.dates.store']
      show: typeof routes['admin.dates.show']
      update: typeof routes['admin.dates.update']
      destroy: typeof routes['admin.dates.destroy']
    }
    reservations: {
      index: typeof routes['admin.reservations.index']
      store: typeof routes['admin.reservations.store']
      show: typeof routes['admin.reservations.show']
      update: typeof routes['admin.reservations.update']
      destroy: typeof routes['admin.reservations.destroy']
      myReservations: typeof routes['admin.reservations.my_reservations']
    }
  }
  user: {
    reservations: {
      store: typeof routes['user.reservations.store']
      myReservations: typeof routes['user.reservations.my_reservations']
    }
  }
}
