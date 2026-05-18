import { icons, nav, footer, enquiryForm } from './components.js';

function connectivityCards() {
  return `<div class="connect-grid">
    <div class="connect-card"><div class="emoji">🚇</div><div class="place">Aqua Line Metro</div><div class="time">10 min</div></div>
    <div class="connect-card"><div class="emoji">🛣️</div><div class="place">Noida–GN Expressway</div><div class="time">5 min</div></div>
    <div class="connect-card"><div class="emoji">🎓</div><div class="place">Schools &amp; Colleges</div><div class="time">2–5 min</div></div>
    <div class="connect-card"><div class="emoji">🏥</div><div class="place">Fortis / Yatharth Hospital</div><div class="time">10 min</div></div>
    <div class="connect-card"><div class="emoji">🛍️</div><div class="place">Gaur City Mall</div><div class="time">8 min</div></div>
    <div class="connect-card"><div class="emoji">🏢</div><div class="place">IT Parks Noida Sec 62</div><div class="time">20 min</div></div>
  </div>`;
}

export function ncrMonarchPage() {
  return `${nav()}
  <section class="project-hero">
    <div class="project-hero-bg"><img src="/ncr-monarch.png" alt="NCR Monarch 2 and 3 BHK"></div>
    <div class="project-hero-overlay"></div>
    <div class="project-hero-content">
      <div class="floating-badge" style="position:absolute;right:10%;top:30%"><span class="big" style="font-size:1.5rem">READY</span><span class="small">TO MOVE</span></div>
      <h1 class="reveal">2 &amp; 3 BHK <span class="accent">residences</span></h1>
      <p class="sub reveal">by JSS Buildcon Pvt. Ltd. · Sector 1, Greater Noida West</p>
      <div class="rera-pill reveal" style="position:relative;top:auto;right:auto;display:inline-block;margin-top:24px">UPRERAPRJ4790</div>
    </div>
  </section>

  <section class="detail-section">
    <div class="container">
      <div class="detail-grid">
        <div>
          <div class="label reveal">CONFIGURATIONS</div>
          <h2 class="reveal" style="font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:.9;margin:16px 0 32px">Choose Your <span class="accent">ideal</span> Home</h2>
          <div class="config-card reveal">
            <h3>2 BHK Apartment</h3>
            <div class="price">₹92.28 Lakhs*</div>
            <div class="area">1,075 sq.ft · Carpet Area</div>
          </div>
          <div class="config-card reveal">
            <h3>3 BHK Apartment</h3>
            <div class="price">₹1.14 Crore*</div>
            <div class="area">1,810 sq.ft · Carpet Area</div>
          </div>
        </div>
        <div>
          <div class="label reveal">PAYMENT PLAN</div>
          <h2 class="reveal" style="font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:.9;margin:16px 0 32px">40:60 <span class="accent">plan</span></h2>
          <p class="reveal" style="font-size:15px;opacity:.7;line-height:1.8;margin-bottom:24px">Pay 40% now and the remaining 60% on possession. A comfortable payment structure designed for homebuyers who want flexibility.</p>
          <div class="highlight-grid reveal">
            <div class="highlight-tag">2.5 ACRES GREEN</div>
            <div class="highlight-tag">RERA APPROVED</div>
            <div class="highlight-tag">READY TO MOVE</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="detail-section">
    <div class="container">
      <div class="label reveal">AMENITIES</div>
      <h2 class="reveal" style="font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:.9;margin:16px 0 32px">Premium <span class="accent">lifestyle</span></h2>
      <div class="amenity-grid">
        <div class="amenity-card reveal"><div class="icon">🏊</div><span>Swimming Pool</span></div>
        <div class="amenity-card reveal"><div class="icon">🏋️</div><span>Modern Gym</span></div>
        <div class="amenity-card reveal"><div class="icon">🌳</div><span>Landscaped Gardens</span></div>
        <div class="amenity-card reveal"><div class="icon">🏃</div><span>Jogging Track</span></div>
        <div class="amenity-card reveal"><div class="icon">👶</div><span>Kids Play Area</span></div>
        <div class="amenity-card reveal"><div class="icon">🔒</div><span>24/7 Security</span></div>
        <div class="amenity-card reveal"><div class="icon">🅿️</div><span>Covered Parking</span></div>
        <div class="amenity-card reveal"><div class="icon">⚡</div><span>Power Backup</span></div>
        <div class="amenity-card reveal"><div class="icon">🏢</div><span>Club House</span></div>
      </div>
    </div>
  </section>

  <section class="detail-section">
    <div class="container">
      <div class="detail-grid">
        <div>
          <div class="label reveal">CONNECTIVITY</div>
          <h2 class="reveal" style="font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:.9;margin:16px 0 32px">Well <span class="accent">connected</span></h2>
          <div class="reveal">${connectivityCards()}</div>
        </div>
        <div class="reveal" style="border-radius:16px;overflow:hidden;aspect-ratio:1;"><img src="/amenities.png" alt="Amenities" class="img-hover" style="height:100%"></div>
      </div>
    </div>
  </section>

  <section class="enquiry" id="enquiry-section">
    <div class="container">
      <div class="enquiry-grid">
        <div>
          <div class="label reveal" style="color:var(--accent)">INTERESTED?</div>
          <h2 class="reveal">Book Your <span class="accent">dream</span> Home Today</h2>
          <p class="body reveal">Get the best price, floor plan, and payment plan details. Our team will call you within 30 minutes.</p>
          <div class="reveal">
            <div class="contact-line">${icons.phone} +91-7835057660</div>
            <div class="contact-line">${icons.mail} digitalgoldenwaveinfra@gmail.com</div>
          </div>
          <a href="https://wa.me/917835057660" target="_blank" class="wa-btn reveal">💬 WHATSAPP US NOW</a>
        </div>
        <div class="reveal">${enquiryForm(true)}</div>
      </div>
    </div>
  </section>
  ${footer()}`;
}

export function futureEstatesPage() {
  return `${nav()}
  <section class="project-hero">
    <div class="project-hero-bg"><img src="/future-estates.png" alt="Future Estates 2 BHK Zen Homes"></div>
    <div class="project-hero-overlay"></div>
    <div class="project-hero-content">
      <div class="floating-badge" style="position:absolute;right:10%;top:30%;background:var(--green);color:#fff"><span class="big" style="font-size:1.3rem">NEW</span><span class="small">LAUNCH</span></div>
      <h1 class="reveal">2 BHK <span class="accent">zen</span> HOMES</h1>
      <p class="sub reveal">by FW Group · Managed by SBI Ventures · Sector 1, Greater Noida West</p>
      <div class="rera-pill reveal" style="position:relative;top:auto;right:auto;display:inline-block;margin-top:24px;background:var(--green);color:#fff">SBI VENTURES BACKED</div>
    </div>
  </section>

  <section class="detail-section">
    <div class="container">
      <div class="detail-grid">
        <div>
          <div class="label reveal">CONFIGURATION</div>
          <h2 class="reveal" style="font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:.9;margin:16px 0 32px">Your <span class="accent">zen</span> Sanctuary</h2>
          <div class="config-card reveal">
            <h3>2 BHK Zen Home</h3>
            <div class="price">₹86 Lakhs*</div>
            <div class="area">1,110–1,250 sq.ft · Carpet Area</div>
          </div>
        </div>
        <div>
          <div class="label reveal">PAYMENT PLAN</div>
          <h2 class="reveal" style="font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:.9;margin:16px 0 32px">20:80 <span class="accent">plan</span></h2>
          <p class="reveal" style="font-size:15px;opacity:.7;line-height:1.8;margin-bottom:24px">Pay just 20% now and the remaining 80% on possession. The most buyer-friendly payment plan in Greater Noida West.</p>
          <div class="highlight-grid reveal">
            <div class="highlight-tag">SBI BACKED</div>
            <div class="highlight-tag">CLUB-ZENESIS</div>
            <div class="highlight-tag">NEW LAUNCH</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="detail-section">
    <div class="container">
      <div class="label reveal">AMENITIES — CLUB ZENESIS</div>
      <h2 class="reveal" style="font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:.9;margin:16px 0 32px">Elevated <span class="accent">living</span></h2>
      <div class="amenity-grid">
        <div class="amenity-card reveal"><div class="icon">🧘</div><span>Yoga &amp; Meditation</span></div>
        <div class="amenity-card reveal"><div class="icon">🏊</div><span>Infinity Pool</span></div>
        <div class="amenity-card reveal"><div class="icon">🏋️</div><span>Fitness Center</span></div>
        <div class="amenity-card reveal"><div class="icon">🌿</div><span>Zen Garden</span></div>
        <div class="amenity-card reveal"><div class="icon">🎾</div><span>Sports Courts</span></div>
        <div class="amenity-card reveal"><div class="icon">👶</div><span>Kids Zone</span></div>
        <div class="amenity-card reveal"><div class="icon">🔒</div><span>Smart Security</span></div>
        <div class="amenity-card reveal"><div class="icon">☀️</div><span>Solar Powered</span></div>
        <div class="amenity-card reveal"><div class="icon">🏢</div><span>Co-Working Space</span></div>
      </div>
    </div>
  </section>

  <section class="detail-section">
    <div class="container">
      <div class="detail-grid">
        <div>
          <div class="label reveal">CONNECTIVITY</div>
          <h2 class="reveal" style="font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:.9;margin:16px 0 32px">Well <span class="accent">connected</span></h2>
          <div class="reveal">${connectivityCards()}</div>
        </div>
        <div class="reveal" style="border-radius:16px;overflow:hidden;aspect-ratio:1"><img src="/amenities.png" alt="Club Zenesis" class="img-hover" style="height:100%"></div>
      </div>
    </div>
  </section>

  <section class="enquiry" id="enquiry-section">
    <div class="container">
      <div class="enquiry-grid">
        <div>
          <div class="label reveal" style="color:var(--accent)">INTERESTED?</div>
          <h2 class="reveal">Start Your <span class="accent">zen</span> Living Journey</h2>
          <p class="body reveal">Get the best price, floor plan, and payment plan details. Our team will call you within 30 minutes.</p>
          <div class="reveal">
            <div class="contact-line">${icons.phone} +91-7835057660</div>
            <div class="contact-line">${icons.mail} digitalgoldenwaveinfra@gmail.com</div>
          </div>
          <a href="https://wa.me/917835057660" target="_blank" class="wa-btn reveal">💬 WHATSAPP US NOW</a>
        </div>
        <div class="reveal">${enquiryForm(true)}</div>
      </div>
    </div>
  </section>
  ${footer()}`;
}
