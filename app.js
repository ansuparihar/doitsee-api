"use strict";

console.log("[doitsee-api] Booting Doitsee API Server...");
console.log("[doitsee-api] Node version:", process.version);
console.log("[doitsee-api] PORT:", process.env.PORT || "(not set, using 3000 fallback)");
console.log("[doitsee-api] DATABASE_URL set:", process.env.DATABASE_URL ? "yes" : "NO - app will crash");
console.log("[doitsee-api] SESSION_SECRET set:", process.env.SESSION_SECRET ? "yes" : "NO - app will crash");

if (!process.env.PORT) {
  process.env.PORT = "3000";
}

process.on("uncaughtException", (err) => {
  console.error("[doitsee-api] UNCAUGHT EXCEPTION:", err && err.stack ? err.stack : err);
  process.exit(1);
});
process.on("unhandledRejection", (err) => {
  console.error("[doitsee-api] UNHANDLED REJECTION:", err && err.stack ? err.stack : err);
  process.exit(1);
});

import("./index.mjs")
  .then(() => {
    console.log("[doitsee-api] Bundle loaded successfully");
  })
  .catch((err) => {
    console.error("[doitsee-api] FAILED TO LOAD BUNDLE:", err && err.stack ? err.stack : err);
    process.exit(1);
  });
