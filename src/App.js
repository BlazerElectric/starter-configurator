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
  const [externalVoltage, setExternalVoltage] = useState('');
  const [ledInfo, setLedInfo] = useState([{ color: '', label: '' }]);

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
      // Reset extra info if needed
      if (segment === 'ControlVoltage' && value !== 'X') setExternalVoltage('');
      if (segment === 'LEDs' && value !== '1' && value !== '2') setLedInfo([{ color: '', label: '' }]);
      return newSelections;
    });
  };


  const handleEmail = () => {
    if (!sku) return;
    // Build summary of selections
    let summary = `Please quote SKU: ${sku}`;
    // Add all selections
    summary += '\n\nSelections:';
    partNumberStructure.forEach(seg => {
      if (seg.Segment !== 'Prefix' && selections[seg.Segment]) {
        summary += `\n- ${seg.Description || seg.Segment}: ${selections[seg.Segment]}`;
      }
    });
    // Add external voltage if present
    if (selections['ControlVoltage'] === 'X' && externalVoltage) {
      summary += `\n\nExternal Control Voltage: ${externalVoltage}`;
    }
    // Add contact info if present
    if (contact && (contact.name || contact.company || contact.email || contact.phone)) {
      summary += `\n\nContact Information:`;
      if (contact.name) summary += `\n- Name: ${contact.name}`;
      if (contact.company) summary += `\n- Company: ${contact.company}`;
      if (contact.email) summary += `\n- Email: ${contact.email}`;
      if (contact.phone) summary += `\n- Phone: ${contact.phone}`;
    }
    // Add LED info if present
    if (ledCount > 0 && ledInfo.some(led => led.color || led.label)) {
      summary += `\n\nLED Details:`;
      ledInfo.forEach((led, idx) => {
        if (led.color || led.label) {
          summary += `\n  LED ${idx + 1}:`;
          if (led.color) summary += ` Color: ${led.color}`;
          if (led.label) summary += ` | Label: ${led.label}`;
        }
      });
    }
  const mailto = `mailto:profab@blazerelectricsupply.com?subject=SKU Request&body=${encodeURIComponent(summary)}`;
    window.location.href = mailto;
  };

  const handleReset = () => {
    setSelections({});
    setExternalVoltage('');
    setLedInfo([{ color: '', label: '' }]);
  };

  // Contact info
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '' });

  const handleContactChange = (field, value) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };

  // For each segment, compute valid options based on filtered SKUs and current selections
  const getFilteredOptions = (segment, idx) => {
    const validOptions = segment.ValidOptions;
    if (typeof validOptions !== 'object' || !filteredSKUs.length) return validOptions;
    // Find possible values for this segment in filtered SKUs
    let pos = 0;
    for (let i = 0; i < idx; i++) {
      pos += partNumberStructure[i].Length;

    // Validation / attempted send state
    const [attemptedSend, setAttemptedSend] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isNameValid = contact.name.trim().length > 0;
    const isEmailValid = emailRegex.test(contact.email.trim());
    const isSendReady = Boolean(sku && isNameValid && isEmailValid);
    }
    const possible = new Set(filteredSKUs.map(sku => sku.substr(pos, segment.Length)));
    // Only keep options that are still possible
    return Object.fromEntries(
      Object.entries(validOptions).filter(([val]) => possible.has(val))
    );
  };

  // Remove the Starter segment from the UI (always 'S')
  const visibleSegments = partNumberStructure.filter(seg => seg.Segment !== 'Prefix');
  // Helper for LED info fields
  const handleLedInfoChange = (idx, field, value) => {
    setLedInfo(prev => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };
  // Add or remove LED info fields
  const ledCount = parseInt(selections['LEDs'] || '0', 10);
  useEffect(() => {
    if (ledCount > 0) {
      setLedInfo(prev => {
        const arr = [...prev];
        while (arr.length < ledCount) arr.push({ color: '', label: '' });
        return arr.slice(0, ledCount);
      });
    }
  }, [ledCount]);

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
      <h1 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        margin: '0 0 1rem 0',
        letterSpacing: '0.02em',
        fontWeight: 700
      }}>Motor Starter Builder</h1>
      <div style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#333',
        fontSize: '0.92rem',
        lineHeight: 1.6
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ display: 'block', marginBottom: '0.3em' }}>
            Select each option in order. Choices will update automatically to ensure only valid combinations are available.
          </span>
          <span style={{ display: 'block', marginBottom: '0.3em' }}>
            When finished, your SKU and summary will appear below, ready to email to the sales team.
          </span>
        </div>
  <div style={{ textAlign: 'left', display: 'inline-block', margin: '0 auto', fontSize: '0.90em', paddingLeft: '1.2em' }}>
          <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
            <li>For “External Control Voltage,” please specify the voltage.</li>
            <li>For “LEDs,” provide the color and label for each LED.</li>
          </ul>
        </div>
      </div>
      {visibleSegments.map((segment, idx) => {
        // Disable this dropdown if any previous segment is not selected
        const isDisabled = visibleSegments.slice(0, idx).some(prevSeg => !selections[prevSeg.Segment]);
        return (
          <StepSelector
            key={segment.Segment}
            stepKey={segment.Segment}
            options={{ ...segment, ValidOptions: getFilteredOptions(segment, idx + 1) }}
            selection={selections[segment.Segment]}
            onChange={handleSelection}
            disabled={isDisabled}
          />
        );
      })}

      {/* Extra info for External Control Voltage */}
      {selections['ControlVoltage'] === 'X' && (
        <div style={{ margin: '1rem 0' }}>
          <label>
            Please specify External Control Voltage:
            <input
              type="text"
              value={externalVoltage}
              onChange={e => setExternalVoltage(e.target.value)}
              placeholder="e.g. 24V, 120V, etc."
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
        </div>
      )}

      {/* Extra info for LEDs */}
      {ledCount > 0 && (
        <div style={{ margin: '1rem 0' }}>
          <label>Provide LED color and label information:</label>
          {ledInfo.map((led, idx) => (
            <div key={idx} style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
              <select
                value={led.color}
                onChange={e => handleLedInfoChange(idx, 'color', e.target.value)}
                style={{ marginRight: '0.5rem' }}
              >
                <option value="">Select Color</option>
                <option value="Amber">Amber</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Red">Red</option>
                <option value="Yellow">Yellow</option>
              </select>
              <input
                type="text"
                value={led.label}
                onChange={e => handleLedInfoChange(idx, 'label', e.target.value)}
                placeholder={`Label for LED ${idx + 1}`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Contact information */}
      <div style={{ margin: '1.25rem 0', textAlign: 'left', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-blue)' }}>Contact Information</h3>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <label style={{ flex: 1, color: isNameValid || !attemptedSend ? 'var(--primary-blue)' : 'red' }}>
            Name {attemptedSend && !isNameValid && <span style={{ color: 'red' }}>*</span>}
            <input
              type="text"
              placeholder="Name"
              value={contact.name}
              onChange={e => handleContactChange('name', e.target.value)}
              style={{ width: '100%', marginTop: '0.25rem', borderColor: attemptedSend && !isNameValid ? 'red' : undefined }}
            />
          </label>
          <label style={{ flex: 1 }}>
            Company
            <input
              type="text"
              placeholder="Company"
              value={contact.company}
              onChange={e => handleContactChange('company', e.target.value)}
              style={{ width: '100%', marginTop: '0.25rem' }}
            />
          </label>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <label style={{ flex: 1, color: isEmailValid || !attemptedSend ? 'var(--primary-blue)' : 'red' }}>
            Email {attemptedSend && !isEmailValid && <span style={{ color: 'red' }}>*</span>}
            <input
              type="email"
              placeholder="Email"
              value={contact.email}
              onChange={e => handleContactChange('email', e.target.value)}
              style={{ width: '100%', marginTop: '0.25rem', borderColor: attemptedSend && !isEmailValid ? 'red' : undefined }}
            />
          </label>
          <label style={{ flex: 1 }}>
            Phone
            <input
              type="tel"
              placeholder="Phone"
              value={contact.phone}
              onChange={e => handleContactChange('phone', e.target.value)}
              style={{ width: '100%', marginTop: '0.25rem' }}
            />
          </label>
        </div>
      </div>

      <Summary
        sku={sku}
        onEmail={handleEmail}
        onReset={handleReset}
        externalVoltage={selections['ControlVoltage'] === 'X' ? externalVoltage : ''}
        ledInfo={ledCount > 0 ? ledInfo : []}
        contact={contact}
        sendDisabled={!(contact.name && contact.email)}
      />
    </div>
  );
}

export default App;
