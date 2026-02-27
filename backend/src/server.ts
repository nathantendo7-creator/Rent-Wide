// src/server.ts
// Express app factory — separated from index.ts so tests can import without binding a port

import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import healthRoutes from "./routes/health";
import listingsRoutes from "./routes/listings";
import neighborhoodsRoutes from "./routes/neighborhoods";
import viewingsRoutes from "./routes/viewings";
import contactsRoutes from "./routes/contacts";
import seedRoutes from "./routes/seed";
import { errorHandler, notFound } from "./middleware/errorHandler";

export function createApp() {
  const app = express();

  // ── Middleware ──────────────────────────────────────────────────────────────
  // CORS — wildcard for demo. Restrict to your frontend domain in production!
  app.use(cors());

  app.use(express.json());
  app.use(morgan("dev"));

  // Rate limiting: 100 requests / minute per IP
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: { success: false, error: { code: "RATE_LIMITED", message: "Too many requests" } },
    })
  );

  // ── Routes ──────────────────────────────────────────────────────────────────
  app.use("/api/health", healthRoutes);
  app.use("/api/listings", listingsRoutes);
  app.use("/api/neighborhoods", neighborhoodsRoutes);
  app.use("/api/viewings", viewingsRoutes);
  app.use("/api/contacts", contactsRoutes);
  app.use("/api/seed", seedRoutes);

  // ── Error handling ──────────────────────────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
