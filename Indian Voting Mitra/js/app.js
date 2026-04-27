// ═══════════════════════════════════
//  APP.JS — Main Application Logic
// ═══════════════════════════════════

const ELECTION_TYPES = [
  { emoji: '🏛️', name: 'Lok Sabha', hindi: 'लोक सभा', color: '#FF6B00', desc: 'The "House of the People" — India\'s Parliament (Lower House). 543 elected members represent the whole country!', facts: ['Every 5 years', '543 elected seats', 'Age 25+ to contest', 'Citizens vote directly'] },
  { emoji: '👑', name: 'Rajya Sabha', hindi: 'राज्य सभा', color: '#000080', desc: 'The "Council of States" — India\'s Upper House. State legislators elect Rajya Sabha members, not common citizens directly.', facts: ['6-year term each', '250 total seats', '1/3 retire every 2 years', 'Elected by MLAs'] },
  { emoji: '🏢', name: 'Vidhan Sabha', hindi: 'विधान सभा', color: '#0A7C3E', desc: 'State Legislative Assemblies. Your MLA (Member of Legislative Assembly) comes from here! They make laws for your state.', facts: ['Every 5 years', 'Varies by state', 'Age 25+ to contest', 'Citizens vote directly'] },
  { emoji: '🌾', name: 'Panchayati Raj', hindi: 'पंचायती राज', color: '#8B4513', desc: 'Grassroots democracy at village level! Your Gram Panchayat, Panchayat Samiti, and Zila Parishad elections.', facts: ['Every 5 years', 'Grassroots level', 'Age 21+ to contest', '1/3 seats for women'] },
  { emoji: '🏙️', name: 'Municipal', hindi: 'नगरपालिका', color: '#6A0DAD', desc: 'Elections for city/town governance — Municipal Corporations, Municipal Councils, Nagar Panchayats for urban areas.', facts: ['Every 5 years', 'For urban areas', 'Mayor elected indirectly', 'Ward-level reps'] }
];

const VOTER_RIGHTS = [
  { icon: '🗳️', title: 'Right to Vote (Article 326)', body: 'Every Indian citizen aged 18 and above has the fundamental right to vote in elections. This is called Universal Adult Franchise — your age and vote count, not your wealth or education!' },
  { icon: '🔒', title: 'Right to Secret Ballot', body: 'Your vote is completely secret! Nobody — not even the government, your employer, or your family — can find out how you voted. This protects you from pressure or threats.' },
  { icon: '⚖️', title: 'Right to Free & Fair Election (Article 324)', body: 'The Election Commission of India (ECI) is an independent body that ensures elections are fair. It has the power to override even the government to protect your vote!' },
  { icon: '🎯', title: 'Right to Contest Elections', body: 'Any Indian citizen above 25 years (for Lok Sabha/Vidhan Sabha) or 30 years (for Rajya Sabha) can file nomination and contest elections. Democracy is open to everyone!' },
  { icon: '🚫', title: 'Right Against Intimidation', body: 'It is a crime to threaten, bribe, or pressure you for your vote. This is called "undue influence" and "booth capturing". Report it on the 1950 helpline or the cVigil app!' },
  { icon: '📋', title: 'Right to Voter ID (EPIC)', body: 'Every registered voter has the right to receive a free Voter ID card (EPIC). This is an official identity document that can be used for many purposes beyond just voting.' }
];

const VOTER_DUTIES = [
  { icon: '✅', title: 'VOTE! — Your Most Important Duty', desc: 'Voting is not just a right — it\'s a civic responsibility! A democracy weakens when citizens don\'t participate. Your one vote can change history!' },
  { icon: '📰', title: 'Stay Informed', desc: 'Learn about candidates and their track records before voting. Don\'t vote based on caste, religion, or freebies alone. Check facts, not just promises!' },
  { icon: '🚫', title: 'Don\'t Accept Bribes', desc: 'Accepting money or gifts for votes is illegal AND harmful. It lets corrupt politicians win. Your vote is worth more than ₹500 — it\'s worth 5 years of good governance!' },
  { icon: '📢', title: 'Report Election Violations', desc: 'If you see vote-buying, booth capturing, or MCC violation — report it! Use the cVigil app or call 1950 (Toll Free). Be a democracy watchdog!' },
  { icon: '🌍', title: 'Encourage Others to Vote', desc: 'Help elderly neighbors, first-time voters, and less educated citizens understand how to vote. Every vote strengthens democracy!' },
  { icon: '📝', title: 'Keep Your Details Updated', desc: 'Changed address? Moved to a new city? Update your voter registration details at nvsp.in or using Form 8A so your vote always counts in the right place!' }
];

// ── RENDER ELECTION TYPES ──
function renderElectionTypes() {
  const grid = document.getElementById('typesGrid');
  if (!grid) return;

  const detailDiv = document.createElement('div');
  detailDiv.className = 'type-detail';
  detailDiv.id = 'typeDetail';

  grid.innerHTML = ELECTION_TYPES.map((type, i) => `
    <div class="type-card reveal" style="--card-color:${type.color};animation-delay:${i * 0.08}s"
         onclick="toggleTypeCard(${i})" role="button" tabindex="0"
         aria-expanded="false" id="typeCard${i}"
         onkeydown="if(event.key==='Enter'||event.key===' ')toggleTypeCard(${i})">
      <span class="type-emoji">${type.emoji}</span>
      <div class="type-name">${type.name}</div>
      <div class="type-hindi">${type.hindi}</div>
    </div>
  `).join('');

  grid.appendChild(detailDiv);
}

let activeTypeIndex = -1;
function toggleTypeCard(index) {
  const detail = document.getElementById('typeDetail');
  const card = document.getElementById(`typeCard${index}`);

  if (activeTypeIndex === index) {
    detail.classList.remove('show');
    card.classList.remove('active');
    card.setAttribute('aria-expanded', 'false');
    activeTypeIndex = -1;
    return;
  }

  document.querySelectorAll('.type-card').forEach(c => {
    c.classList.remove('active');
    c.setAttribute('aria-expanded', 'false');
  });

  const type = ELECTION_TYPES[index];
  detail.innerHTML = `
    <h3>${type.emoji} ${type.name} <span style="color:var(--text-muted);font-weight:400;font-size:0.9rem">(${type.hindi})</span></h3>
    <p>${type.desc}</p>
    <div class="type-facts">
      ${type.facts.map(f => `<span class="fact-badge">${f}</span>`).join('')}
    </div>
  `;
  detail.style.borderLeftColor = type.color;
  detail.classList.add('show');
  card.classList.add('active');
  card.setAttribute('aria-expanded', 'true');
  activeTypeIndex = index;

  setTimeout(() => detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
}

// ── RENDER RIGHTS & DUTIES ──
function renderRights() {
  const container = document.getElementById('rightsContent');
  if (!container) return;

  container.innerHTML = `
    <div class="tab-panel active" id="tabRights">
      ${VOTER_RIGHTS.map((r, i) => `
        <div class="accordion-item reveal" style="animation-delay:${i * 0.06}s">
          <div class="accordion-header" onclick="toggleAccordion(this)" role="button"
               tabindex="0" aria-expanded="false"
               onkeydown="if(event.key==='Enter'||event.key===' ')toggleAccordion(this)">
            <span class="acc-icon">${r.icon}</span>
            <span>${r.title}</span>
            <span class="acc-chevron" aria-hidden="true">▾</span>
          </div>
          <div class="accordion-body">${r.body}</div>
        </div>
      `).join('')}
    </div>
    <div class="tab-panel" id="tabDuties">
      <div class="duties-grid">
        ${VOTER_DUTIES.map((d, i) => `
          <div class="duty-card reveal" style="animation-delay:${i * 0.08}s">
            <div class="duty-icon">${d.icon}</div>
            <h4>${d.title}</h4>
            <p>${d.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const tab = btn.dataset.tab;
      document.getElementById('tabRights').classList.toggle('active', tab === 'rights');
      document.getElementById('tabDuties').classList.toggle('active', tab === 'duties');
    });
  });
}

function toggleAccordion(header) {
  const item = header.closest('.accordion-item');
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.accordion-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
  });

  if (!isOpen) {
    item.classList.add('open');
    header.setAttribute('aria-expanded', 'true');
  }
}

// ── THEME TOGGLE ──
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  const icon = toggle.querySelector('.theme-icon');
  let dark = false;

  try { dark = localStorage.getItem('chunav_theme') === 'dark'; } catch(e) {}
  if (dark) { document.documentElement.setAttribute('data-theme', 'dark'); icon.textContent = '☀️'; }

  toggle.addEventListener('click', () => {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    icon.textContent = dark ? '☀️' : '🌙';
    try { localStorage.setItem('chunav_theme', dark ? 'dark' : 'light'); } catch(e) {}
  });
}

// ── NAVBAR ──
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!navbar || !hamburger || !navLinks) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
  });
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function observeNewElements() {
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }, 300);
}

// ── ACCESSIBILITY ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const panel = document.getElementById('chatPanel');
    if (panel?.classList.contains('open')) {
      panel.classList.remove('open');
      document.getElementById('chatFab')?.focus();
    }
    document.getElementById('navLinks')?.classList.remove('open');
  }
});

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  renderElectionTypes();
  renderRights();
  initScrollReveal();
  setTimeout(observeNewElements, 500);
});
