// src/controllers/contactsController.ts

import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";
import { CreateContactSchema } from "../lib/validation";

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const input = CreateContactSchema.parse(req.body);

    // If listingId provided, verify it exists
    if (input.listingId) {
      const listing = await prisma.listing.findUnique({ where: { id: input.listingId } });
      if (!listing) {
        throw new AppError(404, "NOT_FOUND", `Listing '${input.listingId}' not found`);
      }
    }

    const contact = await prisma.contact.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
        listingId: input.listingId,
      },
    });

    console.log(`[CONTACT] New lead from ${input.name} (${input.phone})`);
    // Optional: fire a webhook here — currently commented out
    // await fetch(process.env.LEAD_WEBHOOK_URL!, { method: 'POST', body: JSON.stringify(contact) })

    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
}
