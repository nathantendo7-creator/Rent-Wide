import { Property } from '../data/mockData';
import { supabase } from './supabaseClient';

export interface BackendListing {
    id: string;
    code: string;
    title: string;
    slug?: string;
    price: number;
    price_frequency: string;
    bedrooms: number;
    bathrooms?: number;
    area_sqm?: number;
    status: string;
    type: string;
    neighborhood_id?: string;
    agent_id?: string;
    thumb_url: string | null;
    lat: number;
    lng: number;
    currency?: string;
    description?: string;
    category?: string;
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
    try {
        const queryParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                queryParams.append(key, String(params[key]));
            }
        });

        const qs = queryParams.toString();
        const functionName = qs ? `get-listings?${qs}` : 'get-listings';

        const { data: response, error } = await supabase.functions.invoke(functionName, {
            method: 'GET'
        });

        if (error) throw error;

        // Adapt the response structure
        if (response?.success && Array.isArray(response.data)) {
            return {
                success: true,
                data: {
                    listings: response.data,
                    pagination: {
                        total: response.meta?.total || response.data.length
                    }
                }
            };
        }

        return response as any;
    } catch (error) {
        console.error('API fetch failed:', error);
        return {
            success: false,
            data: { listings: [], pagination: { total: 0 } }
        } as any;
    }
};

export const getListingById = async (id: string): Promise<ApiResponse<BackendListing | null>> => {
    try {
        const { data: response, error } = await supabase.functions.invoke(`get-listings?id=${id}`, {
            method: 'GET'
        });

        if (error) throw error;
        return response as any;
    } catch (error) {
        console.error('API fetch failed:', error);
        return {
            success: false,
            data: null
        } as any;
    }
};

export const createListing = async (listingData: any): Promise<ApiResponse<BackendListing | null>> => {
    try {
        const { data: response, error } = await supabase.functions.invoke('get-listings', {
            method: 'POST',
            body: listingData
        });

        if (error) throw error;
        return response as any;
    } catch (error) {
        console.error('API post failed:', error);
        return {
            success: false,
            data: null
        } as any;
    }
};

export const mapBackendToProperty = (listing: BackendListing): Property => {
    return {
        id: listing.id,
        title: listing.title,
        slug: listing.slug || listing.title.toLowerCase().replace(/ /g, '-'),
        price: listing.price,
        location: 'Kampala, Uganda',
        neighborhood: listing.neighborhood_id || 'Kampala',
        type: (listing.type === 'SALE' ? 'Commercial' : 'Residential') as any,
        status: (listing.type === 'SALE' ? 'For Sale' : 'For Rent') as any,
        beds: listing.bedrooms,
        baths: listing.bathrooms || 2,
        size: listing.area_sqm || 100,
        description: listing.description || '',
        images: listing.thumb_url ? [listing.thumb_url] : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
        features: [],
        agent: {
            name: 'RentWide Agent',
            phone: '+256700000000',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200'
        },
        coordinates: [listing.lat || 0.3136, listing.lng || 32.5811]
    };
};
