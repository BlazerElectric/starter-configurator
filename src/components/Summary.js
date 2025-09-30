import React from 'react';

function Summary({ sku, onEmail }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      {sku ? (
        <>
          <h2>Final SKU: <code>{sku}</code></h2>
          <button onClick={onEmail}>Email to Sales Team</button>
        </>
      ) : (
        <h2>SKU not valid or incomplete.</h2>
      )}
    </div>
  );
}

export default Summary;
