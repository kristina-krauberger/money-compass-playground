import React, { useState, useRef } from 'react';

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

  const barRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  };

  const barLabelStyle = {
    minWidth: '80px',
    fontWeight: '600',
    fontSize: '14px',
    color: 'var(--text-main)',
  };

  const barPctStyle = {
    minWidth: '34px',
    fontWeight: '700',
    fontSize: '14px',
    color: '#0EB689',
    textAlign: 'right',
  };

  return (
    <>
      <style>{`
        .priority-bar-track {
          flex: 1;
          max-width: 260px;
          height: 8px;
          border-radius: 4px;
          background: #E1E8ED;
          cursor: grab;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s;
          touch-action: none;
          user-select: none;
        }
        .priority-bar-track:active {
          cursor: grabbing;
        }
        .priority-bar-track:hover .priority-bar-fill {
          filter: brightness(1.1);
        }
        .priority-bar-track.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .priority-bar-fill {
          height: 100%;
          background: #0EB689;
          border-radius: 4px;
          transition: width 0.15s ease;
        }
        .compact-form .form-group {
          margin-bottom: 12px;
          gap: 5px;
        }
        .compact-form .card {
          padding: 18px;
        }
      `}</style>
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
            <option value="short">Kurz</option>
            <option value="medium">Mittel</option>
            <option value="long">Lang</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: '8px' }}>
          <p style={{ margin: '0 0 2px 0', fontWeight: '700', fontSize: '15px', color: 'var(--text-main)' }}>
            Deine Investment-Prioritäten
          </p>
          <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: 'var(--text-muted)' }}>
            Was ist dir beim Investieren am wichtigsten?<br />
            Verteile 100 % auf diese drei Prioritäten.
          </p>

          <div style={barRowStyle}>
            <span style={barLabelStyle}>Rendite</span>
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
            <span style={barPctStyle}>{formData.priorityReturn}%</span>
          </div>

          <div style={barRowStyle}>
            <span style={barLabelStyle}>Sicherheit</span>
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
            <span style={barPctStyle}>{formData.prioritySecurity}%</span>
          </div>

          <div style={{ ...barRowStyle, marginBottom: '0' }}>
            <span style={barLabelStyle}>Liquidität</span>
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
            <span style={barPctStyle}>{formData.priorityLiquidity}%</span>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading} style={{ marginTop: '6px' }}>
          {isLoading ? 'Wird erstellt...' : 'Empfehlung generieren'}
        </button>
      </form>
    </>
  );
}

export default MoneyCompassForm;
