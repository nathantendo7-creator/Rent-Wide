// src/routes/listings.ts
// IMPORTANT: /nearby must be registered before /:id to avoid route shadowing

import { Router } from "express";
import {
  getListings,
  getListingById,
  getNearbyListings,
} from "../controllers/listingsController";

const router = Router();

router.get("/nearby", getNearbyListings);
router.get("/:id", getListingById);
router.get("/", getListings);

export default router;
