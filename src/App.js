import React, { useState, useEffect } from 'react';
import StepSelector from './components/StepSelector';
import Summary from './components/Summary';
import buildAndValidateSKU from './utils/skuBuilder';

import configOptionsData from './data/configOptions.json';
import skusData from './data/skus.json';

function App() {
  const [selections, setSelections] = useState({});
  const [sku, setSku] = useState(null);

  const validSKUs = React.useMemo(() => new Set(skusData), []);
  const partNumberStructure = configOptionsData.PartNumberStructure;

  useEffect(() => {
    const result = buildAndValidateSKU(selections, partNumberStructure, validSKUs);
    setSku(result);
  }, [selections, validSKUs, partNumberStructure]);

  const handleSelection = (segment, value) => {
    setSelections(prev => ({ ...prev, [segment]: value }));
  };

  const handleEmail = () => {
    if (!sku) return;
    const mailto = `mailto:sales@example.com?subject=SKU Request&body=Please quote SKU: ${sku}`;
    window.location.href = mailto;
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Starter Configurator</h1>
      {partNumberStructure.map(segment => (
        <StepSelector
          key={segment.Segment}
          stepKey={segment.Segment}
          options={segment}
          selection={selections[segment.Segment]}
          onChange={handleSelection}
        />
      ))}
      <Summary sku={sku} onEmail={handleEmail} />
    </div>
  );
}

export default App;
