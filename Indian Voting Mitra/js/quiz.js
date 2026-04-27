// ═══════════════════════════════════
//  QUIZ.JS — Election Knowledge Quiz
// ═══════════════════════════════════

const QUIZ_QUESTIONS = [
  {
    q: "What is the minimum age to vote in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    answer: 1,
    explanation: "In India, every citizen who is 18 years or older has the right to vote. This was changed from 21 to 18 years in 1989 by the 61st Constitutional Amendment.",
    difficulty: "easy"
  },
  {
    q: "EVM stands for what?",
    options: ["Electric Vote Machine", "Electronic Voting Machine", "Every Voter Machine", "Electronic Voter Method"],
    answer: 1,
    explanation: "EVM stands for Electronic Voting Machine. India started using EVMs in the 1980s to make elections faster, cheaper and tamper-proof.",
    difficulty: "easy"
  },
  {
    q: "Which article of the Indian Constitution gives the right to vote?",
    options: ["Article 14", "Article 19", "Article 326", "Article 21"],
    answer: 2,
    explanation: "Article 326 of the Constitution gives every adult Indian citizen the right to vote in elections. This is called Universal Adult Franchise.",
    difficulty: "hard"
  },
  {
    q: "How many seats are there in the Lok Sabha?",
    options: ["250", "543", "545", "552"],
    answer: 1,
    explanation: "The Lok Sabha (House of the People) has 543 elected seats. Members are elected from 543 constituencies across India.",
    difficulty: "easy"
  },
  {
    q: "What does ECI stand for?",
    options: ["Election Commission of India", "Electoral Control Institution", "Election Council of India", "Electoral Commission Institution"],
    answer: 0,
    explanation: "ECI stands for Election Commission of India. It is an autonomous constitutional authority responsible for administering all elections in India.",
    difficulty: "easy"
  },
  {
    q: "NOTA in voting means?",
    options: ["None of the Above", "No Other Than All", "Not One True Answer", "National Option To All"],
    answer: 0,
    explanation: "NOTA means 'None of the Above'. Introduced in 2013, it allows voters to reject all candidates if they feel none deserves their vote.",
    difficulty: "medium"
  },
  {
    q: "What is VVPAT?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Verified Voter Paper And Ticket",
      "Voter Validation Paper Audit Technology",
      "Verified Voting Paper Authentication Trail"
    ],
    answer: 0,
    explanation: "VVPAT is Voter Verified Paper Audit Trail. After you press EVM, a slip prints for 7 seconds showing which party you voted for — so you can verify your vote.",
    difficulty: "medium"
  },
  {
    q: "Model Code of Conduct comes into force when?",
    options: ["On voting day", "When nomination process starts", "When election dates are announced", "When counting starts"],
    answer: 2,
    explanation: "The Model Code of Conduct (MCC) comes into force immediately when the Election Commission announces election dates. It restricts government from announcing new schemes.",
    difficulty: "medium"
  },
  {
    q: "How long is one term of a Lok Sabha member (MP)?",
    options: ["3 years", "4 years", "5 years", "6 years"],
    answer: 2,
    explanation: "An MP's term in the Lok Sabha is 5 years. However, the President can dissolve the Lok Sabha before 5 years if the government loses majority.",
    difficulty: "easy"
  },
  {
    q: "Who is the Chief Election Commissioner of India (as of 2024-25)?",
    options: ["T.N. Seshan", "Rajiv Kumar", "S.Y. Quraishi", "Nasim Zaidi"],
    answer: 1,
    explanation: "Rajiv Kumar has been serving as the Chief Election Commissioner of India. The CEC is appointed by the President of India.",
    difficulty: "hard"
  },
  {
    q: "In which year were EVMs first used in an Indian General Election?",
    options: ["1984", "1989", "1998", "2004"],
    answer: 2,
    explanation: "EVMs were first used in all constituencies in the 1998 General Election. Before that, paper ballots were used which took much longer to count.",
    difficulty: "hard"
  },
  {
    q: "What mark is put on a voter's finger after voting?",
    options: ["Red ink", "Black ink", "Indelible (non-removable) ink", "Blue ink"],
    answer: 2,
    explanation: "Indelible ink (अमिट स्याही) is applied to the left index finger after voting. This ink cannot be washed off easily, preventing people from voting twice.",
    difficulty: "easy"
  },
  {
    q: "Panchayati Raj elections are conducted by?",
    options: [
      "Election Commission of India (ECI)",
      "State Election Commissions",
      "District Collectors",
      "Gram Sabha members"
    ],
    answer: 1,
    explanation: "Panchayati Raj and Municipal elections are conducted by State Election Commissions (not ECI). Each state has its own State Election Commissioner for local body elections.",
    difficulty: "medium"
  },
  {
    q: "A candidate needs to pay how much security deposit for Lok Sabha elections (General category)?",
    options: ["₹10,000", "₹12,500", "₹25,000", "₹50,000"],
    answer: 2,
    explanation: "A Lok Sabha candidate must deposit ₹25,000 as security deposit. This deposit is forfeited (not returned) if the candidate gets less than 1/6th of total votes polled.",
    difficulty: "hard"
  },
  {
    q: "What is 'Silent Period' or 'Campaign Silence'?",
    options: [
      "Period when voters don't talk",
      "48 hours before polling when campaigning is banned",
      "Period when media cannot report results",
      "Day when counting happens"
    ],
    answer: 1,
    explanation: "Silent Period is the 48-hour window before polling day when all election campaigning — rallies, ads, speeches — is completely banned. This gives voters time to think calmly.",
    difficulty: "medium"
  }
];

let quizState = {
  questions: [],
  currentIndex: 0,
  score: 0,
  answered: false
};

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="quiz-start" id="quizStart">
      <div class="quiz-start-icon">🧠</div>
      <h3>Are you ready?</h3>
      <p>15 questions about Indian elections. Each correct answer = 1 star ⭐<br/>
         Don't worry — you'll learn something new even if you get it wrong!</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;">
        <span style="padding:6px 14px;background:rgba(19,136,8,0.1);border-radius:50px;font-size:0.85rem;color:var(--india-green);">🟢 Easy</span>
        <span style="padding:6px 14px;background:rgba(255,153,51,0.1);border-radius:50px;font-size:0.85rem;color:var(--saffron);">🟡 Medium</span>
        <span style="padding:6px 14px;background:rgba(200,0,0,0.1);border-radius:50px;font-size:0.85rem;color:#c00;">🔴 Hard</span>
      </div>
      <button class="btn btn-primary" onclick="startQuiz()">🚀 Start the Quiz!</button>
    </div>

    <div class="quiz-game" id="quizGame">
      <div class="quiz-header">
        <span class="q-num" id="qNum">Q 1 / 15</span>
        <div class="q-progress" role="progressbar" aria-label="Quiz progress">
          <div class="q-progress-bar" id="qProgressBar" style="width:0%"></div>
        </div>
        <span class="q-score" id="qScore">⭐ 0</span>
      </div>
      <div class="question-card" id="questionCard"></div>
    </div>

    <div class="quiz-result" id="quizResult">
      <div class="result-emoji" id="resultEmoji"></div>
      <div class="result-score" id="resultScore"></div>
      <p class="result-msg" id="resultMsg"></p>
      <button class="btn btn-primary" onclick="startQuiz()">🔄 Try Again!</button>
      <a href="#timeline" class="btn btn-outline" style="margin-top:8px">📚 Learn More</a>
    </div>
  `;
}

function startQuiz() {
  // Shuffle questions
  quizState.questions = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  quizState.currentIndex = 0;
  quizState.score = 0;

  document.getElementById('quizStart').style.display = 'none';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizGame').style.display = 'block';

  showQuestion();
}

function showQuestion() {
  const q = quizState.questions[quizState.currentIndex];
  const total = quizState.questions.length;
  const idx = quizState.currentIndex;

  quizState.answered = false;

  document.getElementById('qNum').textContent = `Q ${idx + 1} / ${total}`;
  document.getElementById('qProgressBar').style.width = `${(idx / total) * 100}%`;
  document.getElementById('qScore').textContent = `⭐ ${quizState.score}`;

  const letters = ['A', 'B', 'C', 'D'];
  const diffClass = `difficulty-${q.difficulty}`;
  const diffLabel = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);

  document.getElementById('questionCard').innerHTML = `
    <div class="q-difficulty ${diffClass}">${q.difficulty === 'easy' ? '🟢' : q.difficulty === 'medium' ? '🟡' : '🔴'} ${diffLabel}</div>
    <div class="q-text">${q.q}</div>
    <div class="options" id="optionsContainer">
      ${q.options.map((opt, i) => `
        <button class="option-btn" onclick="selectAnswer(${i})"
          aria-label="Option ${letters[i]}: ${opt}">
          <span class="option-letter">${letters[i]}</span>
          ${opt}
        </button>
      `).join('')}
    </div>
    <div class="q-explanation" id="qExplanation" role="alert">
      <strong>💡 Did you know?</strong> ${q.explanation}
    </div>
    <button class="btn btn-primary quiz-next-btn" id="nextBtn" onclick="nextQuestion()" style="display:none">
      ${idx + 1 === total ? '🏁 See Results!' : 'Next Question ➜'}
    </button>
  `;
}

function selectAnswer(selectedIndex) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = quizState.questions[quizState.currentIndex];
  const buttons = document.querySelectorAll('.option-btn');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    if (i === selectedIndex && i !== q.answer) btn.classList.add('wrong');
  });

  if (selectedIndex === q.answer) {
    quizState.score++;
    document.getElementById('qScore').textContent = `⭐ ${quizState.score}`;
  }

  document.getElementById('qExplanation').classList.add('show');
  document.getElementById('nextBtn').style.display = 'flex';
}

function nextQuestion() {
  quizState.currentIndex++;
  if (quizState.currentIndex >= quizState.questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  document.getElementById('quizGame').style.display = 'none';
  const result = document.getElementById('quizResult');
  result.style.display = 'block';

  const score = quizState.score;
  const total = quizState.questions.length;
  const pct = (score / total) * 100;

  let emoji, msg;
  if (pct === 100) { emoji = '🏆'; msg = "Perfect score! You're an election expert! Share this with your friends!"; }
  else if (pct >= 80) { emoji = '🌟'; msg = "Excellent! You know Indian elections really well. Keep it up!"; }
  else if (pct >= 60) { emoji = '😊'; msg = "Good job! Read the timeline section to learn even more!"; }
  else if (pct >= 40) { emoji = '📚'; msg = "Not bad for a start! Read the explainer section and try again!"; }
  else { emoji = '💪'; msg = "Don't give up! Every champion starts as a learner. Try again!"; }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultScore').textContent = `${score} / ${total}`;
  document.getElementById('resultMsg').textContent = msg;

  if (pct >= 60) launchConfetti();
}

// ── CONFETTI ──
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: Math.random() * 12 + 6,
    h: Math.random() * 6 + 4,
    color: ['#FF9933','#138808','#FFFFFF','#000080','#FFD700'][Math.floor(Math.random()*5)],
    rot: Math.random() * 360,
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 4 + 2,
    vr: (Math.random() - 0.5) * 6
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    });
    frame++;
    if (frame < 180) requestAnimationFrame(draw);
    else { canvas.style.display = 'none'; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
  draw();
}

document.addEventListener('DOMContentLoaded', renderQuiz);
