// prisma/seed.ts
// Populates the DB with demo data: 3 agents, 5 neighborhoods, 10 listings

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER = "https://via.placeholder.com/800x600?text=RentWide";

async function main() {
  console.log("🌱 Seeding RentWide database...");

  // Clean existing data
  await prisma.viewing.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.listingImage.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.neighborhood.deleteMany();
  await prisma.agent.deleteMany();

  // Agents
  const agents = await Promise.all([
    prisma.agent.create({
      data: {
        name: "Sarah Nakato",
        phone: "+256700123456",
        email: "sarah@rentwide.ug",
        photoUrl: "https://via.placeholder.com/200x200?text=Sarah",
        bio: "Senior property consultant with 8 years experience in Kampala real estate.",
      },
    }),
    prisma.agent.create({
      data: {
        name: "David Ochieng",
        phone: "+256701234567",
        email: "david@rentwide.ug",
        photoUrl: "https://via.placeholder.com/200x200?text=David",
        bio: "Specialist in commercial and high-end residential properties.",
      },
    }),
    prisma.agent.create({
      data: {
        name: "Grace Asiimwe",
        phone: "+256702345678",
        email: "grace@rentwide.ug",
        photoUrl: "https://via.placeholder.com/200x200?text=Grace",
        bio: "Expert in affordable housing and first-time buyer guidance.",
      },
    }),
  ]);

  // Neighborhoods
  const neighborhoods = await Promise.all([
    prisma.neighborhood.create({
      data: {
        name: "Kololo",
        slug: "kololo",
        description: "Upscale diplomatic and residential area with tree-lined streets.",
        featureImage: PLACEHOLDER,
        centerLat: 0.3389,
        centerLng: 32.5861,
      },
    }),
    prisma.neighborhood.create({
      data: {
        name: "Ntinda",
        slug: "ntinda",
        description: "Fast-growing suburb popular with professionals and families.",
        featureImage: PLACEHOLDER,
        centerLat: 0.3561,
        centerLng: 32.6247,
      },
    }),
    prisma.neighborhood.create({
      data: {
        name: "Bukoto",
        slug: "bukoto",
        description: "Vibrant residential area close to the city centre.",
        featureImage: PLACEHOLDER,
        centerLat: 0.3447,
        centerLng: 32.5978,
      },
    }),
    prisma.neighborhood.create({
      data: {
        name: "Kisaasi",
        slug: "kisaasi",
        description: "Quiet neighbourhood with good schools and amenities.",
        featureImage: PLACEHOLDER,
        centerLat: 0.3703,
        centerLng: 32.6194,
      },
    }),
    prisma.neighborhood.create({
      data: {
        name: "Naguru",
        slug: "naguru",
        description: "Elevated suburb with panoramic city views.",
        featureImage: PLACEHOLDER,
        centerLat: 0.3292,
        centerLng: 32.6042,
      },
    }),
  ]);

  const [kololo, ntinda, bukoto, kisaasi, naguru] = neighborhoods;
  const [sarah, david, grace] = agents;

  // 10 Listings
  const listingsData = [
    {
      code: "RW-1001",
      slug: "luxury-4bed-villa-kololo",
      title: "Luxury 4-Bedroom Villa in Kololo",
      type: "RENT" as const,
      category: "HOUSE" as const,
      price: 4500000,
      priceFrequency: "MONTHLY" as const,
      bedrooms: 4,
      bathrooms: 3,
      areaSqm: 320.0,
      description: "Stunning 4-bedroom villa in the heart of Kololo. Features a private garden, double garage, and modern finishes throughout. Perfect for executives and diplomats.",
      neighborhoodId: kololo.id,
      agentId: david.id,
      status: "AVAILABLE" as const,
      lat: 0.3398,
      lng: 32.5872,
    },
    {
      code: "RW-1002",
      slug: "modern-2bed-apartment-kololo",
      title: "Modern 2-Bedroom Apartment, Kololo Hill",
      type: "RENT" as const,
      category: "APARTMENT" as const,
      price: 1800000,
      priceFrequency: "MONTHLY" as const,
      bedrooms: 2,
      bathrooms: 2,
      areaSqm: 110.0,
      description: "Contemporary apartment on Kololo Hill with city views, 24/7 security, swimming pool and gym access. Fully furnished available on request.",
      neighborhoodId: kololo.id,
      agentId: sarah.id,
      status: "AVAILABLE" as const,
      lat: 0.337,
      lng: 32.585,
    },
    {
      code: "RW-1003",
      slug: "family-home-3bed-ntinda",
      title: "Spacious 3-Bedroom Family Home — Ntinda",
      type: "RENT" as const,
      category: "HOUSE" as const,
      price: 1500000,
      priceFrequency: "MONTHLY" as const,
      bedrooms: 3,
      bathrooms: 2,
      areaSqm: 200.0,
      description: "Well-maintained 3-bedroom home in a quiet Ntinda close. Large compound, servant quarters, borehole water and 3-phase electricity.",
      neighborhoodId: ntinda.id,
      agentId: grace.id,
      status: "AVAILABLE" as const,
      lat: 0.3572,
      lng: 32.626,
    },
    {
      code: "RW-1004",
      slug: "studio-apartment-ntinda",
      title: "Studio Apartment — Ntinda Shopping Centre",
      type: "RENT" as const,
      category: "APARTMENT" as const,
      price: 650000,
      priceFrequency: "MONTHLY" as const,
      bedrooms: 1,
      bathrooms: 1,
      areaSqm: 45.0,
      description: "Compact studio ideal for young professionals. Walking distance to Ntinda Shopping Centre, reliable water and power, gated complex.",
      neighborhoodId: ntinda.id,
      agentId: grace.id,
      status: "AVAILABLE" as const,
      lat: 0.355,
      lng: 32.623,
    },
    {
      code: "RW-1005",
      slug: "office-suite-bukoto",
      title: "Premium Office Suite — Bukoto",
      type: "RENT" as const,
      category: "OFFICE" as const,
      price: 3200000,
      priceFrequency: "MONTHLY" as const,
      bedrooms: 0,
      bathrooms: 2,
      areaSqm: 180.0,
      description: "Open-plan office suite on the 2nd floor of a modern Bukoto commercial building. Includes reception area, boardroom, fibre internet infrastructure and 24/7 security.",
      neighborhoodId: bukoto.id,
      agentId: david.id,
      status: "AVAILABLE" as const,
      lat: 0.3455,
      lng: 32.599,
    },
    {
      code: "RW-1006",
      slug: "2bed-apartment-bukoto",
      title: "2-Bedroom Apartment for Sale — Bukoto",
      type: "SALE" as const,
      category: "APARTMENT" as const,
      price: 185000000,
      priceFrequency: "ONE_TIME" as const,
      bedrooms: 2,
      bathrooms: 2,
      areaSqm: 95.0,
      description: "Ready for occupation. Tiled throughout, fitted kitchen, backup generator, own title deed. Great investment property.",
      neighborhoodId: bukoto.id,
      agentId: sarah.id,
      status: "AVAILABLE" as const,
      lat: 0.344,
      lng: 32.597,
    },
    {
      code: "RW-1007",
      slug: "residential-plot-kisaasi",
      title: "Residential Plot 50x100ft — Kisaasi",
      type: "SALE" as const,
      category: "LAND" as const,
      price: 95000000,
      priceFrequency: "ONE_TIME" as const,
      bedrooms: 0,
      bathrooms: 0,
      areaSqm: 465.0,
      description: "Freehold 50x100ft residential plot in a gated estate in Kisaasi. All utilities on site, tarmac access road. Ready to build.",
      neighborhoodId: kisaasi.id,
      agentId: david.id,
      status: "AVAILABLE" as const,
      lat: 0.371,
      lng: 32.62,
    },
    {
      code: "RW-1008",
      slug: "3bed-townhouse-kisaasi",
      title: "3-Bedroom Townhouse — Kisaasi",
      type: "RENT" as const,
      category: "HOUSE" as const,
      price: 1200000,
      priceFrequency: "MONTHLY" as const,
      bedrooms: 3,
      bathrooms: 2,
      areaSqm: 165.0,
      description: "End-terrace townhouse in a secure Kisaasi estate. Private garden, two parking spaces, fibre internet available.",
      neighborhoodId: kisaasi.id,
      agentId: grace.id,
      status: "UNDER_OFFER" as const,
      lat: 0.369,
      lng: 32.618,
    },
    {
      code: "RW-1009",
      slug: "5bed-mansion-naguru",
      title: "5-Bedroom Mansion — Naguru Ridge",
      type: "SALE" as const,
      category: "HOUSE" as const,
      price: 950000000,
      priceFrequency: "ONE_TIME" as const,
      bedrooms: 5,
      bathrooms: 5,
      areaSqm: 620.0,
      description: "Breathtaking 5-bedroom mansion on Naguru Ridge with panoramic city views. Infinity pool, staff quarters, smart home system, own borehole and solar backup.",
      neighborhoodId: naguru.id,
      agentId: david.id,
      status: "AVAILABLE" as const,
      lat: 0.33,
      lng: 32.605,
    },
    {
      code: "RW-1010",
      slug: "1bed-apartment-naguru",
      title: "1-Bedroom Apartment — Naguru",
      type: "RENT" as const,
      category: "APARTMENT" as const,
      price: 850000,
      priceFrequency: "MONTHLY" as const,
      bedrooms: 1,
      bathrooms: 1,
      areaSqm: 60.0,
      description: "Neat and modern 1-bedroom apartment on a secure Naguru compound. City views from balcony, reliable power supply, close to Naguru Hospital.",
      neighborhoodId: naguru.id,
      agentId: sarah.id,
      status: "AVAILABLE" as const,
      lat: 0.3285,
      lng: 32.603,
    },
  ];

  for (const data of listingsData) {
    const listing = await prisma.listing.create({ data });
    // 3-4 placeholder images per listing
    await prisma.listingImage.createMany({
      data: [
        { listingId: listing.id, url: `${PLACEHOLDER}&num=1`, sortOrder: 0 },
        { listingId: listing.id, url: `${PLACEHOLDER}&num=2`, sortOrder: 1 },
        { listingId: listing.id, url: `${PLACEHOLDER}&num=3`, sortOrder: 2 },
        { listingId: listing.id, url: `${PLACEHOLDER}&num=4`, sortOrder: 3 },
      ],
    });
  }

  console.log(`✅ Seeded: ${agents.length} agents, ${neighborhoods.length} neighborhoods, ${listingsData.length} listings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
