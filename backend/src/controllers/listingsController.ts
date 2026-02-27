// src/controllers/listingsController.ts
// Handles GET /api/listings, GET /api/listings/:id, GET /api/listings/nearby

import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";
import {
  ListingsQuerySchema,
  NearbyQuerySchema,
} from "../lib/validation";

// ── GET /api/listings ─────────────────────────────────────────────────────────
export async function getListings(req: Request, res: Response, next: NextFunction) {
  try {
    const query = ListingsQuerySchema.parse(req.query);
    const { q, type, category, minPrice, maxPrice, bedrooms, neighborhood, sort, page, perPage } = query;
    const skip = (page - 1) * perPage;

    const where: Record<string, unknown> = { AND: [] as Record<string, unknown>[] };
    const AND = where["AND"] as Record<string, unknown>[];

    if (q) {
      AND.push({ OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] });
    }
    if (type) AND.push({ type });
    if (category) AND.push({ category });
    if (minPrice !== undefined) AND.push({ price: { gte: minPrice } });
    if (maxPrice !== undefined) AND.push({ price: { lte: maxPrice } });
    if (bedrooms !== undefined) AND.push({ bedrooms });
    if (neighborhood) AND.push({ neighborhood: { slug: neighborhood } });

    const orderBy =
      sort === "price_asc" ? { price: "asc" as const } :
        sort === "price_desc" ? { price: "desc" as const } :
          sort === "oldest" ? { createdAt: "asc" as const } :
            { createdAt: "desc" as const };

    const [total, listings] = await Promise.all([
      prisma.listing.count({ where }),
      prisma.listing.findMany({
        where,
        skip,
        take: perPage,
        orderBy,
        select: {
          id: true,
          code: true,
          title: true,
          price: true,
          priceFrequency: true,
          bedrooms: true,
          lat: true,
          lng: true,
          status: true,
          neighborhood: { select: { name: true, slug: true } },
          images: { select: { url: true }, orderBy: { sortOrder: "asc" }, take: 1 },
        },
      }),
    ]);

    const data = listings.map((l) => ({
      id: l.id,
      code: l.code,
      title: l.title,
      price: l.price,
      priceFrequency: l.priceFrequency,
      bedrooms: l.bedrooms,
      neighborhood: l.neighborhood,
      thumbUrl: l.images[0]?.url ?? null,
      lat: l.lat,
      lng: l.lng,
      status: l.status,
    }));

    res.json({
      success: true,
      data,
      meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
    });
  } catch (err) {
    next(err);
  }
}

// ── GET /api/listings/nearby ──────────────────────────────────────────────────
export async function getNearbyListings(req: Request, res: Response, next: NextFunction) {
  try {
    const { lat, lng, radius_km } = NearbyQuerySchema.parse(req.query);

    // Bounding box approximation (1 deg lat ≈ 111 km)
    const latDelta = radius_km / 111.0;
    const lngDelta = radius_km / (111.0 * Math.cos((lat * Math.PI) / 180));

    const listings = await prisma.listing.findMany({
      where: {
        lat: { gte: lat - latDelta, lte: lat + latDelta },
        lng: { gte: lng - lngDelta, lte: lng + lngDelta },
      },
      select: {
        id: true,
        code: true,
        title: true,
        price: true,
        priceFrequency: true,
        bedrooms: true,
        lat: true,
        lng: true,
        status: true,
        neighborhood: { select: { name: true, slug: true } },
        images: { select: { url: true }, orderBy: { sortOrder: "asc" }, take: 1 },
      },
    });

    const data = listings.map((l) => ({
      id: l.id,
      code: l.code,
      title: l.title,
      price: l.price,
      priceFrequency: l.priceFrequency,
      bedrooms: l.bedrooms,
      neighborhood: l.neighborhood,
      thumbUrl: l.images[0]?.url ?? null,
      lat: l.lat,
      lng: l.lng,
      status: l.status,
    }));

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// ── GET /api/listings/:id ─────────────────────────────────────────────────────
export async function getListingById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const listing = await prisma.listing.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        agent: true,
        neighborhood: true,
      },
    });

    if (!listing) {
      throw new AppError(404, "NOT_FOUND", `Listing '${id}' not found`);
    }

    res.json({ success: true, data: listing });
  } catch (err) {
    next(err);
  }
}
