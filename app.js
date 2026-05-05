/* ══════════════════════════════════════
   storage.js — localStorage helpers
══════════════════════════════════════ */

const Store = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch {}
  }
};

/* ══════════════════════════════════════
   theme.js — dark / light toggle
══════════════════════════════════════ */

const Theme = {
  init() {
    const saved = Store.get('theme', 'light');
    this.apply(saved);
  },
  apply(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    Store.set('theme', mode);
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = mode === 'dark' ? '☀️' : '🌙';
  },
  toggle() {
    const current = Store.get('theme', 'light');
    this.apply(current === 'dark' ? 'light' : 'dark');
  }
};

/* ══════════════════════════════════════
   nav.js — mark active tab
══════════════════════════════════════ */

function initNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-tab').forEach(tab => {
    const href = tab.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      tab.classList.add('active');
    }
  });
}

/* ══════════════════════════════════════
   NAVBAR HTML (injected by each page)
══════════════════════════════════════ */

function renderNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <div class="nav-tabs">
      <a href="index.html" class="nav-tab">
        <span class="nav-icon">🕌</span>
        <span>Намаз</span>
      </a>
      <a href="tasbih.html" class="nav-tab">
        <span class="nav-icon">📿</span>
        <span>Тасбих</span>
      </a>
      <a href="sadaqa.html" class="nav-tab">
        <span class="nav-icon">💛</span>
        <span>Садака</span>
      </a>
      <a href="hajj.html" class="nav-tab">
        <span class="nav-icon">🕋</span>
        <span>Хадж</span>
      </a>
    </div>
    <button class="theme-btn" id="theme-btn" onclick="Theme.toggle()" title="Сменить тему">🌙</button>
  `;
  document.body.prepend(nav);
  initNav();
  // update icon after nav rendered
  const saved = Store.get('theme', 'light');
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';
}
