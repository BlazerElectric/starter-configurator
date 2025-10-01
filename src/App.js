import React, { useState, useEffect } from 'react';
import './brand.css';
import StepSelector from './components/StepSelector';
import Summary from './components/Summary';
import buildAndValidateSKU from './utils/skuBuilder';

import configOptionsData from './data/configOptions.json';
import skusData from './data/skus.json';

function App() {
  const [selections, setSelections] = useState({});
  const [sku, setSku] = useState(null);

  const partNumberStructure = configOptionsData.PartNumberStructure;
  const [filteredSKUs, setFilteredSKUs] = useState(skusData);

  // Filter SKUs based on current selections
  useEffect(() => {
    let filtered = skusData;
    partNumberStructure.forEach((segment, idx) => {
      const key = segment.Segment;
      const value = selections[key];
      if (value && value !== '') {
        filtered = filtered.filter(sku => {
          // Build the expected position in the SKU string
          let pos = 0;
          for (let i = 0; i < idx; i++) {
            pos += partNumberStructure[i].Length;
          }
          return sku.substr(pos, segment.Length) === value;
        });
      }
    });
    setFilteredSKUs(filtered);
  }, [selections, partNumberStructure]);

  // Build and validate SKU from selections, always include Prefix 'S'
  useEffect(() => {
    const validSKUsSet = new Set(filteredSKUs);
    // Always include Prefix 'S' in the selections
    const selectionsWithPrefix = { Prefix: 'S', ...selections };
    const result = buildAndValidateSKU(selectionsWithPrefix, partNumberStructure, validSKUsSet);
    setSku(result);
  }, [selections, filteredSKUs, partNumberStructure]);

  const handleSelection = (segment, value) => {
    // When a selection changes, clear all selections after it
    const idx = partNumberStructure.findIndex(s => s.Segment === segment);
    setSelections(prev => {
      const newSelections = { ...prev };
      partNumberStructure.forEach((seg, i) => {
        if (i > idx) delete newSelections[seg.Segment];
      });
      newSelections[segment] = value;
      return newSelections;
    });
  };


  const handleEmail = () => {
    if (!sku) return;
    const mailto = `mailto:sales@example.com?subject=SKU Request&body=Please quote SKU: ${sku}`;
    window.location.href = mailto;
  };

  const handleReset = () => {
    setSelections({});
  };

  // For each segment, compute valid options based on filtered SKUs and current selections
  const getFilteredOptions = (segment, idx) => {
    const validOptions = segment.ValidOptions;
    if (typeof validOptions !== 'object' || !filteredSKUs.length) return validOptions;
    // Find possible values for this segment in filtered SKUs
    let pos = 0;
    for (let i = 0; i < idx; i++) {
      pos += partNumberStructure[i].Length;
    }
    const possible = new Set(filteredSKUs.map(sku => sku.substr(pos, segment.Length)));
    // Only keep options that are still possible
    return Object.fromEntries(
      Object.entries(validOptions).filter(([val]) => possible.has(val))
    );
  };

  // Remove the Starter segment from the UI (always 'S')
  const visibleSegments = partNumberStructure.filter(seg => seg.Segment !== 'Prefix');
  return (
    <div className="configurator-container">
      <img
        src="/BlazerLogoBlue.png"
        alt="Blazer Electric Logo"
        style={{
          display: 'block',
          margin: '0 auto 1.5rem auto',
          maxWidth: '220px',
          width: '100%',
          height: 'auto'
        }}
      />
      <h1>Starter Configurator</h1>
      {visibleSegments.map((segment, idx) => (
        <StepSelector
          key={segment.Segment}
          stepKey={segment.Segment}
          options={{ ...segment, ValidOptions: getFilteredOptions(segment, idx + 1) }}
          selection={selections[segment.Segment]}
          onChange={handleSelection}
        />
      ))}
      <Summary sku={sku} onEmail={handleEmail} onReset={handleReset} />
    </div>
  );
}

export default App;
