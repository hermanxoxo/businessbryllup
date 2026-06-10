// Vis/skjul følge-felt
const hasGuestCheckbox  = document.getElementById('hasGuest');
const guestNameField    = document.getElementById('guestNameField');
const guestNameInput    = document.getElementById('guestName');

hasGuestCheckbox.addEventListener('change', () => {
  const show = hasGuestCheckbox.checked;
  guestNameField.hidden = !show;
  guestNameInput.required = show;
});

// Vis/skjul allergi-detaljer basert på antall
const allergyCount       = document.getElementById('allergyCount');
const allergyDetailField = document.getElementById('allergyDetailField');

allergyCount.addEventListener('change', () => {
  allergyDetailField.hidden = allergyCount.value === '0';
});

// Demo: vis suksessmelding uten å sende til Google Sheets
const form        = document.getElementById('rsvpForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formIntro   = document.getElementById('formIntro');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  if (!nameInput.value.trim()) {
    nameInput.classList.add('error');
    nameError.classList.add('visible');
    valid = false;
  } else {
    nameInput.classList.remove('error');
    nameError.classList.remove('visible');
  }

  if (hasGuestCheckbox.checked && !guestNameInput.value.trim()) {
    guestNameInput.classList.add('error');
    document.getElementById('guestError').classList.add('visible');
    valid = false;
  } else {
    guestNameInput.classList.remove('error');
    document.getElementById('guestError').classList.remove('visible');
  }

  if (!valid) return;

  form.hidden        = true;
  formSuccess.hidden = false;
  if (formIntro) formIntro.hidden = true;
});
