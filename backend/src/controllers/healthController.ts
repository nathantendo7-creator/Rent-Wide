// src/controllers/healthController.ts

import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export async function getHealth(req: Request, res: Response, next: NextFunction) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      data: {
        status: "ok",
        db: "reachable",
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version ?? "1.0.0",
      },
    });
  } catch (err) {
    next(err);
  }
}
