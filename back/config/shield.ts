import { defineConfig } from '@adonisjs/shield'

const shieldConfig = defineConfig({
  csp: {
    enabled: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
    },
    reportOnly: false,
  },
  csrf: {
    enabled: false, // API REST — pas de CSRF nécessaire avec Bearer token
    exceptRoutes: [],
    enableXsrfCookie: false,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },
  xFrame: {
    enabled: true,
    action: 'DENY',
  },
  hsts: {
    enabled: true,
    maxAge: '180 days',
  },
  contentTypeSniffing: {
    enabled: true,
  },
})

export default shieldConfig
