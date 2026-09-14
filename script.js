const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.querySelector('#contact-form');

function closeMenu() {
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelector('#year').textContent = new Date().getFullYear();

function showFieldError(field, message) {
  field.classList.toggle('invalid', Boolean(message));
  const error = document.querySelector(`[data-error-for="${field.id}"]`);
  error.textContent = message;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');
  const status = document.querySelector('.form-status');
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  let isValid = true;

  showFieldError(name, name.value.trim() ? '' : 'Veuillez renseigner votre nom.');
  showFieldError(email, emailIsValid ? '' : 'Veuillez renseigner une adresse email valide.');
  showFieldError(message, message.value.trim().length >= 10 ? '' : 'Votre message doit contenir au moins 10 caractères.');

  if (!name.value.trim() || !emailIsValid || message.value.trim().length < 10) {
    isValid = false;
  }

  if (!isValid) {
    status.textContent = 'Vérifiez les champs indiqués pour continuer.';
    status.style.color = 'var(--red)';
    return;
  }

  status.textContent = 'Merci pour votre message. Il est prêt à être transmis à l’IBE.';
  status.style.color = 'var(--green)';
  contactForm.reset();
  [name, email, message].forEach((field) => field.classList.remove('invalid'));
});
