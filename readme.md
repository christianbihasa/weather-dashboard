# Weather Analytics Dashboard

A high-fidelity, responsive climate observation workspace built with **React**, **Tailwind CSS**, and **Recharts**. The system leverages a secure **Node.js/Express** backend proxy server to interact with the **OpenWeather API** and features a production-resilient hybrid architecture designed to gracefully handle rate limits and network drops.

**Live Demo:** [View Live Deployment](https://christianbihasa.github.io/weather-dashboard/)

---

## Key Features

* **Smart Hybrid Architecture (API Fallback Mode):** Built with production-grade error boundaries. If the OpenWeather API key hits rate limits (`429`), authorization issues (`401`), or structural network drops, the client interceptor automatically switches to a high-fidelity local mock dataset (`MOCK_CITIES`) and updates the UI header with a `DEMO MODE` alert banner seamlessly.
* **Optimized Data Visualization:** Displays a 5-day climate forecast downsampled from cluttered 3-hour chunks into elegant **12-hour macro-trend intervals** using a customized Recharts `AreaChart` with gradient fills, custom dashed vertical cursors, and explicit precision tooltips.
* **Interactive Weather Globe:** Integrates an interactive 3D WebGL globe component that programmatically targets, rotates, and locks onto the exact coordinates (`lat`, `lon`) of the active query destination.
* **One-Click Geolocation UI:** Requests native browser coordinate streams to render hyper-local data instantly, featuring an automated routing fallback to a default tracking node if access is denied.
* **Fluid Fluid Layouts:** Structured explicitly with dynamic layouts pinned to viewport boundaries (`lg:h-screen lg:overflow-hidden`) alongside tailored bone skeleton placeholders to neutralize layout shifts during network latency phases.

---

## Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React (Hooks, Context, Functional Components), Vite, Tailwind CSS |
| **Data Viz** | Recharts (Area, Tooltip, ResponsiveContainer), WebGL (Globe Canvas) |
| **Backend Proxy** | Node.js, Express, Cors, Dotenv |
| **API Source** | OpenWeatherMap API (Current Weather & 5-Day/12-Hour Forecast) |
| **Deployment** | GitHub Actions / Pages (Frontend), Render (Secure Backend) |

---

## Repository Architecture

This project is organized as a unified monorepo containing both decoupled layers:

```text
weather-app-suite/
├── backend/            # Express Proxy Server
│   ├── server.js       # Secured routing layer endpoints
│   └── .env            # Private API Token configs (git-ignored)
└── frontend/           # Vite + React UI Application
    ├── src/
    │   ├── components/ # Modular UI (Globe, Chart, Skeletons, Cards)
    │   ├── services/   # Fetch client pipelines
    │   └── utils/      # High-fidelity mock backup nodes
    └── vite.config.js

```

---

## Getting Started

### Prerequisites

* Node.js (v18.x or higher)
* npm (v9.x or higher)
* An OpenWeatherMap API Key

### 1. Clone the Workspace

```bash
git clone https://github.com/christianbihasa/weather-dashboard.git
cd weather-app-suite

```

### 2. Configure the Backend Proxy

Navigate to the backend directory, install packages, and set up your private environment variables:

```bash
cd backend
npm install

```

Create a `.env` file in the root of the `backend/` directory:

```env
PORT=5000
OPENWEATHER_API_KEY=your_actual_openweather_api_key

```

Start the local proxy gateway server:

```bash
node server.js

```

### 3. Launch the Frontend UI

Open a secondary terminal window, navigate to the frontend directory, install dependencies, and boot the Vite development engine:

```bash
cd ../frontend
npm install
npm run dev

```

Open your browser to `http://localhost:5173/weather-dashboard/` to interact with the environment.