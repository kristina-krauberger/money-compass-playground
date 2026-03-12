import React, { useState } from 'react';

/**
 * MoneyCompassForm Component
 * Collects user inputs for age, savings, risk tolerance, and horizon.
 * 
 * @param {function} onSubmit - Function called with form data when submitted
 * @param {boolean} isLoading - Disables the form while loading
 */
function MoneyCompassForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    age: 35,
    monthlySavings: 100,
    riskTolerance: 'medium',
    investmentHorizon: 'long'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = (name === 'age' || name === 'monthlySavings') ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="age">Alter</label>
        <input 
          type="number" 
          id="age" 
          name="age" 
          value={formData.age} 
          onChange={handleChange}
          disabled={isLoading}
          min="18"
          max="120"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="monthlySavings">Monatliche Sparrate (€)</label>
        <input 
          type="number" 
          id="monthlySavings" 
          name="monthlySavings" 
          value={formData.monthlySavings} 
          onChange={handleChange}
          disabled={isLoading}
          min="0"
          step="10"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="riskTolerance">Risikobereitschaft</label>
        <select 
          id="riskTolerance" 
          name="riskTolerance" 
          value={formData.riskTolerance}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="low">Niedrig</option>
          <option value="medium">Mittel</option>
          <option value="high">Hoch</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="investmentHorizon">Anlagehorizont</label>
        <select 
          id="investmentHorizon" 
          name="investmentHorizon" 
          value={formData.investmentHorizon}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="short">Kurz</option>
          <option value="medium">Mittel</option>
          <option value="long">Lang</option>
        </select>
      </div>

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? 'Wird erstellt...' : 'Empfehlung generieren'}
      </button>
    </form>
  );
}

export default MoneyCompassForm;
