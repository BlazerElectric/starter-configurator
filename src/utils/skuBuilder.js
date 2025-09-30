/**
 * Builds a SKU from user selections and checks if it's valid.
 *
 * @param {Object} selections
 * @param {Object} configOptions
 * @param {Set<string>} validSKUs
 * @returns {string|null}
 */

function buildAndValidateSKU(selections, partNumberStructure, validSKUs) {
  let sku = '';
  for (const segment of partNumberStructure) {
    const key = segment.Segment;
    const value = selections[key];
    if (value === undefined || value === null || value === '') return null;
    const len = segment.Length;
    sku += value.toString().padEnd(len, ' ');
  }
  sku = sku.replace(/ /g, '');
  // Optionally, you can check for a specific length if needed
  // if (sku.length !== 15) return null;
  return validSKUs.has(sku) ? sku : null;
}

export default buildAndValidateSKU;
