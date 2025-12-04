// Handles navigation behaviors, mobile menu, smooth scrolling, and form validation.
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  const yearEl = document.getElementById('year');
  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');

  // Set current year in footer.
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle.
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Smooth scrolling for anchor links.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        event.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        navLinks?.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Basic form validation with inline feedback.
  if (form) {
    const requiredFields = ['name', 'email', 'message'];

    const clearErrors = () => {
      form.querySelectorAll('.error-message').forEach(msg => {
        msg.textContent = '';
      });
      form.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
      });
      if (status) status.textContent = '';
    };

    const showError = (fieldId, message) => {
      const field = form.querySelector(`#${fieldId}`);
      if (!field) return;
      const wrapper = field.closest('.form-field');
      wrapper?.querySelector('.error-message')?.setAttribute('role', 'alert');
      if (wrapper) {
        const errorEl = wrapper.querySelector('.error-message');
        if (errorEl) errorEl.textContent = message;
      }
      field.classList.add('error');
    };

    const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    form.addEventListener('submit', event => {
      event.preventDefault();
      clearErrors();

      let valid = true;
      const formData = new FormData(form);

      requiredFields.forEach(field => {
        const value = (formData.get(field) || '').toString().trim();
        if (!value) {
          showError(field, 'This field is required.');
          valid = false;
        }
      });

      const email = (formData.get('email') || '').toString().trim();
      if (email && !isValidEmail(email)) {
        showError('email', 'Please enter a valid email address.');
        valid = false;
      }

      if (!valid) {
        if (status) status.textContent = 'Please correct the highlighted fields.';
        return;
      }

      if (status) status.textContent = 'Thank you. Your message is ready to send and our team will reach out shortly.';
      form.reset();
    });
  }
});
