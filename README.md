# Doitsee API Server - Hostinger Bundle (v2)

CommonJS wrapper that loads the ESM server bundle.

## Required env vars
- DATABASE_URL  - Postgres connection string (e.g. from Neon)
- SESSION_SECRET - Long random string for JWT signing
- NODE_ENV - production

PORT is supplied by Hostinger automatically.

## Files
- app.js          - CommonJS launcher (matches working panel pattern)
- package.json    - Runtime deps: pg + drizzle-orm
- dist/index.mjs  - Bundled Express server (esbuild output)
- dist/pino-*.mjs - Pino logger workers
