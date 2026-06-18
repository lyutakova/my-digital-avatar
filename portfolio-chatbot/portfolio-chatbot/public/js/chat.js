// ── State ─────────────────────────────────────────────────────────────────────
const history = [];
let isTyping = false;

const messagesEl = document.getElementById('messages');

// ── Render helpers ────────────────────────────────────────────────────────────
function scrollBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addBotBubble(text) {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';

  const av = document.createElement('div');
  av.className = 'msg-av';
  av.innerHTML = '<img src="photo.jpg" style="width:28px;height:28px;border-radius:50%;object-fit:cover;" />';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;

  wrap.appendChild(av);
  wrap.appendChild(bubble);
  messagesEl.appendChild(wrap);
  scrollBottom();
}

function addUserBubble(text) {
  const wrap = document.createElement('div');
  wrap.className = 'msg user';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;

  wrap.appendChild(bubble);
  messagesEl.appendChild(wrap);
  scrollBottom();
}

// Project cards rendered inline in the chat
function addProjectCards(message, projectIds) {
  const wrap = document.createElement('div');
  wrap.className = 'cards-msg';

  const intro = document.createElement('p');
  intro.className = 'cards-intro';
  intro.textContent = message;
  wrap.appendChild(intro);

  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  projectIds.forEach(id => {
    const p = PROJECTS[id];
    if (!p) return;

    const card = document.createElement('button');
    card.className = 'project-card';
    card.setAttribute('aria-label', `Open case study: ${p.title}`);
    card.onclick = () => openProject(id);
    card.innerHTML = `
      <span class="card-tag">${p.tag}</span>
      <div class="card-title">${p.title}</div>
      <div class="card-desc">${p.desc}</div>
      <div class="card-arrow">View case study →</div>
    `;
    grid.appendChild(card);
  });

  wrap.appendChild(grid);
  messagesEl.appendChild(wrap);
  scrollBottom();
}

function showTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.id = 'typing';

  const av = document.createElement('div');
  av.className = 'msg-av';
  av.textContent = 'YN';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';

  wrap.appendChild(av);
  wrap.appendChild(bubble);
  messagesEl.appendChild(wrap);
  scrollBottom();
}

function hideTyping() {
  document.getElementById('typing')?.remove();
}

// ── Parse server response ─────────────────────────────────────────────────────
// Detect PORTFOLIO_CARDS:{...} anywhere in the reply
function parseReply(text) {
  const match = text.match(/PORTFOLIO_CARDS:(\{.*\})/s);
  if (match) {
    try {
      const data = JSON.parse(match[1]);
      return { type: 'cards', message: data.message, projects: data.projects };
    } catch (_) {}
  }
  return { type: 'text', text };
}

// ── Send a message ─────────────────────────────────────────────────────────────
async function sendMessage() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text || isTyping) return;

  input.value = '';
  input.style.height = 'auto';
  isTyping = true;

  addUserBubble(text);
  history.push({ role: 'user', content: text });

  showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history })
    });

    const data = await res.json();
    hideTyping();

    if (data.error) {
      addBotBubble('Sorry, something went wrong: ' + data.error);
      isTyping = false;
      return;
    }

    const replyText = data.content?.[0]?.text || '';
    history.push({ role: 'assistant', content: replyText });

    const parsed = parseReply(replyText);

    if (parsed.type === 'cards') {
      addProjectCards(parsed.message, parsed.projects);
    } else {
      addBotBubble(parsed.text);
    }

  } catch (err) {
    hideTyping();
    addBotBubble('Connection error. Please try again.');
  }

  isTyping = false;
}

// Sidebar quick-fire buttons
function sendQuick(text) {
  document.getElementById('user-input').value = text;
  sendMessage();
}

// Enter to send, shift+enter for newline
function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// Auto-resize textarea
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

// Clear conversation
function clearChat() {
  history.length = 0;
  messagesEl.innerHTML = '';
  addGreeting();
}

// ── Initial greeting ───────────────────────────────────────────────────────────
function addGreeting() {
  addBotBubble("Hey there 👋 I'm Tetiana's digital avatar. Ask me about my projects, design process, skills — or how to get in touch. What would you like to know?");
}

addGreeting();
