import { Property } from '../data/mockData';

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

export interface BackendListing {
    id: string;
    code: string;
    title: string;
    slug?: string;
    price: number;
    priceFrequency: string;
    bedrooms: number;
    bathrooms?: number;
    size_sqm?: number;
    status: string;
    type: string;
    neighborhood: {
        name: string;
        slug: string;
    };
    thumbUrl: string | null;
    lat: number;
    lng: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    meta?: {
        total: number;
        page: number;
        perPage: number;
        totalPages: number;
    };
}

export const getListings = async (params: any = {}): Promise<ApiResponse<{ listings: BackendListing[]; pagination: { total: number } }>> => {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            queryParams.append(key, params[key]);
        }
    });

    try {
        const response = await fetch(`${API_BASE_URL}/listings?${queryParams.toString()}`);
        const result = await response.json();

        // Adapt the response if it doesn't match the expected structure exactly
        // Looking at listingsController.ts, it returns { success, data, meta }
        // where data is the listings array.
        if (result.success && Array.isArray(result.data)) {
            return {
                success: true,
                data: {
                    listings: result.data,
                    pagination: {
                        total: result.meta?.total || result.data.length
                    }
                }
            };
        }

        return result;
    } catch (error) {
        console.error('API fetch failed:', error);
        return {
            success: false,
            data: { listings: [], pagination: { total: 0 } }
        } as any;
    }
};

export const mapBackendToProperty = (listing: BackendListing): Property => {
    return {
        id: listing.id,
        title: listing.title,
        slug: listing.slug || listing.title.toLowerCase().replace(/ /g, '-'),
        price: listing.price,
        location: `${listing.neighborhood.name}, Kampala`,
        neighborhood: listing.neighborhood.name,
        type: (listing.type === 'Commercial' ? 'Commercial' : 'Residential') as any,
        status: (listing.status === 'For Sale' ? 'For Sale' : 'For Rent') as any,
        beds: listing.bedrooms,
        baths: listing.bathrooms || 2, // fallback
        size: listing.size_sqm || 100, // fallback
        description: '', // not in list view
        images: listing.thumbUrl ? [listing.thumbUrl] : ['https://picsum.photos/seed/placeholder/1200/800'],
        features: [],
        agent: {
            name: 'Agent Name',
            phone: '0700000000',
            image: 'https://picsum.photos/seed/agent/200/200'
        },
        coordinates: [listing.lat, listing.lng]
    };
};
