import React from 'react';

function StepSelector({ options, selection, onChange, stepKey, disabled }) {
  const validOptions = options.ValidOptions;
  let choices = [];
  if (typeof validOptions === 'object' && validOptions !== null) {
    choices = Object.entries(validOptions);
  } else if (typeof validOptions === 'string') {
    // For variable numeric values, you may want to allow free text input
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ marginRight: "0.5rem" }}>{options.Description || stepKey}:</label>
      {Array.isArray(choices) && choices.length > 0 ? (
        <select
          value={selection || ''}
          onChange={e => onChange(stepKey, e.target.value)}
          disabled={disabled}
        >
          <option value="" disabled>Select...</option>
          {choices.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={selection || ''}
          placeholder="Enter value"
          onChange={e => onChange(stepKey, e.target.value)}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export default StepSelector;
