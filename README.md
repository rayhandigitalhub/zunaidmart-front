# Zunaid Mart Frontend MVP

Daraz-inspired original storefront UI for Zunaid Mart, powered by the public WooCommerce Store API.

## Included
- Homepage with hero banner, trust strip, promotion block, and live products
- Product listing with search query support (`/products?q=...`)
- Product detail pages (`/products/[slug]`)
- Responsive mobile layout
- No WooCommerce admin credentials exposed in the browser

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Netlify

1. Import the GitHub repository into Netlify.
2. Netlify will use `netlify.toml` and run `npm run build`.
3. The Next.js runtime plugin handles server-rendered product pages.
4. Optional environment variable: `WOOCOMMERCE_STORE_API` with the value of your Store API base, for example `https://zunaidmart.com/wp-json/wc/store/v1`.

The current default points to the live Zunaid Mart API, so no environment variable is required for the first preview.

## Netlify environment note

The public WooCommerce Store API is used only for catalog reads. Admin credentials are not included in the browser or repository.

## Important next phase

Cart, checkout, customer accounts, coupons, and order placement are not included in this first MVP. They should use WooCommerce's Store API and be added only after the visual/product experience is approved.
