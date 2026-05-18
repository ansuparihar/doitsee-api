Doitsee API Server - Hostinger Deployment

Entry file: app.js   |   Node: >=18

1. Set environment variables in Hostinger Node.js panel:
   DATABASE_URL    (Neon Postgres, MUST end with ?sslmode=require)
   SESSION_SECRET  (long random string)
   NODE_ENV        production

2. Run NPM Install, then Start/Restart application.
3. Test: https://api.doitsee.com/api/healthz  -> {"status":"ok"}
