// src/controllers/viewingsController.ts

import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";
import { CreateViewingSchema } from "../lib/validation";

export async function createViewing(req: Request, res: Response, next: NextFunction) {
  try {
    const input = CreateViewingSchema.parse(req.body);

    // Validate listing exists
    const listing = await prisma.listing.findUnique({ where: { id: input.listingId } });
    if (!listing) {
      throw new AppError(404, "NOT_FOUND", `Listing '${input.listingId}' not found`);
    }

    const viewing = await prisma.viewing.create({
      data: {
        listingId: input.listingId,
        name: input.name,
        phone: input.phone,
        preferredDatetime: new Date(input.preferredDatetime),
        message: input.message,
      },
    });

    console.log(`[VIEWING] New request for listing ${listing.code} by ${input.name} (${input.phone})`);

    res.status(201).json({ success: true, data: viewing });
  } catch (err) {
    next(err);
  }
}
