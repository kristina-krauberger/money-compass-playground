# Money Compass Playground

A small React playground used to test the **Money Compass AI recommendation feature**.

This project provides a simple UI where a user can enter financial inputs and receive an AI-generated investment recommendation from a backend API.

The playground exists **only for development and experimentation** and is not intended as a production application.

---

# Purpose

The goal of this project is to isolate and test the **Money Compass recommendation flow** independently from the main BuddyFi application.

It allows developers to:

- simulate user inputs
- send requests to the Money Compass API
- visualize the returned AI recommendation
- experiment with UI concepts for the future BuddyFi experience

---

# Tech Stack

Frontend

- React
- Vite

Backend (external dependency)

- Flask API
- Endpoint: `/api/money-compass`

Development

- Antigravity AI used for rapid UI scaffolding and component generation

---

# Project Structure
src
├─ components
│ ├─ MoneyCompassForm.jsx
│ ├─ RecommendationCard.jsx
│ └─ CoachAvatar.jsx
│
├─ api
│ └─ moneyCompassApi.js
│
├─ App.jsx
├─ App.css
└─ main.jsx

---

# Features

The playground UI contains:

Form inputs

- Age
- Monthly savings
- Risk tolerance
- Investment horizon

User flow

1. User enters financial inputs
2. Clicks **Generate Recommendation**
3. The app sends a request to the backend API
4. The API returns an AI-generated recommendation
5. The recommendation is displayed by the **Money Compass Coach**

---

# API Endpoint

The frontend sends a POST request to:
http://localhost:5004/api/money-compass

Example request:
{
“age”: 35,
“monthlySavings”: 100,
“riskTolerance”: “medium”,
“investmentHorizon”: “long”
}

Example response:
{
“recommendation”: “Starting with a €100 monthly ETF investment could be a realistic first step toward building long-term wealth.”
}

---

# Coach Character

Recommendations are presented by:

**Clara — the Money Compass Coach**

A friendly financial guide designed to make investment advice feel approachable and supportive.

---

# Running the Project

1. Clone the repository
git clone 

2. Install dependencies
npm install

3. Start the development server
npm run dev

The playground will run at:
http://localhost:5173

---

# Backend Requirement

The Money Compass API must be running locally.

Example: 
Flask API running on port 5004

Endpoint:
POST /api/money-compass

---

# Development Process

This project was partially developed using **Antigravity AI** to accelerate UI prototyping.

AI was used to:

- scaffold React components
- generate the initial project structure
- assist with rapid UI iteration

Architecture decisions, API design, and final implementation were reviewed and adjusted manually.

---

# Specifications

The functional specification and AI prompt used to generate the playground are stored in the `/docs` directory.

Feature specification
docs/feature-spec.md

AI generation prompt
docs/ai-prompt.md

These documents describe the intended behavior of the playground and the development workflow.

---

# Status

Current state:

Development playground for testing the Money Compass AI recommendation flow.

Future integration:

BuddyFi platform.