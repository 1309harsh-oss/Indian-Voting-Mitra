// ═══════════════════════════════════
//  GAME.JS — Election Word Search Game
// ═══════════════════════════════════

const ELECTION_WORDS = ['EVM', 'VOTE', 'BALLOT', 'ECI', 'NOTA', 'VVPAT', 'EPIC', 'MLA', 'MP', 'POLL'];

const WORD_HINTS = {
  'EVM': 'Electronic Voting Machine',
  'VOTE': 'Cast your choice!',
  'BALLOT': 'Your voting paper',
  'ECI': 'Election Commission of India',
  'NOTA': 'None of the Above',
  'VVPAT': 'Paper trail after EVM vote',
  'EPIC': 'Voter ID Card',
  'MLA': 'State Assembly Member',
  'MP': 'Parliament Member',
  'POLL': 'Voting process'
};

const GRID_SIZE = 10;
let grid = [];
let placedWords = [];
let selectedCells = [];
let foundWords = [];
let gameTimer = null;
let timeLeft = 120;
let isSelecting = false;
let gameStarted = false;

function renderWordGame() {
  const container = document.getElementById('wordGameContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="game-start-screen" id="gameStartScreen">
      <div style="font-size:3.5rem;margin-bottom:16px;">🎮</div>
      <h3>Election Word Search!</h3>
      <p>Find hidden election words in the grid. You have <strong>2 minutes</strong>. How many can you find?</p>
      <div class="word-preview">
        ${ELECTION_WORDS.map(w => `<span class="word-chip">${w}</span>`).join('')}
      </div>
      <button class="btn btn-primary" onclick="startWordGame()">🚀 Start Game!</button>
    </div>
    <div class="game-over-screen" id="gameOverScreen">
      <div class="game-over-emoji" id="gameOverEmoji">🎉</div>
      <div style="font-size:1rem;color:var(--text-secondary);margin:8px 0;">You found</div>
      <div class="game-over-score" id="gameOverScore">0/10</div>
      <p class="result-msg" id="gameOverMsg" style="margin:12px 0 28px;"></p>
      <button class="btn btn-primary" onclick="startWordGame()">🔄 Play Again!</button>
    </div>
  `;
}

function startWordGame() {
  gameStarted = true;
  foundWords = [];
  selectedCells = [];
  timeLeft = 120;

  // Build grid
  grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(''));
  placedWords = [];

  // Place words
  ELECTION_WORDS.forEach(word => {
    let placed = false;
    let tries = 0;
    while (!placed && tries < 100) {
      tries++;
      const dir = [
        [0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1], [-1, 1]
      ][Math.floor(Math.random() * 8)];
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      if (canPlace(word, row, col, dir)) {
        placeWord(word, row, col, dir);
        placed = true;
      }
    }
  });

  // Fill empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPRSTUVWXY';
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c]) grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
    }
  }

  const container = document.getElementById('wordGameContainer');
  container.innerHTML = `
    <div class="word-grid-wrap">
      <div class="game-meta">
        <div>
          <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;">Time Left</div>
          <div class="game-timer" id="gameTimerDisplay">2:00</div>
        </div>
        <span class="game-score-badge" id="gameScoreBadge">⭐ 0 / ${ELECTION_WORDS.length} Found</span>
      </div>
      <div class="letter-grid" id="letterGrid" style="grid-template-columns:repeat(${GRID_SIZE},1fr);"></div>
      <div class="game-actions">
        <button class="btn btn-ghost btn-sm" onclick="startWordGame()">🔄 Restart</button>
        <button class="btn btn-ghost btn-sm" onclick="showHint()">💡 Hint</button>
      </div>
    </div>
    <div class="word-panel">
      <h4>Find These Words</h4>
      <div class="word-list" id="wordList">
        ${ELECTION_WORDS.map(w => `
          <div class="word-item" id="word-${w}" title="${WORD_HINTS[w]}">
            <span>${w}</span>
            <span class="word-item-check">✓</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  renderGrid();
  startTimer();
}

function canPlace(word, row, col, [dr, dc]) {
  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return false;
    if (grid[r][c] && grid[r][c] !== word[i]) return false;
  }
  return true;
}

function placeWord(word, row, col, [dr, dc]) {
  const cells = [];
  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    grid[r][c] = word[i];
    cells.push(`${r},${c}`);
  }
  placedWords.push({ word, cells });
}

function renderGrid() {
  const gridEl = document.getElementById('letterGrid');
  if (!gridEl) return;
  gridEl.innerHTML = '';

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = document.createElement('div');
      cell.className = 'letter-cell';
      cell.textContent = grid[r][c];
      cell.dataset.r = r;
      cell.dataset.c = c;

      cell.addEventListener('mousedown', () => startSelect(r, c));
      cell.addEventListener('mouseover', () => continueSelect(r, c));
      cell.addEventListener('touchstart', (e) => { e.preventDefault(); startSelect(r, c); }, { passive: false });
      cell.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        if (el && el.classList.contains('letter-cell')) {
          continueSelect(parseInt(el.dataset.r), parseInt(el.dataset.c));
        }
      }, { passive: false });

      gridEl.appendChild(cell);
    }
  }

  document.addEventListener('mouseup', endSelect);
  document.addEventListener('touchend', endSelect);

  // Re-mark found words
  foundWords.forEach(w => {
    const pw = placedWords.find(p => p.word === w);
    if (pw) pw.cells.forEach(key => markCellFound(key));
  });
}

function getCellEl(r, c) {
  return document.querySelector(`.letter-cell[data-r="${r}"][data-c="${c}"]`);
}

function markCellFound(key) {
  const [r, c] = key.split(',').map(Number);
  const el = getCellEl(r, c);
  if (el) { el.classList.add('found'); el.classList.remove('selected'); }
}

function startSelect(r, c) {
  if (!gameStarted) return;
  isSelecting = true;
  selectedCells = [`${r},${c}`];
  updateSelectionUI();
}

function continueSelect(r, c) {
  if (!isSelecting || !gameStarted) return;
  const key = `${r},${c}`;
  if (!selectedCells.includes(key)) {
    selectedCells.push(key);
    updateSelectionUI();
  }
}

function endSelect() {
  if (!isSelecting) return;
  isSelecting = false;
  checkSelection();
  selectedCells = [];
  updateSelectionUI();
}

function updateSelectionUI() {
  document.querySelectorAll('.letter-cell').forEach(el => {
    const key = `${el.dataset.r},${el.dataset.c}`;
    if (foundWords.some(w => {
      const pw = placedWords.find(p => p.word === w);
      return pw && pw.cells.includes(key);
    })) {
      el.classList.add('found'); el.classList.remove('selected');
    } else if (selectedCells.includes(key)) {
      el.classList.add('selected'); el.classList.remove('found');
    } else {
      el.classList.remove('selected', 'found');
    }
  });
}

function checkSelection() {
  if (selectedCells.length < 2) return;

  for (const { word, cells } of placedWords) {
    if (foundWords.includes(word)) continue;

    const fwd = cells.every(c => selectedCells.includes(c)) && selectedCells.every(c => cells.includes(c));
    if (fwd) {
      foundWords.push(word);
      cells.forEach(key => markCellFound(key));
      document.getElementById(`word-${word}`)?.classList.add('found-word');

      const badge = document.getElementById('gameScoreBadge');
      if (badge) badge.textContent = `⭐ ${foundWords.length} / ${ELECTION_WORDS.length} Found`;

      // Celebration flash
      cells.forEach(key => {
        const [r, c] = key.split(',').map(Number);
        const el = getCellEl(r, c);
        if (el) { el.style.transform = 'scale(1.15)'; setTimeout(() => el.style.transform = '', 300); }
      });

      if (foundWords.length === ELECTION_WORDS.length) {
        clearInterval(gameTimer);
        setTimeout(showGameOver, 600);
      }
      return;
    }
  }
}

function showHint() {
  const remaining = ELECTION_WORDS.filter(w => !foundWords.includes(w));
  if (!remaining.length) return;
  const word = remaining[Math.floor(Math.random() * remaining.length)];
  const pw = placedWords.find(p => p.word === word);
  if (!pw) return;

  // Flash first cell
  const [r, c] = pw.cells[0].split(',').map(Number);
  const el = getCellEl(r, c);
  if (el) {
    el.style.background = 'var(--saffron)';
    el.style.color = 'white';
    setTimeout(() => { el.style.background = ''; el.style.color = ''; }, 1000);
  }
}

function startTimer() {
  clearInterval(gameTimer);
  gameTimer = setInterval(() => {
    timeLeft--;
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const display = document.getElementById('gameTimerDisplay');
    if (display) {
      display.textContent = `${m}:${s.toString().padStart(2, '0')}`;
      display.className = 'game-timer' + (timeLeft <= 20 ? ' urgent' : '');
    }
    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      showGameOver();
    }
  }, 1000);
}

function showGameOver() {
  gameStarted = false;
  clearInterval(gameTimer);

  const score = foundWords.length;
  const total = ELECTION_WORDS.length;
  let emoji, msg;

  if (score === total) { emoji = '🏆'; msg = 'Perfect! You found ALL the words! You\'re an election expert!'; }
  else if (score >= 7) { emoji = '🌟'; msg = `Amazing! You found ${score} out of ${total}. Very impressive!`; }
  else if (score >= 4) { emoji = '😊'; msg = `Good job! You found ${score} words. Practice more and you\'ll get them all!`; }
  else { emoji = '💪'; msg = `You found ${score} words. Don\'t give up — try again! You\'ll do better!`; }

  const container = document.getElementById('wordGameContainer');
  container.innerHTML = `
    <div class="game-over-screen" id="gameOverScreen" style="display:block;grid-column:1/-1;">
      <div class="game-over-emoji">${emoji}</div>
      <div style="font-size:1rem;color:var(--text-secondary);margin:8px 0;">You found</div>
      <div class="game-over-score">${score} / ${total} words</div>
      <p class="result-msg">${msg}</p>
      <button class="btn btn-primary" onclick="startWordGame()">🔄 Play Again!</button>
    </div>
  `;

  if (score >= 7) launchGameConfetti();
}

function launchGameConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: Math.random() * 10 + 5, h: Math.random() * 5 + 3,
    color: ['#FF6B00','#0A7C3E','#FFFFFF','#000080','#FFD700'][Math.floor(Math.random() * 5)],
    rot: Math.random() * 360,
    vx: (Math.random() - 0.5) * 3, vy: Math.random() * 4 + 2, vr: (Math.random() - 0.5) * 6
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    });
    frame++;
    if (frame < 150) requestAnimationFrame(draw);
    else { canvas.style.display = 'none'; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
  draw();
}

document.addEventListener('DOMContentLoaded', renderWordGame);
