// ═══════════════════════════════════
//  TIMELINE.JS — Election Process Steps
// ═══════════════════════════════════

const TIMELINE_STEPS = [
  {
    emoji: '📣',
    title: 'Election Announcement',
    desc: 'The Election Commission of India (ECI) announces election dates. The Model Code of Conduct (MCC) starts immediately — no new government schemes allowed!',
    tag: 'Day 0',
    color: 'var(--saffron)'
  },
  {
    emoji: '📝',
    title: 'Nomination Filing',
    desc: 'Candidates file their nomination papers with the Returning Officer. They must also submit Form 26 (declaration of assets, criminal cases, education).',
    tag: 'Week 1',
    color: '#7B2FBE'
  },
  {
    emoji: '🔍',
    title: 'Scrutiny of Nominations',
    desc: 'The Returning Officer checks all nomination papers to make sure they are correct and complete. Invalid forms are rejected.',
    tag: 'Week 1-2',
    color: '#2563EB'
  },
  {
    emoji: '🏃',
    title: 'Withdrawal of Candidature',
    desc: 'Candidates who changed their mind can withdraw. The final list of candidates who will contest is published.',
    tag: 'Week 2',
    color: '#059669'
  },
  {
    emoji: '📢',
    title: 'Election Campaign',
    desc: 'Candidates campaign — speeches, rallies, door-to-door visits! All campaigning must STOP 48 hours before polling day (Silent Period).',
    tag: 'Weeks 2-5',
    color: '#FF6B00'
  },
  {
    emoji: '🗳️',
    title: 'Polling Day',
    desc: 'Citizens go to their booth and press the EVM button. VVPAT shows a slip for 7 seconds confirming your vote. Indelible ink is applied to left index finger.',
    tag: 'Voting Day',
    color: '#DC2626'
  },
  {
    emoji: '📦',
    title: 'EVM Sealing & Storage',
    desc: 'After polling ends, EVMs are sealed by candidates\' agents and stored in secure strongrooms under 24/7 CCTV surveillance and police guard.',
    tag: 'After Voting',
    color: '#7C3AED'
  },
  {
    emoji: '🧮',
    title: 'Counting of Votes',
    desc: 'On counting day, EVMs are brought out and votes are counted round by round. Results are declared constituency by constituency.',
    tag: 'Result Day',
    color: '#D97706'
  },
  {
    emoji: '🏆',
    title: 'Result Declaration',
    desc: 'The winning candidate is declared elected. The party/alliance with majority forms the government. The President/Governor invites them to form government.',
    tag: 'Final Step',
    color: 'var(--green)'
  }
];

function renderTimeline() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  container.innerHTML = TIMELINE_STEPS.map((step, i) => `
    <div class="timeline-item reveal" style="animation-delay:${i * 0.08}s" role="listitem">
      <div class="tl-step">
        <div class="tl-dot">${step.emoji}</div>
        <span class="tl-num">STEP ${i + 1}</span>
      </div>
      <div class="tl-body">
        <h3>${step.title}</h3>
        <p>${step.desc}</p>
        <span class="tl-tag">${step.tag}</span>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderTimeline);
