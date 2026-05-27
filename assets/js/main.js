/* bryllupsyudi — main.js */

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
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  });

  // Lukk meny ved klikk på lenke
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
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

// SPRÅKVELGER — lagre valg i localStorage og redirect
document.querySelectorAll('[data-lang]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const lang = btn.dataset.lang;
    localStorage.setItem('preferred-lang', lang);
    // Redirect håndteres av href på ankeret
  });
});

// Automatisk språkredirect ved første besøk
(function checkLang() {
  const stored = localStorage.getItem('preferred-lang');
  const current = document.documentElement.lang; // 'no' eller 'en'
  if (!stored) return;

  const isEnPage = window.location.pathname.includes('/en/') || window.location.pathname.includes('/en');
  if (stored === 'en' && current === 'no' && !isEnPage) {
    window.location.replace('/en/');
  }
  if (stored === 'no' && current === 'en') {
    window.location.replace('/');
  }
})();

// BOOKING URL — vis Calendly-knapp automatisk når CONFIG.BOOKING_URL er satt
(function initBooking() {
  if (typeof CONFIG === 'undefined' || !CONFIG.BOOKING_URL) return;
  document.querySelectorAll('[data-booking-btn]').forEach(btn => {
    btn.href = CONFIG.BOOKING_URL;
    btn.style.display = '';
  });
})();

// KONTAKTSKJEMA
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn      = document.getElementById('submitBtn');
    const success  = document.getElementById('formSuccess');
    const error    = document.getElementById('formError');
    const data     = Object.fromEntries(new FormData(contactForm));

    btn.disabled   = true;
    btn.textContent = 'Sender…';
    success.style.display = 'none';
    error.style.display   = 'none';

    try {
      if (typeof CONFIG !== 'undefined' && CONFIG.SHEETS_WEBHOOK_URL) {
        const res = await fetch(CONFIG.SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error('Network response was not ok');
      }
      // Vis suksessmelding uansett (webhook ikke satt opp ennå er ok i dev)
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
