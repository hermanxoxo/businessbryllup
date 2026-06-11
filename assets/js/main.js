/* bryllupsverdi — main.js */

// NAV: legg til .scrolled-klasse etter 10px scroll
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// NAV: hamburger-meny
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('navMenu');
if (toggle && menu) {
  let savedScrollY = 0;

  function openMenu() {
    savedScrollY = window.scrollY;
    // iOS Safari krever position:fixed på body for å stoppe scroll bak menyen
    document.body.style.position = 'fixed';
    document.body.style.top      = `-${savedScrollY}px`;
    document.body.style.width    = '100%';
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    header.classList.add('menu-open');
  }

  function closeMenu() {
    document.body.style.position = '';
    document.body.style.top      = '';
    document.body.style.width    = '';
    window.scrollTo(0, savedScrollY);
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    header.classList.remove('menu-open');
  }

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  });

  // Lukk meny ved klikk på alle nav-lenker
  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Lukk meny ved Escape-tasten
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu();
  });
}

// SCROLL-ANIMASJONER via IntersectionObserver
const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));

// BOOKING URL — vis Calendly-knapp automatisk når CONFIG.BOOKING_URL er satt
(function initBooking() {
  if (typeof CONFIG === 'undefined' || !CONFIG.BOOKING_URL) return;
  document.querySelectorAll('[data-booking-btn]').forEach(btn => {
    btn.href = CONFIG.BOOKING_URL;
    btn.style.display = '';
  });
})();

// DEMO-KORT: skalér iframe slik at den alltid fyller previewboksen
function fitDemoFrames() {
  document.querySelectorAll('.demo-card__preview').forEach(preview => {
    const frame = preview.querySelector('.demo-card__frame');
    if (!frame) return;
    const scale = preview.offsetWidth / 1280;
    frame.style.transform = `scale(${scale})`;
  });
}
fitDemoFrames();
window.addEventListener('resize', fitDemoFrames, { passive: true });

// KONTAKTSKJEMA
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn     = document.getElementById('submitBtn');
    const success = document.getElementById('formSuccess');
    const error   = document.getElementById('formError');
    const data    = Object.fromEntries(new FormData(contactForm));

    btn.disabled    = true;
    btn.textContent = 'Sender…';
    success.style.display = 'none';
    error.style.display   = 'none';

    try {
      if (typeof CONFIG !== 'undefined' && CONFIG.WEB3FORMS_KEY) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: CONFIG.WEB3FORMS_KEY,
            subject:    `Ny henvendelse fra bryllupsverdi.no — ${data.navn || ''}`,
            from_name:  data.navn  || 'Ukjent',
            email:      data.epost || '',
            message:    `Navn: ${data.navn || '–'}\nE-post: ${data.epost || '–'}\nDato: ${data.dato || '–'}\nPakke: ${data.pakke || '–'}\nMelding: ${data.melding || '–'}`,
          }),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
      } else {
        // Web3Forms-nøkkel ikke satt — logg lokalt, vis suksess
        console.warn('WEB3FORMS_KEY ikke satt i config.js', data);
      }
      success.style.display = 'block';
      contactForm.reset();
    } catch {
      error.style.display = 'block';
    } finally {
      btn.disabled    = false;
      btn.textContent = 'Send melding';
    }
  });
}
