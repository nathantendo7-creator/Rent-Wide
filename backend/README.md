# RentWide Backend

A lightweight, production-structured REST API for the RentWide demo real estate platform (Kampala, Uganda). Built with Node 20, TypeScript, Express, Prisma, and PostgreSQL.

---

## Quick Start

### 1. Clone and install

```bash
git clone <repo-url>
cd rentwide-backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env if needed — defaults work with docker-compose
```

### 3. Start with Docker Compose (recommended)

```bash
docker-compose up --build
```

This starts both `rentwide-db` (PostgreSQL) and `rentwide-app` (the API on port 3000).

### 4. Or run locally (requires Postgres running)

```bash
# Generate Prisma client
npm run generate

# Run migrations
npm run migrate

# Seed database
npm run seed

# Start dev server (hot-reload)
npm run dev
```

---

## API curl Examples

```bash
# Health check
curl http://localhost:3000/api/health

# List all listings
curl http://localhost:3000/api/listings

# Filter: rent only, page 1
curl "http://localhost:3000/api/listings?type=RENT&page=1&perPage=6"

# Filter: search + price range
curl "http://localhost:3000/api/listings?q=kololo&minPrice=500000&maxPrice=3000000"

# Single listing by slug
curl http://localhost:3000/api/listings/luxury-4bed-villa-kololo

# Nearby listings (Kololo center, 3km radius)
curl "http://localhost:3000/api/listings/nearby?lat=0.3389&lng=32.5861&radius_km=3"

# All neighborhoods
curl http://localhost:3000/api/neighborhoods

# Popular neighborhoods (sorted by listing count)
curl "http://localhost:3000/api/neighborhoods?popular=true"

# Create viewing request
curl -X POST http://localhost:3000/api/viewings \
  -H "Content-Type: application/json" \
  -d '{
    "listingId": "<LISTING_ID>",
    "name": "John Doe",
    "phone": "+256700000001",
    "preferredDatetime": "2025-06-15T10:00:00Z",
    "message": "I would like to view on Saturday morning."
  }'

# Create contact lead
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+256700000002",
    "message": "Tell me more about 3-bed apartments in Ntinda."
  }'

# Seed database (dev only)
curl -X POST http://localhost:3000/api/seed
```

---

## Exposing with ngrok (for demos)

```bash
# Install ngrok: https://ngrok.com/download
ngrok http 3000

# ngrok will output a public URL like:
#   https://abc123.ngrok.io
# Use that as your base URL for demo testing or sharing with a frontend dev.
```

---

## Pagination

All list endpoints support `?page=1&perPage=12`. Response includes a `meta` object:

```json
{
  "meta": {
    "page": 1,
    "perPage": 12,
    "total": 10,
    "totalPages": 1
  }
}
```

---

## Response Envelope

All responses follow this shape:

```json
{ "success": true, "data": {} }
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [] } }
```

---

## CORS

CORS is set to `*` (all origins) for demo purposes. **In production**, update `src/server.ts` to restrict to your frontend domain:

```ts
app.use(cors({ origin: "https://yourfrontend.com" }));
```

---

## Running Tests

```bash
npm test
```

Tests require a running PostgreSQL instance (uses `DATABASE_URL` from `.env`).

---

## Project Structure

```
rentwide-backend/
├── src/
│   ├── index.ts               # Entry point
│   ├── server.ts              # Express app factory
│   ├── routes/                # Route definitions
│   ├── controllers/           # Business logic handlers
│   ├── lib/
│   │   ├── prisma.ts          # Prisma singleton
│   │   └── validation.ts      # Zod schemas
│   └── middleware/
│       └── errorHandler.ts    # Centralised error handling
├── prisma/
│   ├── schema.prisma          # Data model
│   └── seed.ts                # Demo seed data
├── tests/
│   └── health.test.ts         # Jest tests
├── docs/
│   └── postman_collection.json
├── openapi.yaml               # OpenAPI 3.0 spec
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## Notes

- **No auth** — this is a demo backend. Add JWT/OAuth before going to production.
- **No email sending** — leads are logged to console. Uncomment webhook in `contactsController.ts` to fire a notification.
- **Maps** — the backend only provides `lat`/`lng` coordinates. Map rendering is a front-end concern.
- **WhatsApp** — generate WhatsApp links on the frontend using the agent's `phone` field.
