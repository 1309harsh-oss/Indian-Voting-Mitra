# 🗳️ Bharat Chunav Mitra — Your Election Best Friend

> **Hackathon Vertical:** Civic Education & Government Services Assistant
> An AI-powered, accessible, multilingual platform helping every Indian citizen understand and participate in elections.

---

## 🎯 Chosen Vertical

**Civic Education & Citizen Empowerment**

Chunav Mitra addresses a critical real-world problem: millions of Indian citizens — especially first-time voters, rural citizens, and those with limited digital literacy — don't fully understand the election process, their rights, or how to register. This platform democratizes civic knowledge in a friendly, multilingual, interactive format.

---

## 🧠 Approach & Logic

### Problem Statement
India has 96 crore+ registered voters but voter turnout remains a challenge due to:
- Lack of awareness about voter registration process
- Language barriers (22 official languages)
- Fear of complex bureaucratic procedures
- Limited access to civic education

### Solution Architecture

```
User Query / Interaction
        │
        ▼
┌───────────────────────────────────┐
│         Chunav Mitra Platform      │
│                                   │
│  ┌─────────┐  ┌────────────────┐  │
│  │ Google  │  │  Gemini AI     │  │
│  │Translate│  │  (1.5 Flash)   │  │
│  │   API   │  │  Chat Engine   │  │
│  └─────────┘  └────────────────┘  │
│                                   │
│  ┌──────────────────────────────┐ │
│  │   Educational Content Engine │ │
│  │  Timeline │ Quiz │ Word Game │ │
│  │  Rights   │ Wizard│ Types   │ │
│  └──────────────────────────────┘ │
└───────────────────────────────────┘
        │
        ▼
  Informed, Empowered Voter 🗳️
```

### Key Logic Decisions

1. **Context-Aware AI Assistant**: The Gemini-powered "Chunav Mitra" bot is given a detailed system prompt covering all major Indian election facts, constitutional articles, ECI procedures, and multilingual response capability. It only answers election-related queries and redirects off-topic questions.

2. **Progressive Disclosure**: Content is organized from simple (What is an election?) → intermediate (Types, Rights) → action-oriented (Registration Wizard) → self-test (Quiz, Game). Users naturally progress through civic education.

3. **Eligibility Logic Engine**: The voter registration wizard runs a decision-tree check (age ≥ 18, Indian citizen, permanent address) before showing registration steps, preventing confusion.

4. **Multilingual via Google Translate**: Real Google Translate API integration lets any page element be read in Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and Urdu — covering 90%+ of Indian voters.

5. **Gamification for Retention**: A timed word-search game and star-rated quiz transform passive learning into active engagement, improving retention of civic knowledge.

---

## ⚙️ How the Solution Works

### Core Sections

| Section | Purpose | Technology |
|---|---|---|
| Hero | First impression + key stats | HTML/CSS animations |
| Election Explainer | Simple analogies for civic concepts | Vanilla JS, IntersectionObserver |
| Timeline | Step-by-step election process | timeline.js, custom render |
| Election Types | Interactive cards with expandable detail | app.js, ARIA roles |
| Registration Wizard | 4-step guided voter registration flow | wizard.js, form validation |
| Rights & Duties | Accordion-based constitutional rights | app.js, tab system |
| Quiz | 15-question knowledge test with scoring | quiz.js, star rating |
| Word Game | Timed election vocabulary word-search | game.js, canvas-free grid |
| AI Chat (Chunav Mitra Bot) | Contextual election Q&A in any language | Gemini 1.5 Flash API |
| Google Translate | Full-page translation | Google Translate Element API |

### Google Services Integrated

1. **Google Translate API** — Real integration via `translate.google.com` element script, enabling 11 Indian language translations of the entire page content
2. **Google Fonts** — Syne + DM Sans for beautiful, readable typography
3. **Google AI Studio (Gemini 1.5 Flash)** — Powers the Chunav Mitra AI assistant with election domain knowledge

### AI Decision Making

The Gemini model is configured with:
- **Domain restriction**: Only answers Indian election / civic / democracy topics
- **Multilingual response**: Detects user's language and responds in kind
- **Knowledge base injection**: System prompt contains all key election facts
- **Safety filters**: Harassment and hate speech blocked at API level
- **Context memory**: Full conversation history sent per turn for coherent dialogue

---

## 📋 Assumptions Made

1. Users have a modern browser (Chrome, Firefox, Safari, Edge) — no IE support needed
2. Users provide their own Gemini API key (free tier from aistudio.google.com) — this avoids server costs and keeps the project within the 1MB repo limit
3. Internet connection is available (for Google Translate + Gemini API calls)
4. The content reflects election rules as of 2024-25; specific CEC names or seat counts may change with government updates
5. The platform is educational-only and explicitly states it is not an official government website
6. Mobile-first design covers the majority of Indian internet users who access via smartphones

---

## 🏗️ Project Structure

```
chunav-mitra/
├── index.html          # Main HTML, semantic structure, ARIA roles
├── css/
│   └── style.css       # Full design system, dark mode, responsive
├── js/
│   ├── app.js          # Core app: election types, rights, theme, nav
│   ├── chat.js         # Gemini AI chatbot with context + history
│   ├── quiz.js         # 15-question adaptive quiz engine
│   ├── wizard.js       # 4-step voter registration wizard
│   ├── game.js         # Word search game with timer
│   └── timeline.js     # Election timeline renderer
└── README.md           # This file
```

---

## 🌟 Features Checklist

- [x] Smart AI assistant (Gemini 1.5 Flash) with domain restriction
- [x] Google Translate integration (11 Indian languages)
- [x] Voter eligibility checker with decision logic
- [x] Interactive election timeline
- [x] 5 election types with expandable detail
- [x] Rights & duties with accordion UI
- [x] 15-question quiz with star ratings & explanations
- [x] Timed election word-search game
- [x] Dark / light mode
- [x] Fully responsive (mobile-first)
- [x] ARIA roles and keyboard navigation throughout
- [x] Skip-to-content accessibility link
- [x] Scroll-reveal animations
- [x] Confetti celebration on quiz completion
- [x] Official ECI, NVSP, and voter portal links

---

## 🔒 Security Considerations

- API key is stored only in the user's browser `localStorage` — never transmitted to any third party or project server
- All external links use `rel="noopener noreferrer"` to prevent tab-napping
- No user data is collected or stored on any server
- Content Security Policy recommended for production deployment
- Gemini safety filters configured to block harmful content

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/virajkvk18/chunav-mitra.git
cd chunav-mitra

# Serve locally (Python)
python -m http.server 8000

# Or use VS Code Live Server extension
# Then open: http://localhost:8000
```

No build step required — pure HTML, CSS, and vanilla JavaScript.

---

## 📊 Impact Potential

- Target audience: 96 crore+ registered Indian voters + future first-time voters
- Languages served: 11 Indian languages via Google Translate
- Content depth: Constitutional articles, ECI procedures, Form 6/8 guidance
- Zero cost to end user: Free to use, free Gemini API tier

---

*Made with ❤️ for Indian Democracy | Not an official government website*
