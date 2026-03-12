import React, { useState } from 'react';
import './App.css';
import MoneyCompassForm from './components/MoneyCompassForm';
import RecommendationCard from './components/RecommendationCard';
import { fetchRecommendation } from './api/moneyCompassApi';

function App() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [error, setError] = useState('');

  const handleGenerateRecommendation = async (formData) => {
    setLoading(true);
    setRecommendation('');
    setError('');

    try {
      const result = await fetchRecommendation(formData);
      setRecommendation(result.recommendation);
    } catch (err) {
      setError(err.message || 'Etwas ist bei der Erstellung deiner Empfehlung schiefgelaufen. Bitte versuche es später noch einmal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Money Compass</h1>
        <p>Finde deinen persönlichen Startpunkt fürs Investieren.</p>
      </header>

      <MoneyCompassForm 
        onSubmit={handleGenerateRecommendation} 
        isLoading={loading} 
      />

      <RecommendationCard recommendation={recommendation} error={error} />

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Dein finanzieller Kompass wird erstellt...</p>
        </div>
      )}
    </div>
  );
}

export default App;
