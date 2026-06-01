/**
 * bryllupsverdi — sentralisert konfigurasjon
 * Alle variabler som trenger å byttes ved oppstart eller ved nytt domene.
 */
const CONFIG = {
  // Oppdater når domenet er klart
  BRAND_NAME:        'bryllupsverdi',
  CONTACT_EMAIL:     'kontakt@bryllupsstudio.no',
  BASE_URL:          'https://hermanxoxo.github.io/businessbryllup',

  // Sett til Calendly-URL når konto er opprettet — Calendly-knapp vises automatisk
  BOOKING_URL:       null,

  // Google Apps Script web app-URL — sett etter deploy av Apps Script
  SHEETS_WEBHOOK_URL: null,

  // GoatCounter-domene, f.eks. 'bryllupsverdi.goatcounter.com' — sett for å aktivere analytics
  ANALYTICS_DOMAIN:  null,

  DEMO_URLS: {
    klassisk: 'demos/klassisk/',
    minimal:  'demos/minimal/',
    botanisk: 'demos/botanisk/',
  },
};
