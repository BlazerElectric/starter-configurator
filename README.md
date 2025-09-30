# Starter Configurator

A web-based configurator for building and validating 15-character motor control panel SKUs.

## Getting Started

1. Clone this repository:
   ```
   git clone https://github.com/BlazerElectric/starter-configurator.git
   cd starter-configurator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the app locally:
   ```
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

To deploy to GitHub Pages:

1. Install the `gh-pages` package if you haven't:
   ```
   npm install --save gh-pages
   ```

2. Deploy:
   ```
   npm run deploy
   ```
   Your site will be published at:  
   https://BlazerElectric.github.io/starter-configurator

## Folder Structure

- `public/` — Static files.
- `src/data/` — Configuration and SKU data.
- `src/components/` — UI components.
- `src/utils/` — Utility functions.
- `src/App.js` — Main application.

## How It Works

- Select options for each step.
- Only valid SKU combinations (from `skus.json`) are accepted.
- When a valid SKU is built, it can be emailed to the sales team.
