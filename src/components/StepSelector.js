import React from 'react';

function StepSelector({ options, selection, onChange, stepKey }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ marginRight: "0.5rem" }}>{stepKey}:</label>
      <select
        value={selection || ''}
        onChange={e => onChange(stepKey, e.target.value)}
      >
        <option value="" disabled>Select...</option>
        {options.choices.map(choice => (
          <option key={choice} value={choice}>{choice}</option>
        ))}
      </select>
    </div>
  );
}

export default StepSelector;
