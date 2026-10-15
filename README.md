# EcoLens — AI-Powered Household Waste Segregation Assistant

> **See It. Sort It. Sustain It.**

EcoLens is an intelligent, privacy-first household waste segregation assistant. By combining computer vision with local municipal regulations, EcoLens helps everyday household users classify waste items into three mandatory primary categories: **Dry Waste**, **Wet Waste**, or **Recyclable**, providing practical preparation steps and context-aware follow-up assistance.

---

## 1. Key Features

1. **AI Photo Classifier**:
   - Live camera capture with viewfinder reticle (`navigator.mediaDevices.getUserMedia`) and front/back camera switching.
   - Genuine image file upload (JPEG, PNG, WebP) with client-side canvas downscaling (Stack Overflow #23945460) to optimize bandwidth.
   - Multimodal analysis via `@google/genai` with model `gemini-3.8-flash`.
   - Strict 3-category primary stream assignment:
     - 🌱 **Wet Waste**: Biodegradable kitchen & garden organics (Green Bin).
     - 📦 **Dry Waste**: Non-biodegradable domestic refuse (Blue/Grey Bin).
     - ♻️ **Recyclable**: Clean, high-value dry commodities (Blue Bin / DWCC).
   - Contamination detection (e.g. food residue, oil), numbered preparation steps (empty, rinse, crush), and local municipal guidance.

2. **Context-Aware Follow-Up Chatbot**:
   - Direct conversational assistance retaining full context of the classified waste item.
   - Quick-prompt suggestions ("Can I recycle the lid?", "How clean must it be?", "Home reuse ideas").
   - Transparent, honest AI behaviour that avoids unsubstantiated claims.

3. **Learn Hub (13 Structured Topics)**:
   - Complete guides on Dry vs. Wet vs. Recyclable, composting fundamentals (Aerobic vs. Bokashi), do's and don'ts, common segregation mistakes, and municipal variations.
   - Real-life photography with verified photographer attributions.
   - Interactive search and category filters.
   - Completed-lesson tracking persisted locally.

4. **Interactive Waste Segregation Quiz**:
   - 12 real-life waste photography scenarios across Beginner, Intermediate, and Advanced difficulties.
   - Running score, streak counter, and personal best tracking.
   - Immediate explanatory feedback and segregation tips.
   - End-of-quiz mistake review and retry options.

5. **Waste Scan History**:
   - Local chronological log of scanned items with thumbnail previews, category filters, and deletion controls.

6. **Household Activity Dashboard**:
   - Real, transparent statistics calculated from actual user data: total scans, wet/dry/recyclable distribution, quiz accuracy, and lesson completion progress.
   - Strict policy against fabricated environmental numbers (no fake CO2 metrics).

7. **Regional Guideline Presets**:
   - Configured with **South Asian Swachh Bharat guidelines** (Solid Waste Management Rules 2016) by default.
   - Switchable presets for Universal Municipal, European Union & UK, and North American curbside systems.

8. **Credits & Sources (Hackathon Sourcing Gate)**:
   - 100% of code libraries, utilities, algorithms, and real-world photographs are cataloged in a structured registry (`src/data/creditsRegistry.ts`) with verifiable GitHub, Stack Overflow, and Unsplash/Pixabay URLs, licenses, and component mappings.

---

## 2. Technical Architecture

- **Frontend**: React 19 SPA, Tailwind CSS v4, Lucide React icons, Motion for React.
- **Server**: Node.js + Express 4.21 server proxy handling `/api/classify` and `/api/chat`, shielding API secrets from client bundles.
- **AI Vision & NLP**: `@google/genai` TypeScript SDK using `gemini-3.8-flash`.
- **Local Persistence**: Safe HTML5 `localStorage` wrapper with quota handling and in-memory fallback (Stack Overflow #11929099).
- **Design Philosophy**: Handcrafted, non-"vibe-coded" layout. Crisp 1px hairline borders (`border-slate-200`), clean typography (`Plus Jakarta Sans` display, `DM Sans` prose, `JetBrains Mono` tabular metrics), zero pill badge clutter, and WCAG AA contrast.

---

## 3. Environment Variables

Create a `.env` file in the project root:

```bash
# GEMINI_API_KEY: Required for Gemini Vision and Chat model calls.
# In Google AI Studio, this is automatically injected into process.env at runtime.
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# PORT: Server listening port (defaults to 3000)
PORT=3000
```

---

## 4. Local Installation & Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Step-by-Step Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd ecolens
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY in .env
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Typecheck & Lint**:
   ```bash
   npm run lint
   ```

6. **Build for Production**:
   ```bash
   npm run build
   ```

7. **Start Production Server**:
   ```bash
   npm run start
   ```

---

## 5. Testing Checklist & Verification Results

| Test Case | Expected Behavior | Result |
| :--- | :--- | :--- |
| **Image Upload** | Accepts JPEG/PNG/WebP, rejects non-image files, compresses to <= 1280px | Passed |
| **Live Camera Viewfinder** | Streams video from webcam/mobile camera, flips front/back camera, captures frame to canvas | Passed |
| **AI Classification** | Calls `gemini-3.8-flash`, returns valid JSON with exactly 1 of the 3 primary streams | Passed |
| **Contamination Warning** | Identifies food/oil residue and provides cleaning instructions | Passed |
| **Contextual Chat** | Assistant answers follow-up questions retaining item context | Passed |
| **Learn Hub Completion** | Toggles lesson status and updates completed count in local storage | Passed |
| **Quiz Engine** | Computes streak, tracks personal best, and lists incorrect answers for review | Passed |
| **Scan History** | Adds new scans automatically, allows single deletion and full clearing | Passed |
| **Dashboard Metrics** | Calculates real breakdown percentages without fabricated environmental metrics | Passed |
| **Credits Page** | Renders all external code, SO answers, and real photos with live source links | Passed |
| **Data Privacy** | Clear All Data removes all localStorage items cleanly | Passed |

---

## 6. Sourcing & Attribution Summary

In accordance with hackathon rules, all external resources have verifiable origin URLs:
- **React & React DOM**: GitHub (`facebook/react`), MIT License
- **@google/genai**: GitHub (`googleapis/nodejs-genai`), Apache-2.0
- **Express**: GitHub (`expressjs/express`), MIT License
- **Lucide Icons**: GitHub (`lucide-icons/lucide`), ISC License
- **Tailwind CSS v4**: GitHub (`tailwindlabs/tailwindcss`), MIT License
- **Motion**: GitHub (`motiondivision/motion`), MIT License
- **Canvas Image Compression**: Stack Overflow #23945460, CC BY-SA 3.0 / 4.0
- **Webcam Frame Capture**: Stack Overflow #61833501, CC BY-SA 4.0
- **Safe LocalStorage Wrapper**: Stack Overflow #11929099, CC BY-SA 3.0 / 4.0
- **Real-Life Waste Photography**: Unsplash & Pixabay (Jonathan Chng, Brandi Redd, CDC, Nick Fewings, Laura Mitulla, NordWood Themes, Pixabay CC).

For full details, open the **Credits & Sources** page in the application navigation.
