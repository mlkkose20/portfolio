// PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('SW kayıtlı'))
      .catch(e => console.log('SW hatası:', e));
  });
}

// EmailJS init
emailjs.init('whEmNCNelDRHGy_YT');

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Form Submit
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name    = document.getElementById('msgName').value.trim();
  const email   = document.getElementById('msgEmail').value.trim();
  const subject = document.getElementById('msgSubject').value.trim();
  const body    = document.getElementById('msgBody').value.trim();

  const btn = this.querySelector('.form-submit');
  btn.textContent = 'Gönderiliyor...';
  btn.disabled = true;

  emailjs.send('service_cfry0hv', 'template_fv8jns3', {
    name:    name,
    email:   email,
    title:   subject,
    message: body
  })
  .then(() => {
    showToast('Mesaj gönderildi! 🌸');
    this.reset();
    btn.textContent = 'Mesaj Gönder ✉️';
    btn.disabled = false;
  })
  .catch((err) => {
    console.error('EmailJS hata:', err);
    showToast('Bir hata oluştu: ' + (err.text || err));
    btn.textContent = 'Mesaj Gönder ✉️';
    btn.disabled = false;
  });
});

function showToast(text) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// Dark / Light Mode Toggle
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeBtn.textContent = '☀️';
}
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});