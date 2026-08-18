# Doitsee - Vendor App - Hostinger Deployment Bundle

Self-contained Node.js application ready to upload to Hostinger Node.js hosting.

## Folder layout
```
vendor-app/
├── app.js         # Express server (entry point)
├── package.json   # express + http-proxy-middleware
├── .env.example   # Sample environment variables
├── README.md
└── public/        # Pre-built static assets (HTML/CSS/JS)
```

## Deploy steps (Hostinger hPanel)

1. Upload the entire `vendor-app/` folder to your hosting account.
2. Open *Advanced > Node.js* and click **Create application**.
   - Node.js version: **18.x or newer**
   - Application mode: **Production**
   - Application root: path to the uploaded `vendor-app/` folder
   - Application URL: the (sub)domain that should serve this app
   - Application startup file: `app.js`
3. In the same screen add this environment variable:
   - `API_UPSTREAM_URL` = your Doitsee API URL, e.g. `https://api.yourdomain.com`
   (`PORT` is set automatically by Hostinger - do not override.)
4. Click **NPM Install**, then **Start App**. Visit your domain.

## How it works

- `app.js` serves `public/` as static files (hashed assets cached for 1 year, `index.html` no-store).
- Unmatched routes fall back to `index.html` so client-side routing (Wouter) works on refresh.
- `/api/*` requests are reverse-proxied to `API_UPSTREAM_URL`. The browser only ever talks to the same origin, so cookies and CORS are not an issue.

## Updating

Re-build in Replit, re-upload only the `public/` folder, refresh - done. Restart the Node app only if you change `app.js` or `package.json`.

## Local smoke test

```bash
cd vendor-app
npm install
API_UPSTREAM_URL=http://localhost:8080 PORT=3000 npm start
# open http://localhost:3000
```
