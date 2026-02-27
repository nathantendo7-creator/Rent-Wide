// src/controllers/seedController.ts
// Dev-only: runs the seed script via POST /api/seed

import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/errorHandler";
import { execSync } from "child_process";

export async function runSeed(req: Request, res: Response, next: NextFunction) {
  try {
    if (process.env.NODE_ENV === "production") {
      throw new AppError(403, "FORBIDDEN", "Seed is disabled in production");
    }

    execSync("npx ts-node prisma/seed.ts", { stdio: "inherit" });

    res.json({ success: true, data: { message: "Database seeded successfully" } });
  } catch (err) {
    next(err);
  }
}
