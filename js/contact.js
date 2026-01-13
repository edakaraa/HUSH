/**
 * Contact Form - Basit ve Temiz Yapı
 */
(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');

  // Validation Rules
  const rules = {
    name: (v) => {
      const val = v.trim();
      if (val.length < 2) return 'Ad soyad en az 2 karakter olmalıdır.';
      if (val.length > 100) return 'Ad soyad en fazla 100 karakter olabilir.';
      if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(val)) return 'Ad soyad sadece harf içermelidir.';
      return null;
    },
    email: (v) => {
      if (!v.trim()) return 'E-posta adresi gereklidir.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Geçerli bir e-posta adresi giriniz.';
      return null;
    },
    phone: (v) => {
      if (!v.trim()) return null; // Optional
      const cleaned = v.replace(/\s/g, '');
      if (!/^(\+90|0)?5\d{9}$/.test(cleaned)) return 'Geçerli bir telefon numarası giriniz.';
      return null;
    },
    subject: (v) => !v ? 'Lütfen bir konu seçiniz.' : null,
    message: (v) => {
      const val = v.trim();
      if (val.length < 10) return 'Mesajınız en az 10 karakter olmalıdır.';
      if (val.length > 2000) return 'Mesajınız en fazla 2000 karakter olabilir.';
      return null;
    },
    consent: (v) => !v ? 'Gizlilik politikasını kabul etmelisiniz.' : null
  };

  // Field Elements
  const fields = {};
  Object.keys(rules).forEach(name => {
    const input = document.getElementById(name);
    const error = document.getElementById(`${name}-error`);
    if (input && error) fields[name] = { input, error };
  });

  // Show/Hide Error
  function showError(field, msg) {
    field.error.textContent = msg;
    field.error.classList.add('active');
    field.input.setAttribute('aria-invalid', 'true');
    field.input.classList.add('error');
  }

  function clearError(field) {
    field.error.textContent = '';
    field.error.classList.remove('active');
    field.input.setAttribute('aria-invalid', 'false');
    field.input.classList.remove('error');
  }

  // Validate Field
  function validate(name) {
    const field = fields[name];
    if (!field) return true;

    const value = field.input.type === 'checkbox' ? field.input.checked : field.input.value;
    const error = rules[name](value);

    if (error) {
      showError(field, error);
      return false;
    }
    clearError(field);
    return true;
  }

  // Validate All
  function validateAll() {
    return Object.keys(fields).every(name => validate(name));
  }

  // Setup Listeners
  Object.keys(fields).forEach(name => {
    const field = fields[name];
    if (field.input.type === 'checkbox') {
      field.input.addEventListener('change', () => validate(name));
    } else {
      field.input.addEventListener('blur', () => validate(name));
      field.input.addEventListener('input', () => {
        if (field.input.classList.contains('error')) clearError(field);
      });
    }
  });

  // Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successMsg.classList.remove('active');

    if (!validateAll()) {
      const firstInvalid = Object.values(fields).find(f => f.input.getAttribute('aria-invalid') === 'true');
      if (firstInvalid) firstInvalid.input.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Gönderiliyor...</span>';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      successMsg.classList.add('active');
      form.reset();
      Object.values(fields).forEach(clearError);
      
      setTimeout(() => successMsg.classList.remove('active'), 5000);
    } catch (error) {
      console.error('Error:', error);
      if (fields.message) showError(fields.message, 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Mesajı Gönder</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      `;
    }
  });
})();
