import React from 'react';


function Summary({ sku, onEmail, onReset }) {
  return (
    <div className="summary">
      {sku && (
        <>
          <h2>Final SKU: <code>{sku}</code></h2>
          <button onClick={onEmail}>Email to Sales Team</button>
        </>
      )}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

export default Summary;
