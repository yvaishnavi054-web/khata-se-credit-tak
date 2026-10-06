# Khata se Credit Tak

**Your voice. Your khata. Your next step.**
*Built by RootAccess · SHE SOLVES 3.0*

A voice-first financial record and credit-readiness platform helping women micro-entrepreneurs organise business records, understand profit, and discover their next financial steps.

## Problem Statement
Women micro-entrepreneurs (tiffin-service owners, tailors, home bakers, etc.) often do not maintain proper written business records. Their daily sales and expenses are remembered rather than documented due to typing barriers, language barriers, and complex existing accounting applications. As a result, they lack organized income proofs when approaching banks or government schemes.

## Solution
**Khata se Credit Tak** solves this by offering a voice-first ledger in regional languages (Hindi/Marathi).
* **SPEAK**: Tell the app your daily sales and expenses naturally.
* **RECORD & CONFIRM**: The app extracts structured data. You confirm it.
* **UNDERSTAND**: See automated profit and margin calculations.
* **BUILD HISTORY**: Generate a 3-month Credit-Readiness Summary.
* **ACCESS**: Match with government schemes (MUDRA, PMEGP) and prepare documents.

## Tech Stack
* **Frontend**: React, Vite, TypeScript, Tailwind CSS, React Router, Recharts, Lucide React
* **Backend**: FastAPI (Python), Supabase (PostgreSQL)
* **AI/Speech**: Web Speech API / Whisper (Speech-to-Text), Gemini API (Transaction Parsing)

## Project Structure
* `/frontend`: The React application.
* `/backend`: The FastAPI server.

## Setup Instructions

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn pydantic python-dotenv google-generativeai
uvicorn main:app --reload
```

### 3. Environment Variables
Copy `.env.example` to `.env` in both `frontend` and `backend` directories and fill in the required API keys (Gemini, Supabase).

## Demo Mode
If APIs or backend are unavailable during the presentation, the frontend automatically falls back to a highly realistic **Demo Mode**. Clicking "Try Demo" on the landing page will log you in as "Meena Tai", populate 3 months of realistic business data, and simulate the voice parsing engine so the complete user journey can be evaluated seamlessly.

## Disclaimer
This platform organizes business records and provides guidance. It is **NOT** a credit score, does **NOT** guarantee a loan, and scheme eligibility must be verified on official portals.
