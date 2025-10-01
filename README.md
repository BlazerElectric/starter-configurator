
# Starter Configurator

This is a web-based configurator for building valid motor control panel SKUs for Blazer Electric. The app guides users through a series of dropdowns, dynamically filtering options based on previous selections to ensure only compatible parts are chosen.

## Features

- Dynamic, cascading dropdowns: Each selection filters the next, so only valid options are shown.
- Sequential selection enforced: Users must answer each question in order.
- 15-digit SKU generation: The app builds a valid SKU as you make selections.
- Brand styling and logo integration.
- Reset and email functionality.
- Deployed and shareable via Vercel.

## Usage

1. Visit the live app: [https://starter-configurator.vercel.app/](https://starter-configurator.vercel.app/)
2. Make selections in order from top to bottom. Each dropdown will unlock as you proceed.
3. The final SKU will be displayed when all selections are valid.
4. Use the "Email to Sales Team" button to send your SKU, or "Reset" to start over.

## Local Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/BlazerElectric/starter-configurator.git
cd starter-configurator
npm install
```

Start the development server:

```bash
npm start
```

Build for production:

```bash
npm run build
```

## Deployment

This app is automatically deployed to Vercel on every push to `main`.

## Folder Structure

- `public/` — Static files (including logo)
- `src/data/` — Configuration and SKU data
- `src/components/` — UI components
- `src/utils/` — Utility functions
- `src/App.js` — Main application logic

## How It Works

- Selections must be made in order; each step depends on the previous.
- Each dropdown only shows valid options based on prior selections and available SKUs.
- The SKU is only generated when all selections are valid and compatible.
- When a valid SKU is built, it can be emailed to the sales team or reset.

---

© Blazer Electric. All rights reserved.
