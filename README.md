# 🧠 THINKR AI — The Future of Intelligence

Welcome to **THINKR AI**! ⚡ A next-generation, premium AI-powered study assistant and intelligence platform designed to optimize your cognitive workflows. THINKR AI solves the problem of unstructured learning by transforming simple lists of subjects and time parameters into structured, time-blocked schedules, paired with a context-aware chat assistant that supports your learning journey in real-time.

---

## 📖 Table of Contents
* [🚀 Overview](#-overview)
* [✨ Key Features](#-key-features)
* [💻 Technology Stack](#-technology-stack)
* [🏗️ Project Architecture](#%EF%B8%8F-project-architecture)
* [📁 Folder Structure](#-folder-structure)
* [🔧 Installation & Setup](#-installation--setup)
* [⚙️ Configuration](#%EF%B8%8F-configuration)
* [💡 How to Use](#-how-to-use)
* [🧩 Code Breakdown](#-code-breakdown)
* [📡 API & Integrations](#-api--integrations)
* [🛡️ Security Notes](#%EF%B8%8F-security-notes)
* [🔮 Future Enhancements](#-future-enhancements)
* [🤝 Contributing](#-contributing)
* [💖 Thank You](#-thank-you)

---

## 🚀 Overview
**THINKR AI** is an elegant, dark-themed productivity web application built to streamline everyday learning workflows. By balancing intensive focus intervals with structured rest phases, it helps users maximize information retention and prevent cognitive burnout. The application is supported by an active AI agent widget, **THINKR Core**, which analyzes your current screen and provides interactive tips and learning breakdowns.

---

## ✨ Key Features
* **📅 AI Study Plan Generator:** Instantly builds an hourly, chronological roadmap out of user-submitted subjects, complete with built-in 15-minute *"Rest & Consolidation"* blocks.
* **🤖 THINKR Core AI Assistant:** A persistent chat widget built directly into the UI. It uses context-aware logic to greet you differently depending on the active page, delivering responses parsed with a custom Markdown-to-HTML formatter.
* **🔑 Integrated User Authentication:** Register, log in, and log out securely using Supabase authentication.
* **📊 Analytics Dashboard:** Displays user streak metrics, membership status (Free Tier), total generated plans, and loads active timelines directly from browser cache.
* **🎨 Glassmorphic Dark UI:** Premium design architecture leveraging vibrant HSL glow backdrops, interactive hover triggers, scaling neon elements, and fluid CSS timeline loaders.

---

## 💻 Technology Stack
* **Frontend:**
  * **HTML5:** Semantic architecture layout.
  * **Vanilla CSS3:** Custom layout system utilizing dark mode palettes, glassmorphism, responsive grids, and neon elements.
  * **Vanilla JavaScript (ES6+):** Component scripting, dynamic DOM mapping, local state handling, and third-party script integrations.
  * **Supabase Client SDK:** Leverages CDN-loaded `@supabase/supabase-js@2` for auth and DB records.
* **Backend:**
  * **Flask (Python):** Micro-framework serving HTML views and static assets.
* **AI Engine:**
  * **Groq API:** Interacts with the ultra-fast `llama-3.1-8b-instant` LLM model.
* **Database & BaaS:**
  * **Supabase:** Remote hosting for user registration and database storage.

---

## 🏗️ Project Architecture
The project is built around a lightweight Flask server serving a highly interactive, API-driven client-side application:

* **Serving Layer:** Flask routes templates directly to endpoints.
* **Integration Layer:** Client-side JavaScript makes direct calls to Supabase (Auth and Database storage) and Groq (LLM completions).
* **Caching Layer:** Utilizes local storage cache (`localStorage`) to synchronize performance statistics and plan timelines instantly between screen views.

---

## 📁 Folder Structure
```
THINKR_AI/
├── .vscode/
│   └── launch.json            # VSCode launch setup for Chrome debugging
├── static/
│   ├── images/
│   │   ├── hero.png           # Hero illustration assets
│   │   └── schedule.png       # Timeline illustration assets
│   ├── script.js              # Application logic, animations, and Chat UI
│   ├── style.css              # Dark theme styling, grids, and timeline CSS
│   └── supabase-config.js     # Supabase client credentials initialization
├── templates/
│   ├── index.html             # Homepage / Hero view
│   ├── profile.html           # User dashboard & statistics page
│   ├── signup.html            # Registration & login switcher
│   └── study-plan.html        # Plan configuration and scheduler UI
├── app.py                     # Python Flask routing server
└── requirements.txt           # Python dependency specifications
```

---

## 🔧 Installation & Setup

### Prerequisites
* Python 3.8+
* A modern web browser
* A Supabase project and a Groq API Key

### Configuration
1. **Clone the repository:**
   ```bash
   git clone https://github.com/SriniwasAwasthi/THINKR_AI.git
   cd THINKR_AI
   ```

2. **Install requirements:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure credentials:**
   * Open `static/supabase-config.js` and input your keys:
     ```javascript
     const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
     const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_PUBLIC_KEY';
     ```
   * Open `static/script.js` and update line 141 with your Groq credentials:
     ```javascript
     const OPENAI_API_KEY = 'YOUR_GROQ_API_KEY_HERE';
     ```

4. **Launch the platform:**
   ```bash
   python app.py
   ```
   Open `http://localhost:3000` in your browser.

---

## ⚙️ Configuration
* **`app.py`:** Configures debugging on port `3000`.
* **`supabase-config.js`:** Initializes `supabase` via the window object, exporting the `getCurrentUser` session query handler.
* **`requirements.txt`:** Installs `Flask==3.0.0` and `Werkzeug==3.0.0`.

---

## 💡 How to Use
1. **Create an Account:** Go to the **Sign Up** tab. Toggle the view to log in or create a user.
2. **Generate a Plan:** On the **Study Plan** screen, enter your subjects (separated by commas) and select your target hours. Click **Generate AI Plan** to preview your custom chronological schedule.
3. **Check the Dashboard:** Head to the **Profile** screen to see your streak records, active plans, and stats.
4. **Chat with THINKR Core:** Tap the floating bubble in the bottom right corner of any page. Ask questions, request study recommendations, or resolve academic topics.

---

## 🧩 Code Breakdown
* **`app.py`:** Simple routing configurations directing client requests to target HTML templates.
* **`static/script.js`:** 
  * Controls landing page animations (blur, scaling, interactive hovering) and navigations.
  * Manages the floating chatbot widget, handles context-based greetings, maps input submissions, communicates with Groq, and renders markdown features safely.
* **`templates/study-plan.html` & `profile.html` scripts:** Split input strings into calculated time units, cache objects locally, sync active user data, and output chronological timeline cards on user dashboards.

---

## 📡 API & Integrations

### 1. Groq API
* **Endpoint:** `https://api.groq.com/openai/v1/chat/completions`
* **Method:** `POST`
* **Payload:** Uses the `llama-3.1-8b-instant` model to stream or display answers.

### 2. Supabase SDK
* **Endpoint:** Projects communicate directly with the database schemas (`study_plans` table) and handle credential configurations client-side.

---

## 🛡️ Security Notes
* **API Key Exposure:** Keys are defined directly inside client scripts (`static/script.js` and `supabase-config.js`). It is highly recommended to redirect these headers through backend API routes for public staging production.
* **Input Injection Protection:** User text outputs are securely loaded into the DOM using `textContent` instead of `innerHTML` to block potential cross-site scripting (XSS) vulnerabilities.

---

## 🔮 Future Enhancements
* **🔒 Secure Proxy Endpoint:** Relocate keys to a backend server configuration to prevent public client exposure.
* **📂 Multiple Saved Schedules:** Expand database support to store, retrieve, and delete historical learning plans.
* **🔔 Smart Notifications:** Integrate audio cues or push notifications to alert users when a focus session or break begins.

---

## 🤝 Contributing
Feedback, issues, and contributions are always welcome!
1. Fork this repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 💖 Thank You
Thank you so much for visiting the THINKR AI repository! 🧠 We appreciate you taking the time to explore this project and inspect its architecture. Your interest, support, and feedback are incredibly valuable to us. We hope this tool provides structure and focus to your studies, helping you optimize your cognitive potential every single day! 🚀
