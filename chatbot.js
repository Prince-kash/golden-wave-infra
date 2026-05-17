import { icons } from './components.js';

const QUICK_RESPONSES = {
  '2 & 3 BHK Prices': 'Our 2 & 3 BHK Residences by JSS Buildcon start at ₹92.28 Lakhs* for 2 BHK (1,075 sq.ft) and ₹1.14 Crore* for 3 BHK (1,810 sq.ft). Payment plan: 40:60. RERA: UPRERAPRJ4790. Ready to Move!\n\nWould you like to book a site visit?',
  '2 BHK Zen Homes': 'Our 2 BHK Zen Homes by FW Group start at ₹86 Lakhs* (1,110–1,250 sq.ft). New Launch! Backed by SBI Ventures with a 20:80 payment plan. Includes Club-Zenesis amenities.\n\nShall I arrange a callback for you?',
  'Book Site Visit': "I'd love to arrange a site visit for you! Could you share your name and mobile number? Our team will call within 30 minutes to confirm. 🏠",
  'Talk to Agent': '📞 Reach our consultants at +91-7835057660\n💬 WhatsApp: wa.me/917835057660\n\nAvailable Mon–Sat 9am–7pm, Sunday 10am–5pm.'
};

const WELCOME = `👋 Hello! Welcome to Golden Wave Infratech.\n\nI can help you with:\n🏠 Project details & pricing\n📋 Payment plans & RERA info\n📍 Location & connectivity\n📞 Booking a site visit\n\nWhat would you like to know?`;

const SYSTEM_PROMPT = `You are a helpful and professional property consultant chatbot for Golden Wave Infratech Private Limited, a RERA-registered real estate channel partner in Greater Noida West.

COMPANY INFO:
- Name: Golden Wave Infratech Private Limited
- Phone/WhatsApp: +91-7835057660
- Email: digitalgoldenwaveinfra@gmail.com
- Address: Sector 1, Greater Noida West, UP 201306
- Hours: Mon-Sat 9am-7pm, Sunday 10am-5pm
- Track Record: 500+ Happy Families

PROJECT 1 - 2 & 3 BHK Residences (NCR Monarch):
- Developer: JSS Buildcon Pvt. Ltd.
- RERA: UPRERAPRJ4790
- Status: Ready to Move
- 2 BHK: 1,075 sq.ft - Starting Rs 92.28 Lakhs*
- 3 BHK: 1,810 sq.ft - Starting Rs 1.14 Crore*
- Payment Plan: 40:60
- Features: 2.5 Acres Green, RERA Approved

PROJECT 2 - 2 BHK Zen Homes (Future Estates):
- Developer: FW Group
- Backed By: SBI Ventures
- Status: New Launch
- 2 BHK: 1,110-1,250 sq.ft - Starting Rs 86 Lakhs*
- Payment Plan: 20:80
- Features: SBI Backed, Club-Zenesis

CONNECTIVITY:
- Aqua Line Metro: 10 min
- Noida-GN Expressway: 5 min
- Schools & Colleges: 2-5 min
- Fortis/Yatharth Hospital: 10 min
- Gaur City Mall: 8 min
- IT Parks Noida Sector 62: 20 min

RESPONSE RULES:
- Be warm, professional, and concise
- Reply in Hindi or English based on user's language
- Always add * to prices and note they are starting prices subject to change
- Never guarantee investment returns
- For site visits, ask for name and number
- For complex queries refer to +91-7835057660
- Keep replies to 3-5 lines max
- End every reply offering further help
- Remind: Golden Wave is a channel partner only, not the developer`;

let chatOpen = false;
let messages = [];
let unreadCount = 0;
let inactivityTimer = null;

function getTime() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function saveChat() {
  try { localStorage.setItem('gw_chat', JSON.stringify(messages)); } catch(e) {}
}

function loadChat() {
  try {
    const saved = localStorage.getItem('gw_chat');
    if (saved) messages = JSON.parse(saved);
  } catch(e) { messages = []; }
}

function renderMessages() {
  const body = document.getElementById('chat-body');
  if (!body) return;
  body.innerHTML = messages.map(m => `<div class="chat-msg ${m.role}"><div>${m.text.replace(/\n/g, '<br>')}</div><div class="time">${m.time}</div></div>`).join('');
  body.scrollTop = body.scrollHeight;
}

function addMessage(role, text) {
  messages.push({ role, text, time: getTime() });
  saveChat();
  renderMessages();
  if (role === 'bot' && !chatOpen) {
    unreadCount++;
    updateBadge();
  }
  resetInactivity();
}

function updateBadge() {
  const badge = document.getElementById('chat-badge');
  if (badge) {
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    badge.textContent = unreadCount;
  }
}

function showTyping() {
  const body = document.getElementById('chat-body');
  if (!body) return;
  const t = document.createElement('div');
  t.className = 'typing';
  t.id = 'typing-indicator';
  t.innerHTML = '<span></span><span></span><span></span>';
  body.appendChild(t);
  body.scrollTop = body.scrollHeight;
}

function hideTyping() {
  document.getElementById('typing-indicator')?.remove();
}

function showQuickReplies() {
  const body = document.getElementById('chat-body');
  if (!body) return;
  const qr = document.createElement('div');
  qr.className = 'quick-replies';
  qr.id = 'quick-replies';
  Object.keys(QUICK_RESPONSES).forEach(label => {
    const btn = document.createElement('button');
    btn.className = 'quick-btn';
    btn.textContent = label;
    btn.onclick = () => handleQuickReply(label);
    qr.appendChild(btn);
  });
  body.appendChild(qr);
  body.scrollTop = body.scrollHeight;
}

function handleQuickReply(label) {
  document.getElementById('quick-replies')?.remove();
  addMessage('user', label);
  showTyping();
  setTimeout(() => {
    hideTyping();
    addMessage('bot', QUICK_RESPONSES[label]);
    showQuickReplies();
  }, 800);
}

async function sendToAI(userMsg) {
  // Try Claude API if key is available
  const apiKey = window.ANTHROPIC_API_KEY || '';
  if (!apiKey) {
    // Fallback: pattern matching
    return fallbackResponse(userMsg);
  }
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system: SYSTEM_PROMPT, messages: messages.filter(m => m.role !== 'bot' || messages.indexOf(m) > 0).slice(-10).map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })).concat([{ role: 'user', content: userMsg }]) })
    });
    const data = await res.json();
    return data.content?.[0]?.text || fallbackResponse(userMsg);
  } catch(e) {
    return fallbackResponse(userMsg);
  }
}

function fallbackResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('kitna')) return QUICK_RESPONSES['2 & 3 BHK Prices'];
  if (lower.includes('zen') || lower.includes('86') || lower.includes('future')) return QUICK_RESPONSES['2 BHK Zen Homes'];
  if (lower.includes('visit') || lower.includes('site') || lower.includes('dekhna')) return QUICK_RESPONSES['Book Site Visit'];
  if (lower.includes('call') || lower.includes('agent') || lower.includes('phone') || lower.includes('whatsapp') || lower.includes('contact')) return QUICK_RESPONSES['Talk to Agent'];
  if (lower.includes('location') || lower.includes('where') || lower.includes('kahan')) return 'Our projects are located in Sector 1, Greater Noida West — one of NCR\'s fastest-growing micro-markets.\n\n🚇 Aqua Line Metro: 10 min\n🛣️ Noida–GN Expressway: 5 min\n🎓 Schools: 2–5 min\n\nWould you like to visit the location?';
  if (lower.includes('rera') || lower.includes('legal') || lower.includes('verified')) return 'Yes! Our projects are fully RERA-approved. ✅\n\nRERA Number: UPRERAPRJ4790\n\nYou can verify on the UP RERA website. Need any other details?';
  if (lower.includes('payment') || lower.includes('emi') || lower.includes('plan')) return 'We have two payment plans:\n\n📋 2 & 3 BHK: 40:60 (40% now, 60% on possession)\n📋 2 BHK Zen: 20:80 (20% now, 80% on possession)\n\nBank loans available. Want to know more?';
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('namaste')) return 'Hello! 👋 Welcome to Golden Wave Infratech. How can I help you today?\n\nI can share project details, pricing, or arrange a site visit for you!';
  return 'Thank you for your interest! 😊\n\nFor detailed information, our property consultants can help you best:\n📞 +91-7835057660\n💬 WhatsApp: wa.me/917835057660\n\nOr ask me about pricing, location, or payment plans!';
}

function resetInactivity() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    if (chatOpen && messages.length > 0) {
      addMessage('bot', 'Still searching for your dream home? 😊 Feel free to ask anything or call us at +91-7835057660');
    }
  }, 120000);
}

async function handleUserInput() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  document.getElementById('quick-replies')?.remove();
  addMessage('user', text);
  showTyping();
  const response = await sendToAI(text);
  setTimeout(() => {
    hideTyping();
    addMessage('bot', response);
    showQuickReplies();
  }, 600);
}

export function initChatbot() {
  loadChat();
  const chatHTML = `
    <button class="chat-toggle" id="chat-toggle" aria-label="Open chat">
      ${icons.chat}
      <div class="dot"></div>
      <div class="badge" id="chat-badge" style="display:none">0</div>
      <div class="chat-label">ASK US</div>
    </button>
    <div class="chat-window" id="chat-window">
      <div class="chat-header">
        <div class="chat-header-info">
          <h4>GOLDEN WAVE ASSISTANT</h4>
          <span><span class="online"></span> Typically replies in 30 seconds</span>
        </div>
        <button class="chat-close" id="chat-close">${icons.x}</button>
      </div>
      <div class="chat-body" id="chat-body"></div>
      <div class="chat-input-bar">
        <input class="chat-input" id="chat-input" placeholder="Type a message..." autocomplete="off">
        <button class="chat-send" id="chat-send">${icons.send}</button>
      </div>
    </div>`;
  
  const div = document.createElement('div');
  div.innerHTML = chatHTML;
  document.body.appendChild(div);

  document.getElementById('chat-toggle').onclick = () => {
    chatOpen = true;
    unreadCount = 0;
    updateBadge();
    document.getElementById('chat-window').classList.add('open');
    if (messages.length === 0) {
      addMessage('bot', WELCOME);
      showQuickReplies();
    } else {
      renderMessages();
      showQuickReplies();
    }
  };

  document.getElementById('chat-close').onclick = () => {
    chatOpen = false;
    document.getElementById('chat-window').classList.remove('open');
  };

  document.getElementById('chat-send').onclick = handleUserInput;
  document.getElementById('chat-input').onkeydown = (e) => {
    if (e.key === 'Enter') handleUserInput();
  };

  if (messages.length > 0) {
    renderMessages();
  }
}
