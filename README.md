# Selai 🤖📞

> **Your automated AI salesforce.** Scale your outreach without scaling your headcount.

Selai (formerly SalesFlow AI) is an **Agentic Sales Dashboard** that flips the traditional sales model. Instead of humans dialing leads, autonomous AI agents dial multiple leads simultaneously. The AI pre-screens the leads, filters out rejections, and only when a lead expresses genuine interest, triggers a **"Warm Live Transfer"** to a human agent waiting on the dashboard.

## 🚀 The Problem
Traditional outbound sales is broken. Humans waste **90%** of their time listening to dial tones, voicemails, and getting hung up on. It leads to high burnout and low efficiency.

## 💡 The Solution
Selai provides a "Command Center" where one human oversees a squad of AI agents.
1.  **AI Agents Dial:** 4+ bots dial simultaneously.
2.  **Filter Noise:** Bots handle voicemails and "not interested" responses autonomously.
3.  **Detect Intent:** When a prospect shows interest (e.g., "Tell me about pricing"), the bot pauses.
4.  **Warm Transfer:** The human agent gets a pop-up with a summary and takes over the call instantly.

## ✨ Features

*   **Visual Command Center:** Real-time grid view of AI agents (Dialing, Pitching, Listening).
*   **Simulation Engine:** Built-in demo mode mimicking Vapi.ai/Twilio webhooks to demonstrate the workflow without active telephony costs.
*   **Google Gemini Integration:** Uses **Gemini 1.5 Flash** to analyze call transcripts in real-time, generating summaries, sentiment analysis, and suggested closing strategies.
*   **Active Call Workspace:** A dedicated UI for the human agent with CRM data, live transcription, and AI coaching tips.
*   **Landing Page:** A high-conversion entry page explaining the product value.

## 🛠️ Tech Stack

*   **Frontend:** React 19, Vite, TypeScript
*   **Styling:** Tailwind CSS
*   **AI Intelligence:** Google GenAI SDK (`@google/genai`)
*   **Icons:** Lucide React

## 🏁 Getting Started

### Prerequisites
*   Node.js (v18+)
*   A Google Gemini API Key (Get one at [aistudio.google.com](https://aistudio.google.com))

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/selai.git
    cd selai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Key**
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```
    *(Note: The current setup allows `process.env.API_KEY` via Vite's define or environment variable injection).*

4.  **Run the application**
    ```bash
    npm run dev
    ```

## 🎮 How to Use (Demo Mode)

1.  **Launch:** Open the app in your browser. You will see the Landing Page.
2.  **Start Dashboard:** Click "Launch Dashboard".
3.  **Watch the Grid:** The "Simulation Hook" will start cycling the 4 bots through states (Dialing -> Pitching).
4.  **Wait for Transfer:** Eventually, a bot will detect a "Hot Lead" (Simulated).
5.  **Accept Call:** A modal will appear. Click "Accept Transfer".
6.  **Active Workspace:** You are now in the "Live Call". The text on the right is the transcript. The panel on the left shows **Real Gemini Analysis** of that transcript.

## 🗺️ Roadmap

*   [x] Frontend UI & Simulation Logic
*   [x] Google Gemini 1.5 Flash Integration for Summary/Sentiment
*   [ ] **Phase 2:** Backend Node.js Server (Express/FastAPI)
*   [ ] **Phase 2:** WebSockets for real-time state management
*   [ ] **Phase 3:** Integration with Vapi.ai / Retell AI for voice orchestration
*   [ ] **Phase 3:** Twilio SIP Trunking integration

## 📄 License

MIT License.
