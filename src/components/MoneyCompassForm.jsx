import React, { useState, useRef } from 'react';
import './MoneyCompassForm.css';

/**
 * MoneyCompassForm Component
 * Collects user inputs for age, savings, risk tolerance, and horizon.
 * 
 * @param {function} onSubmit - Function called with form data when submitted
 * @param {boolean} isLoading - Disables the form while loading
 */
function MoneyCompassForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    age: 0,
    monthlySavings: 0,
    priorityReturn: 0,
    prioritySecurity: 0,
    priorityLiquidity: 0,
    investmentHorizon: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = (name === 'age' || name === 'monthlySavings') ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handlePriorityChange = (name, value) => {
    const round5 = (v) => Math.round(v / 5) * 5;
    const numValue = Math.max(0, Math.min(100, round5(Number(value))));
    setFormData((prev) => {
      let newReturn = prev.priorityReturn;
      let newSecurity = prev.prioritySecurity;
      let newLiquidity = prev.priorityLiquidity;

      if (name === 'priorityReturn') {
        newReturn = numValue;
        const remaining = 100 - newReturn;
        newSecurity = round5(remaining / 2);
        newLiquidity = 100 - newReturn - newSecurity;
      } else if (name === 'prioritySecurity') {
        newSecurity = Math.min(numValue, 100 - newReturn);
        newLiquidity = round5(100 - newReturn - newSecurity);
      } else if (name === 'priorityLiquidity') {
        newLiquidity = Math.min(numValue, 100 - newReturn);
        newSecurity = round5(100 - newReturn - newLiquidity);
      }

      // Safeguards
      if (newReturn < 0) newReturn = 0;
      if (newSecurity < 0) newSecurity = 0;
      if (newLiquidity < 0) newLiquidity = 0;

      return {
        ...prev,
        priorityReturn: newReturn,
        prioritySecurity: newSecurity,
        priorityLiquidity: newLiquidity
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const draggingBar = useRef(null);

  const valueFromPointer = (e, trackEl) => {
    const rect = trackEl.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(100, Math.round(ratio * 100 / 5) * 5));
  };

  const handlePointerDown = (name, e) => {
    if (isLoading) return;
    e.preventDefault();
    const trackEl = e.currentTarget;
    trackEl.setPointerCapture(e.pointerId);
    draggingBar.current = { name, trackEl };
    handlePriorityChange(name, valueFromPointer(e, trackEl));

    const onMove = (moveEvt) => {
      handlePriorityChange(name, valueFromPointer(moveEvt, trackEl));
    };
    const onUp = () => {
      draggingBar.current = null;
      trackEl.removeEventListener('pointermove', onMove);
      trackEl.removeEventListener('pointerup', onUp);
    };
    trackEl.addEventListener('pointermove', onMove);
    trackEl.addEventListener('pointerup', onUp);
  };

  return (
    <>
      <form className="card compact-form" onSubmit={handleSubmit}>
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
          <label htmlFor="investmentHorizon">Anlagehorizont</label>
          <select 
            id="investmentHorizon" 
            name="investmentHorizon" 
            value={formData.investmentHorizon}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="" disabled>Bitte wählen</option>
            <option value="kurzfristig">Unter 5 Jahre</option>
            <option value="mittelfristig">5 bis 10 Jahre</option>
            <option value="langfristig">Über 10 Jahre</option>
          </select>
        </div>

        <div className="form-group priority-section">
          <p className="priority-title">
            Deine Investment-Prioritäten
          </p>
          <p className="priority-subtitle">
            Was ist dir beim Investieren am wichtigsten?<br />
            Verteile 100 % auf diese drei Prioritäten.
          </p>

          <div className="bar-row">
            <span className="bar-label">Rendite</span>
            <div
              className={`priority-bar-track${isLoading ? ' disabled' : ''}`}
              onPointerDown={(e) => handlePointerDown('priorityReturn', e)}
              role="slider"
              aria-label="Rendite"
              aria-valuenow={formData.priorityReturn}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="priority-bar-fill" style={{ width: `${formData.priorityReturn}%` }} />
            </div>
            <span className="bar-pct">{formData.priorityReturn}%</span>
          </div>

          <div className="bar-row">
            <span className="bar-label">Sicherheit</span>
            <div
              className={`priority-bar-track${isLoading ? ' disabled' : ''}`}
              onPointerDown={(e) => handlePointerDown('prioritySecurity', e)}
              role="slider"
              aria-label="Sicherheit"
              aria-valuenow={formData.prioritySecurity}
              aria-valuemin={0}
              aria-valuemax={100 - formData.priorityReturn}
            >
              <div className="priority-bar-fill" style={{ width: `${formData.prioritySecurity}%` }} />
            </div>
            <span className="bar-pct">{formData.prioritySecurity}%</span>
          </div>

          <div className="bar-row last">
            <span className="bar-label">Liquidität</span>
            <div
              className={`priority-bar-track${isLoading ? ' disabled' : ''}`}
              onPointerDown={(e) => handlePointerDown('priorityLiquidity', e)}
              role="slider"
              aria-label="Liquidität"
              aria-valuenow={formData.priorityLiquidity}
              aria-valuemin={0}
              aria-valuemax={100 - formData.priorityReturn}
            >
              <div className="priority-bar-fill" style={{ width: `${formData.priorityLiquidity}%` }} />
            </div>
            <span className="bar-pct">{formData.priorityLiquidity}%</span>
          </div>
        </div>

        <button type="submit" className="submit-button submit-button-extra" disabled={isLoading}>
          {isLoading ? 'Wird erstellt...' : 'Empfehlung generieren'}
        </button>
      </form>
    </>
  );
}

export default MoneyCompassForm;
