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
