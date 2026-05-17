GW.chatData = {messages:[],open:false,unread:0,timer:null};
GW.quickR = {'2 & 3 BHK Prices':'Our 2 & 3 BHK Residences by JSS Buildcon start at ₹92.28 Lakhs* for 2 BHK (1,075 sq.ft) and ₹1.14 Crore* for 3 BHK (1,810 sq.ft). Payment plan: 40:60. RERA: UPRERAPRJ4790. Ready to Move!\n\nWould you like to book a site visit?','2 BHK Zen Homes':'Our 2 BHK Zen Homes by FW Group start at ₹86 Lakhs* (1,110–1,250 sq.ft). New Launch! Backed by SBI Ventures with a 20:80 payment plan. Includes Club-Zenesis amenities.\n\nShall I arrange a callback for you?','Book Site Visit':'I\'d love to arrange a site visit for you! Could you share your name and mobile number? Our team will call within 30 minutes to confirm. 🏠','Talk to Agent':'📞 Reach our consultants at +91-7835057660\n💬 WhatsApp: wa.me/917835057660\n\nAvailable Mon–Sat 9am–7pm, Sunday 10am–5pm.'};
GW.welcome = '👋 Hello! Welcome to Golden Wave Infratech.\n\nI can help you with:\n🏠 Project details & pricing\n📋 Payment plans & RERA info\n📍 Location & connectivity\n📞 Booking a site visit\n\nWhat would you like to know?';
GW.sysPrompt = 'You are a helpful property consultant chatbot for Golden Wave Infratech Private Limited, a RERA-registered real estate channel partner in Greater Noida West. Company Phone: +91-7835057660. PROJECT 1: 2&3 BHK by JSS Buildcon, RERA UPRERAPRJ4790, Ready to Move, 2BHK 1075sqft ₹92.28L*, 3BHK 1810sqft ₹1.14Cr*, 40:60 plan. PROJECT 2: 2BHK Zen by FW Group, SBI Ventures backed, New Launch, 1110-1250sqft ₹86L*, 20:80 plan. Be warm, concise, 3-5 lines. Add * to prices. Never guarantee returns. Golden Wave is channel partner only.';

GW.chatTime = function(){return new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});};
GW.chatSave = function(){try{localStorage.setItem('gw_chat',JSON.stringify(GW.chatData.messages));}catch(e){}};
GW.chatLoad = function(){try{var s=localStorage.getItem('gw_chat');if(s)GW.chatData.messages=JSON.parse(s);}catch(e){}};

GW.chatRender = function(){
  var b=document.getElementById('chat-body');if(!b)return;
  b.innerHTML=GW.chatData.messages.map(function(m){return '<div class="chat-msg '+m.role+'"><div>'+m.text.replace(/\n/g,'<br>')+'</div><div class="time">'+m.time+'</div></div>';}).join('');
  b.scrollTop=b.scrollHeight;
};

GW.chatAdd = function(role,text){
  GW.chatData.messages.push({role:role,text:text,time:GW.chatTime()});
  GW.chatSave();GW.chatRender();
  if(role==='bot'&&!GW.chatData.open){GW.chatData.unread++;GW.chatBadge();}
  clearTimeout(GW.chatData.timer);
  GW.chatData.timer=setTimeout(function(){if(GW.chatData.open&&GW.chatData.messages.length>0)GW.chatAdd('bot','Still searching for your dream home? 😊 Feel free to ask anything or call us at +91-7835057660');},120000);
};

GW.chatBadge = function(){var b=document.getElementById('chat-badge');if(b){b.style.display=GW.chatData.unread>0?'flex':'none';b.textContent=GW.chatData.unread;}};

GW.chatTyping = function(show){
  if(show){var b=document.getElementById('chat-body');if(!b)return;var t=document.createElement('div');t.className='typing';t.id='typing-ind';t.innerHTML='<span></span><span></span><span></span>';b.appendChild(t);b.scrollTop=b.scrollHeight;}
  else{var el=document.getElementById('typing-ind');if(el)el.remove();}
};

GW.chatQuick = function(){
  var b=document.getElementById('chat-body');if(!b)return;
  var old=document.getElementById('qr-box');if(old)old.remove();
  var qr=document.createElement('div');qr.className='quick-replies';qr.id='qr-box';
  Object.keys(GW.quickR).forEach(function(label){var btn=document.createElement('button');btn.className='quick-btn';btn.textContent=label;btn.onclick=function(){
    var q=document.getElementById('qr-box');if(q)q.remove();GW.chatAdd('user',label);GW.chatTyping(true);
    setTimeout(function(){GW.chatTyping(false);GW.chatAdd('bot',GW.quickR[label]);GW.chatQuick();},800);
  };qr.appendChild(btn);});
  b.appendChild(qr);b.scrollTop=b.scrollHeight;
};

GW.chatFallback = function(msg){
  var l=msg.toLowerCase();
  if(l.match(/price|cost|rate|kitna/))return GW.quickR['2 & 3 BHK Prices'];
  if(l.match(/zen|86|future/))return GW.quickR['2 BHK Zen Homes'];
  if(l.match(/visit|site|dekhna/))return GW.quickR['Book Site Visit'];
  if(l.match(/call|agent|phone|whatsapp|contact/))return GW.quickR['Talk to Agent'];
  if(l.match(/location|where|kahan/))return 'Our projects are in Sector 1, Greater Noida West.\n\n🚇 Aqua Line Metro: 10 min\n🛣️ Expressway: 5 min\n🎓 Schools: 2–5 min\n\nWant to visit?';
  if(l.match(/rera|legal|verified/))return 'Yes! RERA approved. ✅\nRERA: UPRERAPRJ4790\n\nNeed more details?';
  if(l.match(/payment|emi|plan/))return '📋 2&3 BHK: 40:60 plan\n📋 2 BHK Zen: 20:80 plan\n\nBank loans available!';
  if(l.match(/hello|hi|hey|namaste/))return 'Hello! 👋 How can I help you find your dream home today?';
  return 'Thank you! 😊\nFor details call 📞 +91-7835057660\nor WhatsApp: wa.me/917835057660\n\nAsk me about pricing, location, or payment plans!';
};

GW.chatSend = function(){
  var inp=document.getElementById('chat-input');if(!inp)return;var text=inp.value.trim();if(!text)return;inp.value='';
  var q=document.getElementById('qr-box');if(q)q.remove();
  GW.chatAdd('user',text);GW.chatTyping(true);
  // Try AI, fallback to pattern matching
  var key=window.ANTHROPIC_API_KEY||'';
  if(key){
    fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:GW.sysPrompt,messages:[{role:'user',content:text}]})}).then(function(r){return r.json();}).then(function(d){GW.chatTyping(false);GW.chatAdd('bot',d.content&&d.content[0]?d.content[0].text:GW.chatFallback(text));GW.chatQuick();}).catch(function(){GW.chatTyping(false);GW.chatAdd('bot',GW.chatFallback(text));GW.chatQuick();});
  }else{setTimeout(function(){GW.chatTyping(false);GW.chatAdd('bot',GW.chatFallback(text));GW.chatQuick();},600);}
};

GW.initChat = function(){
  GW.chatLoad();
  var div=document.createElement('div');div.id='chatbot-root';
  div.innerHTML='<button class="chat-toggle" id="chat-toggle" aria-label="Open chat">'+GW.ic.chat+'<div class="dot"></div><div class="badge" id="chat-badge" style="display:none">0</div><div class="chat-label">ASK US</div></button><div class="chat-window" id="chat-window"><div class="chat-header"><div class="chat-header-info"><h4>GOLDEN WAVE ASSISTANT</h4><span><span class="online"></span> Typically replies in 30 seconds</span></div><button class="chat-close" id="chat-close">'+GW.ic.x+'</button></div><div class="chat-body" id="chat-body"></div><div class="chat-input-bar"><input class="chat-input" id="chat-input" placeholder="Type a message..." autocomplete="off"><button class="chat-send" id="chat-send">'+GW.ic.send+'</button></div></div>';
  document.body.appendChild(div);
  document.getElementById('chat-toggle').onclick=function(){GW.chatData.open=true;GW.chatData.unread=0;GW.chatBadge();document.getElementById('chat-window').classList.add('open');if(GW.chatData.messages.length===0){GW.chatAdd('bot',GW.welcome);GW.chatQuick();}else{GW.chatRender();GW.chatQuick();}};
  document.getElementById('chat-close').onclick=function(){GW.chatData.open=false;document.getElementById('chat-window').classList.remove('open');};
  document.getElementById('chat-send').onclick=GW.chatSend;
  document.getElementById('chat-input').onkeydown=function(e){if(e.key==='Enter')GW.chatSend();};
  if(GW.chatData.messages.length>0)GW.chatRender();
};
