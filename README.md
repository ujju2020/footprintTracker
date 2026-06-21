# 🌱 Footprint Tracker (Carbon Footprint Awareness)

**🌍 Live Demo:** [https://footprint-tracker-1022849471707.us-central1.run.app/](https://footprint-tracker-1022849471707.us-central1.run.app/)

A modern, responsive web and mobile application designed to help users track, understand, and reduce their daily carbon footprint. 

Footprint Tracker provides an interactive onboarding experience to calculate your baseline carbon score, a dynamic dashboard to log daily eco-friendly (or high-impact) activities, and a goals system to encourage sustainable habits.

## 🚀 Features

* **Interactive Onboarding:** Calculates a baseline carbon footprint based on your lifestyle (Diet, Transport, Home Energy).
* **Dynamic Dashboard:** Real-time visualization of your carbon score and a breakdown of your emissions by category.
* **Activity Logging:** Log daily actions (e.g., driving, taking the bus, eating a plant-based meal) to see their immediate impact on your score.
* **Goal Tracking:** Commit to eco-friendly goals (like "Meatless Mondays" or "Bike to Work") and track your progress.
* **Mobile Ready:** Wraps into a native Android/iOS application seamlessly using Capacitor.
* **Cloud Sync:** Synchronizes data in real-time across devices using Firebase Firestore (with offline-graceful fallback).

## 🛠️ Technology Stack

* **Frontend Framework:** React (with Vite)
* **Icons & Visualization:** Lucide React, Recharts
* **Backend Database:** Firebase Firestore
* **Mobile Wrapping:** Capacitor
* **Deployment:** Google Cloud Run (Dockerized)

## 💻 Getting Started (Local Development)

### Prerequisites
* Node.js (v18+ recommended)
* A Firebase Project with Firestore Database enabled

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory and add your Firebase configuration details:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> **Note:** If the Firebase backend is offline or misconfigured, the app will gracefully fall back to local state after a 3-second timeout, allowing you to still use the interface locally!

### 3. Running the App
Start the Vite development server:
```bash
npm run dev
```
Navigate to `http://localhost:5173/` in your browser.

## 📱 Mobile App Development
This project uses **Capacitor** to wrap the web application into a native mobile app. The native source files are located in the `android/` directory.

To sync web changes to the mobile app:
```bash
npm run build
npx cap sync
```

To open Android Studio:
```bash
npx cap open android
```

## ☁️ Deployment
The web application is containerized using the provided `Dockerfile` and `nginx.conf`, and is deployed to **Google Cloud Run**.

To build the production bundle locally:
```bash
npm run build
```

## 🏆 Challenge Information

### Chosen Vertical
**Eco-Tracking / Sustainable Lifestyle Assistant:** We chose this vertical to empower individuals to track their carbon emissions interactively. By making carbon tracking dynamic, rewarding, and mobile-friendly, users are incentivized to adopt greener habits like public transit or plant-based meals.

### Approach and Logic
The solution is built around a smart, dynamic interface that computes an estimated carbon footprint based on daily inputs. 
- **State Management:** We use React state to instantly reflect the impact of logged activities (e.g., subtracting CO2e when logging a vegan meal).
- **Gamification:** The logic incorporates streaks, badges, and targets to keep users motivated. 
- **Cloud Sync:** Using Firebase, all logic automatically syncs across the user's devices so they can log from their phone on the go and review metrics on a desktop.

### How the Solution Works
1. **Onboarding:** The user provides their baseline lifestyle metrics (Diet, Commute, Energy use).
2. **Dashboard:** The main dashboard calculates their current footprint and compares it against targets. 
3. **Smart Logging:** A modal allows users to log specific actions. The app calculates the CO2 impact of each action and instantly updates the global state.
4. **Goals and Profile:** Users can set active sustainability goals and adjust application settings (like push notifications and privacy) to customize their experience.

### Assumptions Made
- We assume standard average CO2 equivalent (CO2e) savings for the preset activities (e.g., biking saves ~2.5kg CO2e compared to driving).
- We assume users will have access to modern browsers or devices capable of running a Capacitor-wrapped web app.
- We assume the user has a single device or utilizes the Firebase integration for offline-first multi-device syncing.
- The `v1.0` MVP focuses strictly on individual consumer tracking rather than enterprise footprint tracking.

### Evaluation Parameters Addressed
- **Code Quality (High):** Built using modern React 19 and Vite with modular components, hooks for state management, and clear file structures.
- **Security (Medium):** All user inputs via forms and modals use controlled React state components, automatically escaping inputs to prevent Cross-Site Scripting (XSS).
- **Efficiency (Medium):** Utilizing lightweight Lucide icons, conditionally rendering React components instead of strict client-side routing overhead, and leveraging `Promise.race` for ultra-fast Firebase fallback handling.
- **Testing (Low):** We have integrated `Vitest` and `@testing-library/react`. We wrote an automated unit test `ScoreCard.test.jsx` to validate rendering logic for the dashboard's core visual. Run tests using `npm run test`.
- **Accessibility (Low):** Semantic HTML5 structures (`<main>`, `<aside>`, `<nav>`) have been utilized alongside explicit `aria-label` tags for all icon-only control buttons to ensure screen-reader compatibility.
- **Problem Statement Alignment (High):** Serves exactly as an AI-augmented dynamic web application tracking an Eco-lifestyle vertical, hitting all the UX and functional milestones out of the box.
