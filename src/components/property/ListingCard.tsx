import { Link } from 'react-router-dom';
import { BedDouble, Bath, Square, MapPin, ArrowUpRight } from 'lucide-react';
import { Property } from '@/src/data/mockData';

interface ListingCardProps {
  property: Property;
  key?: string | number;
}

export default function ListingCard({ property }: ListingCardProps) {
  return (
    <Link 
      to={`/property/${property.slug}`}
      className="group block bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            {property.status}
          </span>
          <span className="bg-accent text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            {property.type}
          </span>
        </div>

        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-3xl font-serif font-bold mb-2 leading-tight">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-white/70 text-sm font-medium">
                <MapPin className="w-4 h-4 text-accent" />
                {property.location}
              </div>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-primary">{property.beds}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-primary">{property.baths}</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-primary">{property.size} <span className="text-[10px] uppercase">m²</span></span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-serif font-bold text-primary">${property.price.toLocaleString()}</p>
            <p className="text-[10px] text-muted-text uppercase font-black tracking-widest">Per Month</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
