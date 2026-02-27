// src/controllers/neighborhoodsController.ts

import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export async function getNeighborhoods(req: Request, res: Response, next: NextFunction) {
  try {
    const popular = req.query.popular === "true";

    const neighborhoods = await prisma.neighborhood.findMany({
      include: {
        _count: { select: { listings: true } },
      },
    });

    const data = neighborhoods.map((n) => ({
      id: n.id,
      name: n.name,
      slug: n.slug,
      description: n.description,
      featureImage: n.featureImage,
      centerLat: n.centerLat,
      centerLng: n.centerLng,
      listingCount: n._count.listings,
    }));

    if (popular) {
      data.sort((a, b) => b.listingCount - a.listingCount);
    }

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
