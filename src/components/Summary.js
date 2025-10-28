import React from 'react';



function Summary({ sku, onEmail, onReset, externalVoltage, ledInfo, contact, sendDisabled, attemptedSend, comments }) {
  return (
    <div className="summary">
      {sku && (
        <>
          <h2>Final SKU: <code>{sku}</code></h2>
        </>
      )}
      <div>
        <button onClick={onEmail} className={sendDisabled ? 'btn-disabled' : ''}>
          Email to Sales Team
        </button>
      </div>
      {attemptedSend && sendDisabled && (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>
          Please fill out the required fields (Name and valid Email) and ensure a valid SKU is selected.
        </div>
      )}
      {externalVoltage && (
        <div style={{ marginTop: '1rem' }}>
          <strong>External Control Voltage:</strong> {externalVoltage}
        </div>
      )}
      {contact && (contact.name || contact.company || contact.email || contact.phone) && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Contact Info:</strong>
          <div>{contact.name}{contact.company && ` — ${contact.company}`}</div>
          <div>{contact.email}{contact.phone && ` — ${contact.phone}`}</div>
        </div>
      )}
      {typeof comments !== 'undefined' && comments && comments.trim() && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Questions / Comments:</strong>
          <div style={{ whiteSpace: 'pre-wrap' }}>{comments}</div>
        </div>
      )}
      {ledInfo && ledInfo.length > 0 && ledInfo.some(led => led.color || led.label) && (
        <div style={{ marginTop: '1rem' }}>
          <strong>LED Details:</strong>
          <ul>
            {ledInfo.map((led, idx) => (
              (led.color || led.label) ? (
                <li key={idx}>
                  {led.color && <span>Color: {led.color}</span>}
                  {led.color && led.label && ' | '}
                  {led.label && <span>Label: {led.label}</span>}
                </li>
              ) : null
            ))}
          </ul>
        </div>
      )}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

export default Summary;
