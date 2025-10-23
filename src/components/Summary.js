import React from 'react';



function Summary({ sku, onEmail, onReset, externalVoltage, ledInfo, contact }) {
  return (
    <div className="summary">
      {sku && (
        <>
          <h2>Final SKU: <code>{sku}</code></h2>
          <button onClick={onEmail}>Email to Sales Team</button>
        </>
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
