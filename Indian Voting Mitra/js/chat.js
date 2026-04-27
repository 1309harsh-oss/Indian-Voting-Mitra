// ═══════════════════════════════════════════════════
//  CHAT.JS — Enhanced Gemini AI Chatbot
//  Fixes: context-aware AI, security, ARIA, char counter
// ═══════════════════════════════════════════════════

const SYSTEM_CONTEXT = `You are "Chunav Mitra" (चुनाव मित्र), a friendly, helpful, and patient AI assistant for Bharat Chunav Mitra — an educational website about Indian elections.

Your goal is to help ALL Indian citizens understand the Indian election process clearly — students, first-time voters, rural citizens, and NRIs.

PERSONALITY:
- Friendly and warm, like a knowledgeable older sibling or civic teacher
- Use simple words — even a 10-year-old should understand
- Use emojis occasionally to make it engaging
- Be encouraging and positive about voting and democracy

KNOWLEDGE BASE:
- Election Commission of India (ECI) conducts all national and state elections
- Minimum voting age: 18 years (61st Constitutional Amendment, 1989)
- India has 543 Lok Sabha seats, 250 Rajya Sabha seats
- EVM = Electronic Voting Machine (in use nationally since 1998)
- VVPAT = Voter Verified Paper Audit Trail (7-second paper slip)
- NOTA = None of the Above (introduced 2013, Supreme Court order)
- Model Code of Conduct activates immediately when ECI announces elections
- Voter ID = EPIC (Elector's Photo Identity Card) — free
- Register at voters.eci.gov.in or nvsp.in or Voter Helpline App
- Voter helpline: 1950 (Toll Free)
- cVigil App: report election violations with geo-tagged photo/video
- Articles 324-329 of Indian Constitution deal with elections
- Article 326: Universal Adult Suffrage — right to vote for all adults 18+
- Form 6: new registration; Form 7: deletion; Form 8: correction; Form 8A: address change
- Indelible ink on left index finger prevents double voting; manufactured in Mysore
- Lok Sabha term = 5 years; Rajya Sabha members serve 6 years (1/3 retire every 2 years)
- Vidhan Sabha = State Legislative Assembly; MLA represents constituency
- Panchayati Raj elections by State Election Commissions (not ECI)
- Minimum age to contest Lok Sabha/Vidhan Sabha = 25; Rajya Sabha = 30
- NRIs can register on overseas electoral rolls using Form 6A
- Silent period: no campaigning 48 hours before polling
- Booth capturing and impersonation are criminal offences

CONTEXT-AWARE:
- If about registration: mention Form 6 and nvsp.in
- If about rights: cite the Constitutional Article
- Always end with a note encouraging voting

LANGUAGE RULES:
- Match the user's language — Hindi (Devanagari), Tamil, Telugu, Bengali, Marathi, etc.
- For English: naturally mix Hindi civic terms (e.g., matdan, chunav, jan pratinithi)

RESTRICTIONS:
- ONLY answer about Indian elections, voting, civic rights, democracy, Constitution (election articles)
- For unrelated topics: "I'm only trained to help with Indian elections! 🗳️ Ask me anything about voting or your rights."
- Never give opinions on parties, candidates, or predict outcomes`;

// Track current section for context injection
let currentSection = 'home';
const SECTION_CONTEXTS = {
  timeline: 'The user is viewing the Election Timeline section.',
  types: 'The user is viewing the Types of Elections section.',
  register: 'The user is viewing the Voter Registration section and may need help registering.',
  rights: 'The user is viewing the Voter Rights and Duties section.',
  quiz: 'The user is on the Election Knowledge Quiz section.',
  game: 'The user is playing the Election Word Game.'
};

function detectCurrentSection() {
  const sections = document.querySelectorAll('section[id]');
  let closest = 'home';
  let minDist = Infinity;
  sections.forEach(s => {
    const dist = Math.abs(s.getBoundingClientRect().top);
    if (dist < minDist) { minDist = dist; closest = s.id; }
  });
  return closest;
}

function getSystemPromptWithContext() {
  const ctx = SECTION_CONTEXTS[currentSection];
  if (!ctx) return SYSTEM_CONTEXT;
  return SYSTEM_CONTEXT + '\n\nCURRENT CONTEXT: ' + ctx + ' Use this to give more relevant answers.';
}

let chatHistory = [];
let apiKey = '';

function initChat() {
  try { apiKey = localStorage.getItem('chunav_api_key') || ''; } catch(e) {}
  if (apiKey) document.getElementById('apiSetup')?.classList.add('hidden');

  const fab = document.getElementById('chatFab');
  const closeBtn = document.getElementById('chatClose');
  if (fab) {
    fab.addEventListener('click', toggleChat);
    fab.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleChat(); }});
  }
  if (closeBtn) closeBtn.addEventListener('click', closeChat);

  const saveBtn = document.getElementById('saveApiKey');
  const keyInput = document.getElementById('apiKeyInput');
  if (saveBtn) saveBtn.addEventListener('click', saveApiKey);
  if (keyInput) keyInput.addEventListener('keydown', e => { if (e.key === 'Enter') saveApiKey(); });

  const sendBtn = document.getElementById('sendBtn');
  const chatInput = document.getElementById('chatInput');
  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    chatInput.addEventListener('input', () => updateCharCounter(chatInput));
  }

  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('chatInput');
      if (input) { input.value = btn.dataset.prompt; sendMessage(); }
    });
  });

  document.addEventListener('keydown', e => {
    const panel = document.getElementById('chatPanel');
    if (e.key === 'Escape' && panel?.classList.contains('open')) {
      closeChat();
      document.getElementById('chatFab')?.focus();
    }
  });

  window.addEventListener('scroll', () => {
    currentSection = detectCurrentSection();
    updateContextBanner();
  }, { passive: true });
}

function updateCharCounter(input) {
  let counter = document.getElementById('chatCharCounter');
  if (!counter) {
    counter = document.createElement('div');
    counter.id = 'chatCharCounter';
    counter.className = 'char-counter';
    counter.setAttribute('aria-live', 'polite');
    input.closest('.chat-input-area').parentNode.insertBefore(counter, input.closest('.chat-input-area'));
  }
  const len = input.value.length;
  counter.textContent = len > 400 ? len + '/500 characters' : '';
  counter.classList.toggle('near-limit', len > 470);
}

function updateContextBanner() {
  const panel = document.getElementById('chatPanel');
  if (!panel?.classList.contains('open')) return;

  let banner = document.getElementById('chatContextBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'chatContextBanner';
    banner.className = 'context-banner';
    banner.setAttribute('aria-live', 'polite');
    const msgs = document.getElementById('chatMessages');
    if (msgs) msgs.parentNode.insertBefore(banner, msgs);
  }
  const sectionNames = {
    timeline: '📅 Election Timeline', types: '🏛️ Election Types',
    register: '📋 Voter Registration', rights: '⚖️ Rights & Duties',
    quiz: '🧠 Quiz', game: '🎮 Word Game'
  };
  const name = sectionNames[currentSection];
  if (name) {
    banner.innerHTML = '<span aria-hidden="true">📍</span> You\'re on: <strong>' + name + '</strong> — ask me about it!';
    banner.classList.add('visible');
  } else {
    banner.classList.remove('visible');
  }
}

function toggleChat() {
  const panel = document.getElementById('chatPanel');
  panel.classList.contains('open') ? closeChat() : openChat();
}

function openChat() {
  const panel = document.getElementById('chatPanel');
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  document.getElementById('chatFab').setAttribute('aria-expanded', 'true');
  currentSection = detectCurrentSection();
  updateContextBanner();
  setTimeout(() => {
    const input = document.getElementById('chatInput');
    if (input) input.focus();
  }, 300);
}

function closeChat() {
  const panel = document.getElementById('chatPanel');
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  document.getElementById('chatFab').setAttribute('aria-expanded', 'false');
}

function saveApiKey() {
  const input = document.getElementById('apiKeyInput');
  const key = (input.value || '').trim();
  if (!key || key.length < 10) {
    showBotMessage('⚠️ Please paste a valid API key starting with "AIza..." — get one free from Google AI Studio!');
    return;
  }
  apiKey = key;
  try { localStorage.setItem('chunav_api_key', key); } catch(e) {}
  input.value = ''; // Clear for security after saving
  document.getElementById('apiSetup').classList.add('hidden');
  showBotMessage('🎉 API key saved! Now ask me anything about Indian elections!\n\n💡 Tip: You can ask me in Hindi, Tamil, or any Indian language!');
}

async function sendMessage() {
  if (!apiKey) {
    openChat();
    showBotMessage('🔑 Please enter your Gemini API key first! Click "Get Free Key" above — it\'s 100% free from Google AI Studio!');
    return;
  }

  const input = document.getElementById('chatInput');
  const text = (input.value || '').trim();
  if (!text) return;

  input.value = '';
  updateCharCounter(input);
  addMessageToUI('user', text);
  chatHistory.push({ role: 'user', parts: [{ text }] });

  const status = document.getElementById('chatStatus');
  if (status) { status.textContent = '🟡 Thinking...'; status.className = 'chat-status thinking'; }

  const typingId = showTyping();

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: getSystemPromptWithContext() }] },
          contents: chatHistory,
          generationConfig: { maxOutputTokens: 600, temperature: 0.7, topP: 0.9 },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
          ]
        })
      }
    );

    removeTyping(typingId);
    if (status) { status.textContent = '🟢 Ready to help!'; status.className = 'chat-status'; }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = (errData?.error?.message || '').toLowerCase();
      if (response.status === 400 || errMsg.includes('api key') || errMsg.includes('invalid')) {
        showBotMessage('❌ Invalid API key. Please re-enter. Get a free one at aistudio.google.com');
        document.getElementById('apiSetup').classList.remove('hidden');
        apiKey = '';
        try { localStorage.removeItem('chunav_api_key'); } catch(e) {}
        return;
      }
      if (response.status === 429) { showBotMessage('⏳ Too many requests! Please wait a minute and try again.'); return; }
      if (response.status === 404 || errMsg.includes('model')) { showBotMessage('⚠️ Model unavailable. Check your API key at aistudio.google.com'); return; }
      throw new Error('HTTP ' + response.status);
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      if (data?.candidates?.[0]?.finishReason === 'SAFETY') {
        showBotMessage('🛡️ I couldn\'t answer that. Please ask about Indian elections! 🗳️');
        return;
      }
      throw new Error('Empty response');
    }

    chatHistory.push({ role: 'model', parts: [{ text: replyText }] });
    showBotMessage(replyText);

    const qp = document.getElementById('quickPrompts');
    if (qp && chatHistory.length > 2) qp.style.display = 'none';

  } catch (err) {
    removeTyping(typingId);
    if (status) { status.textContent = '🟢 Ready to help!'; status.className = 'chat-status'; }
    console.error('Gemini error:', err);
    showBotMessage('😔 Something went wrong. Check your internet and API key, then try again.\n\nGet a free key at aistudio.google.com 🔗');
  }
}

function addMessageToUI(role, text) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg ' + (role === 'user' ? 'user' : 'bot');
  div.setAttribute('aria-label', role === 'user' ? 'You said' : 'Chunav Mitra replied');
  div.innerHTML = '<span class="msg-icon" aria-hidden="true">' + (role === 'user' ? '👤' : '🤖') + '</span><div class="msg-bubble">' + formatMessage(text) + '</div>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showBotMessage(text) { addMessageToUI('bot', text); }

function showTyping() {
  const container = document.getElementById('chatMessages');
  const id = 'typing_' + Date.now();
  const div = document.createElement('div');
  div.id = id;
  div.className = 'chat-msg bot';
  div.setAttribute('aria-label', 'Chunav Mitra is typing a response');
  div.innerHTML = '<span class="msg-icon" aria-hidden="true">🤖</span><div class="msg-bubble"><div class="typing-bubble"><span></span><span></span><span></span></div></div>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function formatMessage(text) {
  // Basic XSS prevention: strip script tags
  text = text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:var(--saffron)">$1</a>');
}

document.addEventListener('DOMContentLoaded', initChat);
