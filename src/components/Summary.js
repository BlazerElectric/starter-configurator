import React from 'react';



function Summary({ sku, onEmail, mailtoHref, onReset, externalVoltage, ledInfo, contact, sendDisabled, attemptedSend, comments, needsUL }) {
  return (
    <div className="summary">
      {sku && (
        <>
          <h2>Final SKU: <code>{sku}</code></h2>
        </>
      )}
      <div>
        {sendDisabled ? (
          <button onClick={onEmail} className="btn-disabled">
            Email to Sales Team
          </button>
        ) : (
          <a
            href={mailtoHref}
            onClick={onEmail}
            style={{
              display: 'inline-block',
              padding: '0.6rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid currentColor'
            }}
          >
            Email to Sales Team
          </a>
        )}
      </div>
      {attemptedSend && sendDisabled && (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>
          Please fill out the required fields (Name, Company, Email, Phone) and ensure a valid SKU is selected.
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
      {typeof needsUL !== 'undefined' && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Needs UL Listed:</strong>
          <span style={{ marginLeft: '0.5rem' }} className={needsUL ? 'ul-yes' : 'ul-no'}>{needsUL ? 'Yes' : 'No'}</span>
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
