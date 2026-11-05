# PROBLEX AI – AI-Powered Learning Platform

> **Next-Generation Bilingual Learning Platform for Engineering, College Students, and Government Exam Aspirants in Telugu and English.**

---

## 🌟 Overview & Special Features

Problex AI is designed for:
- **B.Tech Students** (All branches: CSE, ECE, EEE, Mech, Civil, IT) with JNTU, OU, AU, and CBSE semester exam 2-mark, 4-mark, and 8-mark answer formats.
- **College & Intermediate Students** (MPC, BiPC, Degree, Commerce).
- **Government Job Aspirants** (UPSC, SSC CGL/CHSL, IBPS Banking, RRB Railways, APPSC & TSPSC Groups 1, 2, 4).
- **Beginner Programmers** learning Python, Java, C++, and Web Development from scratch.

### ⚡ Our Signature Feature
An **AI Tutor that understands, explains, and breaks down difficult academic topics in both Telugu and English simultaneously**, with exam-ready structures and dry-run code explanations.

---

## 🚀 How to Run the Website Locally

### Method 1: One-Click Startup (Easiest for Beginners)
Simply double-click the **`run_problex.bat`** file located in your project folder:
```
c:\Users\HP\OneDrive\Desktop\problex.ai\run_problex.bat
```
This will automatically launch the development server.

### Method 2: From Terminal / PowerShell
Open your terminal inside this folder and run:
```bash
npm run dev
```

Then open your browser and navigate to:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 📁 Project Structure & Key Files Explained

| File / Folder | Purpose |
|---|---|
| `src/pages/Home.jsx` | The main landing page with hero, live bilingual interactive AI tutor preview, popular tools, categories, and testimonials. |
| `src/pages/AiTutor.jsx` | Full conversational ChatGPT/Gemini-style workspace with Telugu/English selector, 2M/4M/8M answer mode, voice narration, and chat history. |
| `src/pages/StudyTools.jsx` | Complete suite of 10 AI study utilities with interactive launch modals. |
| `src/pages/GovernmentExams.jsx` | Dedicated portal for UPSC, SSC, Banking, Railways, and APPSC/TSPSC with daily bilingual current affairs capsules and mock test quizzes. |
| `src/pages/Dashboard.jsx` | Student Dashboard with streak tracking, exam countdowns, recent chats, and saved notes library. |
| `src/pages/AboutUs.jsx` | Founding story, why bilingual Telugu + English AI education was created, 4 core pillars, and interactive FAQs. |
| `src/pages/Login.jsx` & `Signup.jsx` | Modern authentication screens with student category selection. |
| `src/components/InteractiveHeroTutor.jsx` | The interactive live AI widget on the homepage. |
| `src/components/ToolModal.jsx` | Interactive popup workspace for running all 10 study tools. |
| `src/data/mockData.js` | All preset questions, bilingual Telugu & English answers, daily current affairs, quiz questions, and flashcards. |
| `src/context/AppContext.jsx` | Central state for language preference, active user profile, and saved notes library. |
| `tailwind.config.js` | Custom color themes (Deep Navy Blue `#0A1128`, Purple, Electric Blue). |

---

## ✏️ Simple Instructions for Future Editing

### 1. How to Add New Questions or Telugu Answers
Open `src/data/mockData.js`:
- Find `AI_PRESET_PROMPTS`.
- Add your new subject, question, Telugu explanation, English explanation, or 8-mark exam answer.

### 2. How to Add More Current Affairs or Exam Updates
Open `src/data/mockData.js`:
- Find `DAILY_CURRENT_AFFAIRS`.
- Add today's news with Telugu headline, English headline, and exam significance.

### 3. How to Connect a Real AI Model Later (OpenAI / Gemini / Claude)
Open `src/pages/AiTutor.jsx`:
- Find the `handleSendMessage` function.
- Replace the simulated response timeout with your real `fetch('https://api.openai.com/v1/chat/completions')` or Gemini API call. The frontend state, message history, and audio reader are already completely wired!

---

## 🎨 Technology Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Custom Deep Navy & Electric Violet Theme)
- **Icons:** Lucide React
- **Routing:** React Router v6
- **Typography:** Plus Jakarta Sans & Outfit (Google Fonts)
