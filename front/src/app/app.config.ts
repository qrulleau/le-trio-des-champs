import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr'
import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr'
import { LOCALE_ID } from '@angular/core'
import { routes } from './app.routes'
import { authInterceptor } from './core/interceptors/auth.interceptor'

registerLocaleData(localeFr)

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
}
