export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  location: string;
  neighborhood: string;
  type: 'Residential' | 'Commercial';
  status: 'For Rent' | 'For Sale';
  beds: number;
  baths: number;
  size: number;
  description: string;
  images: string[];
  features: string[];
  agent: {
    name: string;
    phone: string;
    image: string;
  };
  coordinates: [number, number];
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury 4 Bedroom Villa in Kololo',
    slug: 'luxury-4-bedroom-villa-kololo',
    price: 3500,
    location: 'Kololo, Kampala',
    neighborhood: 'Kololo',
    type: 'Residential',
    status: 'For Rent',
    beds: 4,
    baths: 4,
    size: 450,
    description: 'A stunning modern villa located in the heart of Kololo. Features a private swimming pool, landscaped garden, and high-end finishes throughout.',
    images: [
      'https://picsum.photos/seed/prop1/1200/800',
      'https://picsum.photos/seed/prop1b/1200/800',
      'https://picsum.photos/seed/prop1c/1200/800'
    ],
    features: ['Swimming Pool', 'Garden', 'Security', 'AC', 'Parking'],
    agent: {
      name: 'Sarah Namono',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent1/200/200'
    },
    coordinates: [0.3285, 32.5911]
  },
  {
    id: '2',
    title: 'Modern 2 Bedroom Apartment in Nakasero',
    slug: 'modern-2-bedroom-apartment-nakasero',
    price: 1800,
    location: 'Nakasero, Kampala',
    neighborhood: 'Nakasero',
    type: 'Residential',
    status: 'For Rent',
    beds: 2,
    baths: 2,
    size: 120,
    description: 'Fully furnished apartment with panoramic city views. Close to major embassies and business centers.',
    images: [
      'https://picsum.photos/seed/prop2/1200/800',
      'https://picsum.photos/seed/prop2b/1200/800'
    ],
    features: ['City View', 'Gym', 'Elevator', 'Furnished', '24/7 Security'],
    agent: {
      name: 'John Kato',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent2/200/200'
    },
    coordinates: [0.3185, 32.5811]
  },
  {
    id: '3',
    title: 'Prime Commercial Space in Bugolobi',
    slug: 'prime-commercial-space-bugolobi',
    price: 5000,
    location: 'Bugolobi, Kampala',
    neighborhood: 'Bugolobi',
    type: 'Commercial',
    status: 'For Rent',
    beds: 0,
    baths: 2,
    size: 300,
    description: 'Ideal for a retail showroom or corporate office. High foot traffic area with excellent visibility.',
    images: [
      'https://picsum.photos/seed/prop3/1200/800',
      'https://picsum.photos/seed/prop3b/1200/800'
    ],
    features: ['High Visibility', 'Ample Parking', 'Backup Generator', 'CCTV'],
    agent: {
      name: 'Sarah Namono',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent1/200/200'
    },
    coordinates: [0.3155, 32.6111]
  },
  {
    id: '4',
    title: 'Cozy 3 Bedroom House in Muyenga',
    slug: 'cozy-3-bedroom-house-muyenga',
    price: 2200,
    location: 'Muyenga, Kampala',
    neighborhood: 'Muyenga',
    type: 'Residential',
    status: 'For Rent',
    beds: 3,
    baths: 3,
    size: 200,
    description: 'A quiet family home with a beautiful view of Lake Victoria.',
    images: [
      'https://picsum.photos/seed/prop4/1200/800',
      'https://picsum.photos/seed/prop4b/1200/800'
    ],
    features: ['Lake View', 'Quiet Area', 'Garden', 'Balcony'],
    agent: {
      name: 'David Musoke',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent3/200/200'
    },
    coordinates: [0.2985, 32.6011]
  },
  {
    id: '5',
    title: 'Penthouse Apartment in Naguru',
    slug: 'penthouse-apartment-naguru',
    price: 4500,
    location: 'Naguru, Kampala',
    neighborhood: 'Naguru',
    type: 'Residential',
    status: 'For Sale',
    beds: 4,
    baths: 4,
    size: 350,
    description: 'Ultra-luxury penthouse with private rooftop terrace and pool.',
    images: [
      'https://picsum.photos/seed/prop5/1200/800',
      'https://picsum.photos/seed/prop5b/1200/800'
    ],
    features: ['Rooftop Pool', 'Private Elevator', 'Smart Home', 'Wine Cellar'],
    agent: {
      name: 'John Kato',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent2/200/200'
    },
    coordinates: [0.3485, 32.6011]
  },
  {
    id: '6',
    title: 'Office Suite in Kampala CBD',
    slug: 'office-suite-kampala-cbd',
    price: 1200,
    location: 'CBD, Kampala',
    neighborhood: 'CBD',
    type: 'Commercial',
    status: 'For Rent',
    beds: 0,
    baths: 1,
    size: 80,
    description: 'Modern office suite in a Grade A building. High-speed internet and shared reception.',
    images: [
      'https://picsum.photos/seed/prop6/1200/800',
      'https://picsum.photos/seed/prop6b/1200/800'
    ],
    features: ['Fiber Internet', 'Receptionist', 'Meeting Rooms', 'Central AC'],
    agent: {
      name: 'David Musoke',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent3/200/200'
    },
    coordinates: [0.3136, 32.5811]
  },
  {
    id: '7',
    title: 'Contemporary 5 Bedroom Mansion in Naguru',
    slug: 'contemporary-5-bedroom-mansion-naguru',
    price: 6000,
    location: 'Naguru, Kampala',
    neighborhood: 'Naguru',
    type: 'Residential',
    status: 'For Rent',
    beds: 5,
    baths: 6,
    size: 600,
    description: 'A masterpiece of contemporary architecture. This mansion offers unparalleled luxury with a home cinema, infinity pool, and smart home automation.',
    images: [
      'https://picsum.photos/seed/prop7/1200/800',
      'https://picsum.photos/seed/prop7b/1200/800',
      'https://picsum.photos/seed/prop7c/1200/800'
    ],
    features: ['Home Cinema', 'Infinity Pool', 'Smart Home', 'Wine Cellar', 'Staff Quarters'],
    agent: {
      name: 'Sarah Namono',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent1/200/200'
    },
    coordinates: [0.3455, 32.6055]
  },
  {
    id: '8',
    title: 'Elegant 3 Bedroom Apartment in Bugolobi',
    slug: 'elegant-3-bedroom-apartment-bugolobi',
    price: 2500,
    location: 'Bugolobi, Kampala',
    neighborhood: 'Bugolobi',
    type: 'Residential',
    status: 'For Rent',
    beds: 3,
    baths: 3,
    size: 180,
    description: 'Spacious and elegantly furnished apartment in a secure complex. Features a large balcony with garden views.',
    images: [
      'https://picsum.photos/seed/prop8/1200/800',
      'https://picsum.photos/seed/prop8b/1200/800'
    ],
    features: ['Furnished', 'Swimming Pool', 'Gym', '24/7 Security'],
    agent: {
      name: 'John Kato',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent2/200/200'
    },
    coordinates: [0.3185, 32.6155]
  },
  {
    id: '9',
    title: 'Modern Retail Space in Ntinda',
    slug: 'modern-retail-space-ntinda',
    price: 3000,
    location: 'Ntinda, Kampala',
    neighborhood: 'Ntinda',
    type: 'Commercial',
    status: 'For Rent',
    beds: 0,
    baths: 1,
    size: 150,
    description: 'Prime retail space on a busy street. Excellent foot traffic and large display windows.',
    images: [
      'https://picsum.photos/seed/prop9/1200/800',
      'https://picsum.photos/seed/prop9b/1200/800'
    ],
    features: ['Street Frontage', 'Large Windows', 'Parking', 'Security'],
    agent: {
      name: 'David Musoke',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent3/200/200'
    },
    coordinates: [0.3555, 32.6111]
  },
  {
    id: '10',
    title: 'Luxury 4 Bedroom House in Mbuya',
    slug: 'luxury-4-bedroom-house-mbuya',
    price: 4000,
    location: 'Mbuya, Kampala',
    neighborhood: 'Mbuya',
    type: 'Residential',
    status: 'For Rent',
    beds: 4,
    baths: 4,
    size: 400,
    description: 'Exquisite family home with a large garden and swimming pool. Located in a quiet and secure neighborhood.',
    images: [
      'https://picsum.photos/seed/prop10/1200/800',
      'https://picsum.photos/seed/prop10b/1200/800'
    ],
    features: ['Swimming Pool', 'Large Garden', 'Security', 'Backup Power'],
    agent: {
      name: 'Sarah Namono',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent1/200/200'
    },
    coordinates: [0.3255, 32.6211]
  },
  {
    id: '11',
    title: 'Executive Office Floor in Nakasero',
    slug: 'executive-office-floor-nakasero',
    price: 8000,
    location: 'Nakasero, Kampala',
    neighborhood: 'Nakasero',
    type: 'Commercial',
    status: 'For Rent',
    beds: 0,
    baths: 4,
    size: 500,
    description: 'Full floor office space in a prestigious building. High-end finishes and state-of-the-art facilities.',
    images: [
      'https://picsum.photos/seed/prop11/1200/800',
      'https://picsum.photos/seed/prop11b/1200/800'
    ],
    features: ['Fiber Internet', 'Central AC', 'Meeting Rooms', '24/7 Access'],
    agent: {
      name: 'John Kato',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent2/200/200'
    },
    coordinates: [0.3211, 32.5855]
  },
  {
    id: '12',
    title: 'Charming 3 Bedroom Cottage in Entebbe',
    slug: 'charming-3-bedroom-cottage-entebbe',
    price: 1500,
    location: 'Entebbe, Uganda',
    neighborhood: 'Entebbe',
    type: 'Residential',
    status: 'For Rent',
    beds: 3,
    baths: 2,
    size: 150,
    description: 'A beautiful cottage with lake views and a peaceful atmosphere. Perfect for a weekend getaway or a quiet home.',
    images: [
      'https://picsum.photos/seed/prop12/1200/800',
      'https://picsum.photos/seed/prop12b/1200/800'
    ],
    features: ['Lake View', 'Garden', 'Quiet Area', 'Parking'],
    agent: {
      name: 'David Musoke',
      phone: '0772803170',
      image: 'https://picsum.photos/seed/agent3/200/200'
    },
    coordinates: [0.0511, 32.4611]
  }
];

export const neighborhoods = [
  { name: 'Kololo', count: 12, image: 'https://picsum.photos/seed/kololo/400/300' },
  { name: 'Nakasero', count: 8, image: 'https://picsum.photos/seed/nakasero/400/300' },
  { name: 'Naguru', count: 15, image: 'https://picsum.photos/seed/naguru/400/300' },
  { name: 'Bugolobi', count: 10, image: 'https://picsum.photos/seed/bugolobi/400/300' },
  { name: 'Muyenga', count: 7, image: 'https://picsum.photos/seed/muyenga/400/300' },
  { name: 'Ntinda', count: 14, image: 'https://picsum.photos/seed/ntinda/400/300' }
];
