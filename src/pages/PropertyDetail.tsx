import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  BedDouble, Bath, Square, MapPin, Phone, MessageCircle,
  Calendar, Share2, Heart, ChevronLeft, ChevronRight, CheckCircle2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { cn } from '@/src/lib/utils';
import { getListingById, mapBackendToProperty } from '@/src/lib/api';
import { Property } from '@/src/data/mockData';

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const response = await getListingById(slug);
        if (response.success && response.data) {
          setProperty(mapBackendToProperty(response.data));
        }
      } catch (error) {
        console.error('Failed to fetch property:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [slug]);

  if (loading) return <div className="pt-40 text-center animate-pulse text-2xl font-serif text-muted-text">Loading Residence...</div>;
  if (!property) return <div className="pt-40 text-center text-2xl font-serif text-muted-text">Property Not Found</div>;

  return (
    <div className="pt-32 pb-32 bg-bg-light">
      <div className="max-w-[1800px] mx-auto px-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <div className="w-1 h-1 bg-accent rounded-full" />
              <Link to="/listings" className="hover:text-primary transition-colors">Collections</Link>
              <div className="w-1 h-1 bg-accent rounded-full" />
              <span className="text-primary/40 truncate">{property.title}</span>
            </nav>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6 leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-3 text-muted-text text-xl font-light">
              <MapPin className="w-6 h-6 text-accent" />
              {property.location}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">Investment</p>
            <p className="text-5xl md:text-6xl font-serif font-bold text-primary mb-2">
              ${property.price.toLocaleString()}
            </p>
            <p className="text-sm text-muted-text uppercase font-black tracking-widest">{property.status === 'For Rent' ? 'Per Month' : 'One Time'}</p>
          </div>
        </div>

        {/* Immersive Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-24">
          <div className="lg:col-span-3 relative aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl group">
            <img
              src={property.images[activeImage]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

            <div className="absolute inset-0 flex items-center justify-between px-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button
                onClick={() => setActiveImage(prev => (prev > 0 ? prev - 1 : property.images.length - 1))}
                className="w-16 h-16 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center hover:bg-accent hover:text-white transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() => setActiveImage(prev => (prev < property.images.length - 1 ? prev + 1 : 0))}
                className="w-16 h-16 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center hover:bg-accent hover:text-white transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="absolute bottom-10 right-10 bg-primary/80 backdrop-blur-xl text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest">
              {activeImage + 1} / {property.images.length} Perspectives
            </div>
          </div>

          <div className="hidden lg:grid grid-rows-3 gap-8">
            {property.images.slice(1, 4).map((img, i) => (
              <div
                key={i}
                className={cn(
                  "relative rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer group",
                  activeImage === i + 1 ? "ring-4 ring-accent" : ""
                )}
                onClick={() => setActiveImage(i + 1)}
              >
                <img src={img} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                {i === 2 && property.images.length > 4 && (
                  <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm flex items-center justify-center text-white font-serif font-bold text-2xl italic">
                    +{property.images.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-24">
            <section>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 p-12 bg-white rounded-[3.5rem] shadow-2xl shadow-primary/5 border border-gray-100">
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Status</span>
                  <span className="text-xl font-serif font-bold text-primary italic">{property.status}</span>
                </div>
                <div className="flex flex-col items-center gap-4 text-center border-l border-gray-100">
                  <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Bedrooms</span>
                  <div className="flex items-center gap-3">
                    <BedDouble className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-serif font-bold text-primary">{property.beds}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 text-center border-l border-gray-100">
                  <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Bathrooms</span>
                  <div className="flex items-center gap-3">
                    <Bath className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-serif font-bold text-primary">{property.baths}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 text-center border-l border-gray-100">
                  <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Area</span>
                  <div className="flex items-center gap-3">
                    <Square className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-serif font-bold text-primary">{property.size} <span className="text-xs uppercase font-sans font-black">m²</span></span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-4xl font-serif font-bold text-primary mb-10">The <span className="italic text-accent">Experience</span></h2>
              <p className="text-muted-text leading-relaxed text-xl font-light">
                {property.description}
              </p>
            </section>

            <section>
              <h2 className="text-4xl font-serif font-bold text-primary mb-10">Refined <span className="italic text-accent">Features</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-[2rem] shadow-2xl shadow-primary/5 border border-gray-100 group hover:border-accent transition-colors">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-primary text-sm tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-4xl font-serif font-bold text-primary mb-10">Prime <span className="italic text-accent">Location</span></h2>
              <div className="h-[500px] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white">
                <MapContainer center={property.coordinates} zoom={15} scrollWheelZoom={false} className="h-full w-full grayscale contrast-125">
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                  <Marker position={property.coordinates} />
                </MapContainer>
              </div>
            </section>

            <section className="bg-white p-16 rounded-[4rem] shadow-2xl shadow-primary/5 border border-gray-100">
              <h2 className="text-4xl font-serif font-bold text-primary mb-10">Schedule a <span className="italic text-accent">Private Viewing</span></h2>
              <p className="text-muted-text text-lg font-light mb-12">
                Experience this masterpiece in person. Our concierge will arrange a private tour at your convenience.
              </p>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Phone Number</label>
                  <input type="tel" placeholder="+256 ..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Preferred Date</label>
                  <input type="date" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light appearance-none" />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Message</label>
                  <textarea rows={4} placeholder="Any specific requirements for your visit?" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light resize-none"></textarea>
                </div>
                <button className="md:col-span-2 bg-primary text-white py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-accent transition-all shadow-2xl shadow-primary/20">
                  Request Private Tour
                </button>
              </form>
            </section>
          </div>

          {/* Sidebar - Luxury Concierge */}
          <aside className="space-y-12">
            <div className="bg-primary p-12 rounded-[4rem] shadow-2xl text-white sticky top-40">
              <div className="flex items-center gap-6 mb-12">
                <img src={property.agent.image} alt={property.agent.name} className="w-20 h-20 rounded-3xl object-cover shadow-2xl grayscale" />
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-1 italic">{property.agent.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Private Concierge</p>
                </div>
              </div>

              <div className="space-y-6">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="w-full flex items-center justify-center gap-4 bg-white text-primary py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all shadow-2xl"
                >
                  <Phone className="w-5 h-5" />
                  Direct Connection
                </a>
                <a
                  href={`https://wa.me/${property.agent.phone.replace(/\s/g, '')}`}
                  className="w-full flex items-center justify-center gap-4 bg-white/10 border border-white/20 text-white py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-primary transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <button className="w-full flex items-center justify-center gap-4 bg-accent text-primary py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl">
                  <Calendar className="w-5 h-5" />
                  Schedule Private Tour
                </button>
              </div>

              <div className="mt-16 pt-12 border-t border-white/10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-8">Request Dossier</h4>
                <form className="space-y-6">
                  <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light" />
                  <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light" />
                  <textarea placeholder="Special Requirements" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent resize-none font-light"></textarea>
                  <button className="w-full bg-white text-primary py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all">
                    Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
