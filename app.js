const path = require("path");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;
const API_UPSTREAM_URL = process.env.API_UPSTREAM_URL || "";
const PUBLIC_DIR = path.join(__dirname, "public");
const APP_NAME = "vendor-app";

app.disable("x-powered-by");

if (API_UPSTREAM_URL) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: API_UPSTREAM_URL,
      changeOrigin: true,
      xfwd: true,
      logLevel: "warn",
      pathRewrite: (p) => '/api' + p,
    }),
  );
  console.log(`[${APP_NAME}] Proxying /api/* -> ${API_UPSTREAM_URL}`);
} else {
  console.warn(`[${APP_NAME}] API_UPSTREAM_URL is not set. /api requests will return 502.`);
  app.use("/api", (_req, res) => {
    res.status(502).json({
      error: "API_UPSTREAM_URL is not configured on the server. Set it in your Hostinger Node.js app environment variables.",
    });
  });
}

app.use(
  express.static(PUBLIC_DIR, {
    index: false,
    maxAge: "1h",
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  }),
);

app.get("*", (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`[${APP_NAME}] Listening on port ${PORT}`);
});

