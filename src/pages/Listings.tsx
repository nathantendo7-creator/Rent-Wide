import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Grid, Map as MapIcon, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Property } from '@/src/data/mockData';
import ListingCard from '@/src/components/property/ListingCard';
import { cn } from '@/src/lib/utils';
import { getListings, mapBackendToProperty, BackendListing } from '@/src/lib/api';

export default function SearchPage() {
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchQuery) params.search = searchQuery;
      
      const response = await getListings(params);
      if (response.success) {
        setProperties(response.data.listings.map((l: BackendListing) => mapBackendToProperty(l)));
        setTotalCount(response.data.pagination.total);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchListings();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="pt-40 pb-32 px-10 min-h-screen bg-bg-light">
      <div className="max-w-[1800px] mx-auto">
        {/* Search Header - Luxury Style */}
        <div className="mb-20">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Our Collections</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-12 leading-tight">Find Your <span className="italic text-accent">Signature</span> Home</h1>
          
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-accent w-6 h-6 group-focus-within:scale-110 transition-transform" />
              <input
                type="text"
                placeholder="Search by neighborhood, street or property name..."
                className="w-full bg-white pl-16 pr-8 py-6 rounded-full shadow-2xl shadow-primary/5 border border-gray-100 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all text-lg font-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex bg-white p-2 rounded-full shadow-2xl shadow-primary/5 border border-gray-100">
                <button
                  onClick={() => setView('grid')}
                  className={cn(
                    "flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                    view === 'grid' ? "bg-primary text-white shadow-xl" : "text-muted-text hover:bg-gray-50"
                  )}
                >
                  <Grid className="w-4 h-4" />
                  Grid
                </button>
                <button
                  onClick={() => setView('map')}
                  className={cn(
                    "flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                    view === 'map' ? "bg-primary text-white shadow-xl" : "text-muted-text hover:bg-gray-50"
                  )}
                >
                  <MapIcon className="w-4 h-4" />
                  Map
                </button>
              </div>
              <button className="flex items-center justify-center gap-3 px-10 py-4 bg-white border border-gray-100 rounded-full shadow-2xl shadow-primary/5 font-black text-[10px] uppercase tracking-[0.2em] text-primary hover:bg-accent hover:text-white transition-all">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
          {/* Sidebar Filters - Refined */}
          <aside className="hidden lg:block space-y-12 sticky top-40 h-fit">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-primary/5 border border-gray-100">
              <h3 className="text-2xl font-serif font-bold text-primary mb-10 flex items-center gap-3">
                <Filter className="w-6 h-6 text-accent" />
                Refine
              </h3>

              <div className="space-y-10">
                <div>
                  <label className="block text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-6">Property Type</label>
                  <div className="space-y-4">
                    {['All Types', 'Residential', 'Commercial', 'Land'].map((type) => (
                      <label key={type} className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="type" className="peer appearance-none w-5 h-5 border-2 border-gray-100 rounded-full checked:border-accent transition-all" defaultChecked={type === 'All Types'} />
                          <div className="absolute w-2 h-2 bg-accent rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                        </div>
                        <span className="text-sm font-medium text-primary/70 group-hover:text-accent transition-colors">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-6">Price Range (USD)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="Min" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-accent font-medium" />
                    <input type="number" placeholder="Max" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-accent font-medium" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-6">Bedrooms</label>
                  <div className="flex flex-wrap gap-3">
                    {['Any', '1+', '2+', '3+', '4+'].map((num) => (
                      <button key={num} className={cn(
                        "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all",
                        num === 'Any' ? "bg-primary text-white border-primary shadow-lg" : "bg-white text-primary border-gray-100 hover:border-accent"
                      )}>
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] mt-12 hover:bg-accent transition-all shadow-2xl shadow-primary/20">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results Area */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-serif font-bold text-primary">
                {totalCount} <span className="italic text-accent">Residences</span> Found
              </h2>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                <span className="text-muted-text">Sort:</span>
                <select className="bg-transparent text-primary focus:outline-none cursor-pointer">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {loading ? (
                [1, 2, 4].map(i => (
                  <div key={i} className="animate-pulse bg-white rounded-[2.5rem] aspect-[4/5] shadow-lg" />
                ))
              ) : properties.length > 0 ? (
                properties.map((prop) => (
                  <ListingCard key={prop.id} property={prop} />
                ))
              ) : (
                <div className="col-span-full py-32 text-center">
                  <p className="text-2xl font-serif text-muted-text">No properties found matching your search.</p>
                </div>
              )}
            </div>

            {/* Pagination - Refined */}
            <div className="mt-24 flex justify-center items-center gap-6">
              <button className="w-14 h-14 rounded-full bg-primary text-white font-black text-xs shadow-2xl shadow-primary/20">1</button>
              <button className="w-14 h-14 rounded-full bg-white border border-gray-100 text-primary font-black text-xs hover:border-accent transition-all">2</button>
              <button className="w-14 h-14 rounded-full bg-white border border-gray-100 text-primary font-black text-xs hover:border-accent transition-all">3</button>
              <div className="w-10 h-[1px] bg-gray-200" />
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-accent transition-colors">Next Page</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
