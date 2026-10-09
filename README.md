# BrightBite — Next.js Restaurant Website

A bright, responsive, static-export-ready restaurant ordering and management demo built with Next.js.

## Included pages
- Home / landing page
- Full menu with category filters and search
- Working demo cart with quantity controls and mock checkout
- Reservation form with confirmation state
- Order tracking page
- Restaurant admin dashboard
- About page
- Responsive design for desktop/tablet/mobile

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build static website

```bash
npm run build
```

Because `output: "export"` is enabled in `next.config.mjs`, Next.js will generate a static `out/` directory suitable for S3, CloudFront, Netlify, static hosting, etc.

## Notes
This is a front-end/static demo. Ordering, reservations and dashboard data are mocked in the browser and no real payment/database/backend is connected.
