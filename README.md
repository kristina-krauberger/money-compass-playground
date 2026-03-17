# Money Compass Playground

A React-based frontend prototype for testing an AI-powered investment recommendation system.

👉 Live Demo: https://money-compass-playground.vercel.app/

---

## Overview

This playground simulates the Money Compass user flow by collecting financial inputs and displaying an AI-generated investment recommendation.

It is designed for rapid prototyping, UI experimentation, and testing the integration between frontend, backend API, and LLM-based responses.

---

## Features

- User input form (age, monthly savings, priorities, investment horizon)  
- Interactive UI for testing recommendation logic  
- API integration with backend service  
- AI-generated investment explanations via LLM  
- Coach-style output (Clara – conversational UX)

---

## Tech Stack

React  
Vite  
Axios  

Backend (external dependency):  
Flask API (Money Compass Service)

AI Integration:  
LLM-based responses  
Prompt engineering  
RAG-style context (portfolio documents)

---

## How It Works

1. User enters financial inputs  
2. Frontend sends a POST request to the backend API  
3. The API processes the input and generates a recommendation  
4. The AI layer returns a human-friendly explanation  
5. The result is displayed in the UI  

---

## API Endpoint

POST `/api/money-compass`

Example request:
```json
{
  "age": 35,
  "monthlySavings": 100,
  "investmentHorizon": "long",
  "priorityReturn": 50,
  "prioritySecurity": 30,
  "priorityLiquidity": 20
}
