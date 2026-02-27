import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { properties } from '@/src/data/mockData';
import { MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapPreview() {
  const center: [number, number] = [0.3476, 32.5825]; // Kampala center

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Interactive Exploration</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">Map Your <span className="italic text-accent">Future</span></h2>
          <p className="text-muted-text text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Visualize your next home in its true context. Explore neighborhoods, amenities, and proximity to Kampala's key landmarks.
          </p>
        </div>

        <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-[8px] border-bg-light group">
          <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full w-full grayscale contrast-125 brightness-95 hover:grayscale-0 transition-all duration-1000">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {properties.map((prop) => (
              <Marker key={prop.id} position={prop.coordinates}>
                <Popup className="premium-popup">
                  <div className="w-64 p-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                      <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-accent text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {prop.status}
                      </div>
                    </div>
                    <h4 className="font-serif font-bold text-primary text-lg mb-1">{prop.title}</h4>
                    <div className="flex items-center gap-1 text-muted-text text-[10px] uppercase font-bold tracking-widest mb-3">
                      <MapPin className="w-3 h-3 text-accent" />
                      {prop.location}
                    </div>
                    <p className="text-accent font-serif font-bold text-xl">${prop.price.toLocaleString()}<span className="text-[10px] text-muted-text uppercase font-sans ml-1">/mo</span></p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Decorative Overlay */}
          <div className="absolute inset-0 pointer-events-none border-[1px] border-white/20 rounded-[3.5rem] m-2" />
        </div>
      </div>
    </section>
  );
}
