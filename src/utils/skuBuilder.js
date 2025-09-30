/**
 * Builds a SKU from user selections and checks if it's valid.
 *
 * @param {Object} selections
 * @param {Object} configOptions
 * @param {Set<string>} validSKUs
 * @returns {string|null}
 */
function buildAndValidateSKU(selections, configOptions, validSKUs) {
  let sku = '';
  for (const key of configOptions.order) {
    const value = selections[key];
    if (value === undefined || value === null) return null;
    const len = configOptions.options[key].length;
    sku += value.toString().padEnd(len, ' ');
  }
  sku = sku.replace(/ /g, '');
  if (sku.length !== 15) return null;
  return validSKUs.has(sku) ? sku : null;
}

export default buildAndValidateSKU;
