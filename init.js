GW.routes = {
  '/': GW.homePage,
  '/ncr-monarch': GW.ncrMonarchPage,
  '/future-estates': GW.futureEstatesPage,
  '/disclaimer': GW.disclaimerPage,
  '/privacy': GW.privacyPage,
  '/terms': GW.termsPage
};

GW.resolve = function(){
  var hash = location.hash.slice(1) || '/';
  var page = GW.routes[hash] || GW.routes['/'];
  document.getElementById('app').innerHTML = page();
  window.scrollTo(0,0);
  // Reveal animations
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('active');obs.unobserve(e.target);}});
  },{threshold:0.15});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
  // Image hover
  document.querySelectorAll('.port-img img, .hero-card img').forEach(function(img){
    img.style.filter='grayscale(100%)';img.style.transition='all 1s cubic-bezier(0.16,1,0.3,1)';
    img.parentElement.addEventListener('mouseenter',function(){img.style.filter='grayscale(0%)';img.style.transform='scale(1.08)';});
    img.parentElement.addEventListener('mouseleave',function(){img.style.filter='grayscale(100%)';img.style.transform='scale(1)';});
  });
  // Init chatbot once
  if(!document.getElementById('chatbot-root'))GW.initChat();
  // Form handler
  var btn=document.getElementById('form-submit-btn');
  if(btn)btn.onclick=function(e){
    e.preventDefault();
    var name=document.getElementById('form-name');var mobile=document.getElementById('form-mobile');
    if(!name||!name.value.trim()||!mobile||!mobile.value.trim()){alert('Please enter your name and mobile number.');return;}
    var card=document.getElementById('enquiry-form-card');
    if(card)card.innerHTML='<div class="form-success"><div class="check">✅</div><h3>Thank You, '+name.value.trim()+'!</h3><p>Our team will call you at '+mobile.value.trim()+' within 30 minutes with the best price and floor plans.</p><p style="margin-top:16px"><a href="https://wa.me/917835057660" target="_blank" class="wa-btn" style="display:inline-flex;padding:12px 32px;width:auto">💬 WhatsApp Us Now</a></p></div>';
  };
  // Nav highlight
  document.querySelectorAll('.nav-links a[data-link]').forEach(function(a){a.classList.toggle('active',a.getAttribute('data-link')===hash);});
};

window.addEventListener('hashchange', GW.resolve);
window.addEventListener('load', GW.resolve);
