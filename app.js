import { Router } from './router.js';
import { homePage } from './pages-home.js';
import { ncrMonarchPage, futureEstatesPage } from './pages-projects.js';
import { disclaimerPage, privacyPage, termsPage } from './pages-legal.js';
import { initChatbot } from './chatbot.js';

const router = new Router({
  '/': homePage,
  '/ncr-monarch': ncrMonarchPage,
  '/future-estates': futureEstatesPage,
  '/disclaimer': disclaimerPage,
  '/privacy': privacyPage,
  '/terms': termsPage
});

// Init chatbot after first route
document.addEventListener('routeChanged', () => {
  if (!document.getElementById('chat-toggle')) initChatbot();
  // Form submission handler
  const submitBtn = document.getElementById('form-submit-btn');
  if (submitBtn) {
    submitBtn.onclick = (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value?.trim();
      const mobile = document.getElementById('form-mobile')?.value?.trim();
      if (!name || !mobile) { alert('Please enter your name and mobile number.'); return; }
      const card = document.getElementById('enquiry-form-card');
      if (card) {
        card.innerHTML = `<div class="form-success"><div class="check">✅</div><h3>Thank You, ${name}!</h3><p>Our team will call you at ${mobile} within 30 minutes with the best price and floor plans.</p><p style="margin-top:16px"><a href="https://wa.me/917835057660" target="_blank" class="wa-btn" style="display:inline-flex;padding:12px 32px;width:auto">💬 WhatsApp Us Now</a></p></div>`;
      }
    };
  }
  // Active nav highlight
  const hash = location.hash.slice(1) || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-link') === hash);
  });
}, { passive: true });
