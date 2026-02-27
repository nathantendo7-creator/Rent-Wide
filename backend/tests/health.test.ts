// tests/health.test.ts
// Tests: GET /api/health and GET /api/listings

import request from "supertest";
import { createApp } from "../src/server";
import { prisma } from "../src/lib/prisma";

const app = createApp();

afterAll(async () => {
  await prisma.$disconnect();
});

describe("GET /api/health", () => {
  it("returns 200 with success: true shape", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("status");
    expect(res.body.data).toHaveProperty("db");
    expect(res.body.data).toHaveProperty("timestamp");
  });
});

describe("GET /api/listings", () => {
  it("returns 200 with success: true and data array", async () => {
    const res = await request(app).get("/api/listings");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body).toHaveProperty("meta");
    expect(res.body.meta).toHaveProperty("total");
    expect(res.body.meta).toHaveProperty("page");
    expect(res.body.meta).toHaveProperty("perPage");
    expect(res.body.meta).toHaveProperty("totalPages");
  });

  it("filters by type=RENT", async () => {
    const res = await request(app).get("/api/listings?type=RENT");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    res.body.data.forEach((l: { type?: string }) => {
      if (l.type) expect(l.type).toBe("RENT");
    });
  });
});

describe("GET /api/neighborhoods", () => {
  it("returns 200 with success: true and data array", async () => {
    const res = await request(app).get("/api/neighborhoods");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe("POST /api/contacts validation", () => {
  it("returns 400 if phone is missing", async () => {
    const res = await request(app)
      .post("/api/contacts")
      .send({ name: "Test", message: "Hello there" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});
