// ============ Capçalera: fons sòlid en fer scroll ============
const header = document.getElementById('site-header');
function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// ============ Menú mòbil ============
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menuToggle.setAttribute('aria-label', isOpen ? 'Tancar el menú' : 'Obrir el menú');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Obrir el menú');
  });
});

// ============ Vídeo del Hero: respectar "moviment reduït" ============
const heroVideo = document.getElementById('hero-video');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (heroVideo && prefersReducedMotion.matches) {
  heroVideo.pause();
  heroVideo.removeAttribute('autoplay');
}

// ============ Formulari Participa: desplegar/plegar ============
const toggleFormBtn = document.getElementById('toggle-form');
const formWrap = document.getElementById('participa-form-wrap');

toggleFormBtn.addEventListener('click', () => {
  const isHidden = formWrap.hasAttribute('hidden');
  if (isHidden) {
    formWrap.removeAttribute('hidden');
    // forcem un reflow abans d'afegir la classe perquè la transició s'apliqui
    requestAnimationFrame(() => {
      formWrap.classList.add('open');
      document.getElementById('name').focus();
    });
    toggleFormBtn.setAttribute('aria-expanded', 'true');
  } else {
    formWrap.classList.remove('open');
    toggleFormBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => formWrap.setAttribute('hidden', ''), 450);
  }
});

// ============ Enviament del formulari via Web3Forms (AJAX) ============
const participaForm = document.getElementById('participa-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('form-submit');

participaForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviant...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  const formData = new FormData(participaForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (result.success) {
      formStatus.textContent = 'Gràcies! Hem rebut el teu missatge i el llegirem aviat.';
      formStatus.classList.add('ok');
      participaForm.reset();
    } else {
      throw new Error(result.message || 'Error desconegut');
    }
  } catch (err) {
    formStatus.textContent = 'No hem pogut enviar el missatge. Torna-ho a provar o escriu-nos directament.';
    formStatus.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar →';
  }
});

// ============ Any actual al peu de pàgina ============
document.getElementById('year').textContent = new Date().getFullYear();
