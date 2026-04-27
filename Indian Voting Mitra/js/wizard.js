// ═══════════════════════════════════
//  WIZARD.JS — Voter Registration Guide
// ═══════════════════════════════════

let wizardStep = 0;

const WIZARD_STEPS = [
  { label: "✅ Eligibility", short: "1" },
  { label: "📄 Documents", short: "2" },
  { label: "🌐 Apply Online", short: "3" },
  { label: "🎉 Done!", short: "4" }
];

function renderWizard() {
  const container = document.getElementById('wizardContainer');
  if (!container) return;

  container.innerHTML = `
    <!-- Step indicators -->
    <div class="wizard-steps-indicator" role="tablist" aria-label="Registration steps">
      ${WIZARD_STEPS.map((s, i) => `
        <button class="wiz-step-btn ${i === 0 ? 'active' : ''}" 
          id="wizTab${i}" role="tab" aria-selected="${i === 0}"
          onclick="goToWizStep(${i})" aria-controls="wizPanel${i}">
          ${s.label}
        </button>
      `).join('')}
    </div>

    <!-- Step 0: Eligibility Checker -->
    <div class="wiz-panel active" id="wizPanel0" role="tabpanel">
      <div class="wiz-card">
        <h3>✅ Am I Eligible to Vote?</h3>
        <p class="wiz-desc">Let's check if you can register as a voter right now!</p>
        <div class="elig-form">
          <div class="form-group">
            <label for="ageInput">Your Age 🎂</label>
            <input type="number" id="ageInput" placeholder="Enter your age (e.g. 18)" min="1" max="120" aria-required="true" />
          </div>
          <div class="form-group">
            <label for="citizenInput">Are you an Indian Citizen? 🇮🇳</label>
            <select id="citizenInput" aria-required="true">
              <option value="">-- Select --</option>
              <option value="yes">Yes, I am an Indian Citizen</option>
              <option value="no">No, I am not</option>
            </select>
          </div>
          <div class="form-group">
            <label for="residenceInput">Do you have a permanent address in India? 🏠</label>
            <select id="residenceInput" aria-required="true">
              <option value="">-- Select --</option>
              <option value="yes">Yes, I have a permanent address</option>
              <option value="no">No, I am staying temporarily</option>
            </select>
          </div>
          <button class="btn btn-primary" onclick="checkEligibility()">🔍 Check My Eligibility!</button>
        </div>
        <div class="elig-result" id="eligResult" role="alert"></div>
        <div class="wiz-nav" style="margin-top:16px">
          <button class="btn btn-primary" onclick="goToWizStep(1)">Next: Documents ➜</button>
        </div>
      </div>
    </div>

    <!-- Step 1: Documents -->
    <div class="wiz-panel" id="wizPanel1" role="tabpanel">
      <div class="wiz-card">
        <h3>📄 Documents You Need</h3>
        <p class="wiz-desc">Check off each document as you collect it. Only 3 types needed!</p>
        
        <div style="margin-bottom:16px;padding:12px;background:rgba(255,153,51,0.08);border-radius:8px;border-left:4px solid var(--saffron)">
          <strong>💡 Good news!</strong> You only need ONE document from each category below!
        </div>

        <div style="margin-bottom:20px">
          <p style="font-weight:600;margin-bottom:10px;color:var(--text-primary)">📸 Proof of Age (any one):</p>
          <div class="checklist" id="ageDocList">
            ${renderCheckItems('age', [
              'Birth Certificate',
              'Class 10 Marksheet / School Certificate',
              'Passport',
              'Driving Licence (with DOB)'
            ])}
          </div>
        </div>

        <div style="margin-bottom:20px">
          <p style="font-weight:600;margin-bottom:10px;color:var(--text-primary)">🏠 Proof of Address (any one):</p>
          <div class="checklist" id="addrDocList">
            ${renderCheckItems('addr', [
              'Aadhaar Card',
              'Ration Card',
              'Utility Bill (Electricity/Water/Gas) — not older than 3 months',
              'Bank Passbook with address',
              'Passport'
            ])}
          </div>
        </div>

        <div style="margin-bottom:20px">
          <p style="font-weight:600;margin-bottom:10px;color:var(--text-primary)">📷 Passport Size Photo:</p>
          <div class="checklist" id="photoDocList">
            ${renderCheckItems('photo', [
              'Recent passport-size photo (white background preferred)',
              'Digital photo in JPG format (for online application)'
            ])}
          </div>
        </div>

        <div class="wiz-nav">
          <button class="btn btn-outline" onclick="goToWizStep(0)">← Back</button>
          <button class="btn btn-primary" onclick="goToWizStep(2)">Next: Apply Online ➜</button>
        </div>
      </div>
    </div>

    <!-- Step 2: Apply Online -->
    <div class="wiz-panel" id="wizPanel2" role="tabpanel">
      <div class="wiz-card">
        <h3>🌐 How to Apply Online</h3>
        <p class="wiz-desc">Follow these 5 simple steps on your phone or computer!</p>
        
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px">
          ${[
            ['1️⃣', 'Go to voters.eci.gov.in', 'Open this official website on your phone or computer'],
            ['2️⃣', 'Click "Register as New Voter"', 'Look for the big button on the homepage'],
            ['3️⃣', 'Fill Form 6', 'This is the new voter registration form. Fill all details carefully'],
            ['4️⃣', 'Upload your documents', 'Upload the age proof, address proof, and photo'],
            ['5️⃣', 'Submit and note Reference Number', 'Save this number to track your application later!']
          ].map(([num, title, desc]) => `
            <div style="display:flex;gap:14px;padding:14px;background:var(--bg-elevated);border-radius:10px;align-items:flex-start">
              <span style="font-size:1.5rem;flex-shrink:0">${num}</span>
              <div><strong>${title}</strong><br/><small style="color:var(--text-muted)">${desc}</small></div>
            </div>
          `).join('')}
        </div>

        <p style="font-weight:600;margin-bottom:12px;color:var(--text-primary)">🔗 Official Links:</p>
        <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" class="link-card">
          <span class="link-icon">🗳️</span>
          <div>
            <h4>voters.eci.gov.in</h4>
            <p>Official ECI Voter Registration Portal — Register, check status, download voter ID</p>
          </div>
        </a>
        <a href="https://www.nvsp.in" target="_blank" rel="noopener" class="link-card">
          <span class="link-icon">📋</span>
          <div>
            <h4>nvsp.in — National Voter's Service Portal</h4>
            <p>Fill Form 6 online, check your name in voter list, update details</p>
          </div>
        </a>
        <a href="https://play.google.com/store/apps/details?id=in.nic.eci.cdac" target="_blank" rel="noopener" class="link-card">
          <span class="link-icon">📱</span>
          <div>
            <h4>Voter Helpline App</h4>
            <p>Download the official ECI app to register and manage your voter ID on mobile!</p>
          </div>
        </a>

        <div class="wiz-nav">
          <button class="btn btn-outline" onclick="goToWizStep(1)">← Back</button>
          <button class="btn btn-primary" onclick="goToWizStep(3)">All Done! 🎉</button>
        </div>
      </div>
    </div>

    <!-- Step 3: Done -->
    <div class="wiz-panel" id="wizPanel3" role="tabpanel">
      <div class="wiz-card" style="text-align:center">
        <div style="font-size:5rem;margin-bottom:16px">🎉</div>
        <h3>You're Ready to Vote!</h3>
        <p class="wiz-desc">After submitting your application, here's what happens next:</p>
        <div style="display:flex;flex-direction:column;gap:12px;margin:24px 0;text-align:left">
          <div style="padding:14px;background:var(--bg-elevated);border-radius:10px;display:flex;gap:12px">
            <span>📬</span>
            <div><strong>BLO Visit (7-30 days)</strong><br/><small>A Booth Level Officer may visit your home to verify your address</small></div>
          </div>
          <div style="padding:14px;background:var(--bg-elevated);border-radius:10px;display:flex;gap:12px">
            <span>✅</span>
            <div><strong>Name Added to Voter List</strong><br/><small>Your name gets added to the electoral roll of your area</small></div>
          </div>
          <div style="padding:14px;background:var(--bg-elevated);border-radius:10px;display:flex;gap:12px">
            <span>🪪</span>
            <div><strong>Voter ID Card Issued</strong><br/><small>You'll receive your EPIC (Elector's Photo Identity Card) — your voter ID!</small></div>
          </div>
          <div style="padding:14px;background:rgba(19,136,8,0.08);border-radius:10px;border:1px solid rgba(19,136,8,0.2);display:flex;gap:12px">
            <span>🗳️</span>
            <div><strong>You can now vote!</strong><br/><small style="color:var(--india-green)"><strong>Congratulations!</strong> You're officially a registered voter of India! 🇮🇳</small></div>
          </div>
        </div>
        <div style="padding:16px;background:rgba(255,153,51,0.08);border-radius:10px;margin-bottom:20px">
          <strong>📞 Helpline:</strong> Call <strong>1950</strong> for voter registration help (Toll Free)
        </div>
        <div class="wiz-nav" style="justify-content:center">
          <button class="btn btn-outline" onclick="goToWizStep(0)">← Start Over</button>
          <a href="https://voters.eci.gov.in" target="_blank" class="btn btn-green">🗳️ Register Now!</a>
        </div>
      </div>
    </div>
  `;

  // Restore checked states from localStorage
  restoreCheckedStates();
}

function renderCheckItems(prefix, items) {
  return items.map((item, i) => {
    const id = `chk_${prefix}_${i}`;
    return `
      <div class="check-item" id="checkWrap_${id}" onclick="toggleCheck('${id}')">
        <input type="checkbox" id="${id}" aria-label="${item}" onclick="event.stopPropagation();toggleCheck('${id}')" />
        <label for="${id}">${item}</label>
      </div>
    `;
  }).join('');
}

function toggleCheck(id) {
  const cb = document.getElementById(id);
  if (!cb) return;
  cb.checked = !cb.checked;
  const wrap = document.getElementById(`checkWrap_${id}`);
  wrap.classList.toggle('checked', cb.checked);
  saveCheckedStates();
}

function saveCheckedStates() {
  const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
  const state = {};
  checkboxes.forEach(cb => { state[cb.id] = cb.checked; });
  try { localStorage.setItem('chunav_checklist', JSON.stringify(state)); } catch(e) {}
}

function restoreCheckedStates() {
  try {
    const state = JSON.parse(localStorage.getItem('chunav_checklist') || '{}');
    Object.entries(state).forEach(([id, checked]) => {
      const cb = document.getElementById(id);
      if (cb && checked) {
        cb.checked = true;
        const wrap = document.getElementById(`checkWrap_${id}`);
        if (wrap) wrap.classList.add('checked');
      }
    });
  } catch(e) {}
}

function checkEligibility() {
  const age = parseInt(document.getElementById('ageInput').value);
  const citizen = document.getElementById('citizenInput').value;
  const residence = document.getElementById('residenceInput').value;
  const result = document.getElementById('eligResult');

  if (!age || !citizen || !residence) {
    result.textContent = '⚠️ Please fill in all three fields above!';
    result.className = 'elig-result not-eligible';
    result.style.display = 'block';
    return;
  }

  if (citizen !== 'yes') {
    result.innerHTML = '❌ Only Indian citizens can vote in Indian elections.';
    result.className = 'elig-result not-eligible';
  } else if (age < 18) {
    result.innerHTML = `😊 You are ${age} years old. You can register to vote when you turn 18! Come back then — we'll be here!`;
    result.className = 'elig-result not-eligible';
  } else if (residence !== 'yes') {
    result.innerHTML = '⚠️ You need a permanent address to register. Talk to your local election office for options.';
    result.className = 'elig-result not-eligible';
  } else {
    result.innerHTML = `🎉 <strong>Yes! You are eligible to vote!</strong> You are ${age} years old, an Indian citizen with a permanent address. Proceed to collect your documents!`;
    result.className = 'elig-result eligible';
  }
  result.style.display = 'block';
}

function goToWizStep(step) {
  // Update panels
  document.querySelectorAll('.wiz-panel').forEach((p, i) => {
    p.classList.toggle('active', i === step);
  });
  // Update tab buttons
  document.querySelectorAll('.wiz-step-btn').forEach((btn, i) => {
    btn.classList.remove('active', 'done');
    btn.setAttribute('aria-selected', i === step ? 'true' : 'false');
    if (i < step) btn.classList.add('done');
    if (i === step) btn.classList.add('active');
  });
  wizardStep = step;
}

document.addEventListener('DOMContentLoaded', renderWizard);
