Money Compass Playground – Feature Specification

Purpose

This document describes a Playground UI used to test the AI feature Money Compass. It is intended for
experimentation and development only and is not a production application. The interface allows
developers to simulate user inputs and observe AI-generated financial recommendations. No
authentication is required because this interface is purely for local testing. The goal is to test the Money Compass AI recommendation flow independently from the main BuddyFi application.

⸻

Planning process

Before implementing any code:

1. Create a task list for building the React playground.
2. Create an implementation plan explaining how the project will be structured.
3. Wait for confirmation before generating or modifying any code.

⸻

Project structure

Generate the full file structure and code for:
src
 ├─ components
 │   ├─ MoneyCompassForm.jsx
 │   ├─ RecommendationCard.jsx
 │   └─ CoachAvatar.jsx
 ├─ api
 │   └─ moneyCompassApi.js
 ├─ App.jsx
 ├─ App.css
 └─ main.jsx


⸻

Functional requirements

The UI should contain a form with the following inputs:
	•	Age
	•	Monthly savings (€)
	•	Risk tolerance (low / medium / high)
	•	Investment horizon (short / medium / long)

There should be a button:

Generate Recommendation

When clicked:
	1.	The form sends a POST request to
Endpoint:
POST http://localhost:5004/api/money-compass

Example request body:
{
  "age": 35,
  "monthlySavings": 100,
  "riskTolerance": "medium",
  "investmentHorizon": "long"
}

	2.	The backend returns an AI-generated recommendation.
The React playground sends the user inputs to this endpoint and displays the returned recommendation in the UI.
Example response:
{
  "recommendation": "Starting with a €100 monthly ETF investment could be a realistic first step toward building long-term wealth."
}
	3.	The recommendation is displayed below the form.

The backend API already exists and should not be implemented in this project.
Only the frontend playground should be generated.

Use React state to store:
	•	form values
	•	loading state
	•	AI response
	•	error state

⸻

Loading state

When the request is sent, show a friendly loading message:

“Generating your financial compass…”

Include a small animated element such as:
	•	a spinning icon
	•	a subtle animation
	•	or a playful loading indicator

The UI should feel alive and interactive.

⸻

Error handling

If the API call fails, display a simple message such as:

“Something went wrong while generating your recommendation. Please try again.”

⸻

Coach Character

The AI recommendation should be delivered by a friendly coach:
Clara – your Money Compass Coach

The CoachAvatar component should display a circular avatar image of a friendly female financial coach.
A placeholder image is acceptable (no real images required).

Example:
Hi, I'm Clara, your Money Compass Coach.
Based on your inputs, starting with a €100 monthly ETF investment could be a realistic first step toward
building long-term wealth.

Tone:
• friendly
• calm
• supportive
• trustworthy

⸻

UI / Design style

The UI should feel friendly, calm, and motivating, inspired by apps like Duolingo and Headspace.

Design traits:
	•	rounded cards
	•	soft shadows
	•	warm colors
	•	light greens / teal / soft blue
	•	lots of whitespace
	•	centered layout
	•	modern, friendly typography

The layout should look like:
Money Compass
Find your personal starting point for investing.
[Form Card]
[Generate Recommendation Button]
[Coach Recommendation Card]

⸻

Code style
	•	use functional React components
	•	keep the code simple and readable
	•	avoid unnecessary libraries
	•	keep styling inside App.css
	•	include comments explaining key parts of the code

⸻

Output format

Provide:
	1.	the folder structure
	2.	the code for each file
	3.	clear separators between files

⸻

Do not add unnecessary complexity.
Keep the project small and beginner-friendly.

