// src/lib/validation.ts
// Centralised Zod schemas for all request bodies and query params

import { z } from "zod";

// ── Reusable helpers ──────────────────────────────────────────────────────────
const phoneSchema = z
  .string()
  .min(7, "Phone too short")
  .max(20, "Phone too long")
  .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format");

// ── POST /api/viewings ────────────────────────────────────────────────────────
export const CreateViewingSchema = z.object({
  listingId: z.string().min(1, "listingId is required"),
  name: z.string().min(2, "name must be at least 2 characters"),
  phone: phoneSchema,
  preferredDatetime: z.string().datetime({ message: "preferredDatetime must be ISO 8601" }),
  message: z.string().min(5, "message must be at least 5 characters"),
});
export type CreateViewingInput = z.infer<typeof CreateViewingSchema>;

// ── POST /api/contacts ────────────────────────────────────────────────────────
export const CreateContactSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters"),
  email: z.string().email("Invalid email").optional(),
  phone: phoneSchema,
  message: z.string().min(5, "message must be at least 5 characters"),
  listingId: z.string().optional(),
});
export type CreateContactInput = z.infer<typeof CreateContactSchema>;

// ── GET /api/listings query params ────────────────────────────────────────────
export const ListingsQuerySchema = z.object({
  q: z.string().optional(),
  type: z.enum(["RENT", "SALE"]).optional(),
  category: z.enum(["HOUSE", "APARTMENT", "OFFICE", "LAND"]).optional(),
  minPrice: z.coerce.number().int().min(0).optional(),
  maxPrice: z.coerce.number().int().min(0).optional(),
  bedrooms: z.coerce.number().int().min(0).optional(),
  neighborhood: z.string().optional(),
  sort: z.enum(["price_asc", "price_desc", "newest", "oldest"]).optional().default("newest"),
  page: z.coerce.number().int().min(1).optional().default(1),
  perPage: z.coerce.number().int().min(1).max(100).optional().default(12),
});
export type ListingsQuery = z.infer<typeof ListingsQuerySchema>;

// ── GET /api/listings/nearby query params ─────────────────────────────────────
export const NearbyQuerySchema = z.object({
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  radius_km: z.coerce.number().min(0.1).max(50).default(5),
});
export type NearbyQuery = z.infer<typeof NearbyQuerySchema>;
