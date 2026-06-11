/**
 * bryllupsverdi — sentralisert konfigurasjon
 * Alle variabler som trenger å byttes ved oppstart eller ved nytt domene.
 */
const CONFIG = {
  BRAND_NAME:        'bryllupsverdi',
  CONTACT_EMAIL:     'kontakt@bryllupsverdi.no',
  BASE_URL:          'https://bryllupsverdi.no',

  // Web3Forms access key — hent gratis på https://web3forms.com (skriv inn kontakt@bryllupsverdi.no)
  WEB3FORMS_KEY:     null,

  // Sett til Calendly-URL når konto er opprettet — Calendly-knapp vises automatisk
  BOOKING_URL:       null,

  // Google Apps Script web app-URL — sett etter deploy av Apps Script
  SHEETS_WEBHOOK_URL: null,

  // GoatCounter-domene, f.eks. 'bryllupsverdi.goatcounter.com' — sett for å aktivere analytics
  ANALYTICS_DOMAIN:  null,

  DEMO_URLS: {
    klassisk:        'demos/klassisk/',
    minimal:         'demos/minimal/',
    ingridogherman:  'demos/ingridogherman/',
  },
};
