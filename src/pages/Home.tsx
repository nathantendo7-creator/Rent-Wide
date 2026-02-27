import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/src/components/home/Hero';
import Neighborhoods from '@/src/components/home/Neighborhoods';
import TrustSignals from '@/src/components/home/TrustSignals';
import MapPreview from '@/src/components/home/MapPreview';
import Testimonials from '@/src/components/home/Testimonials';
import ListingCard from '@/src/components/property/ListingCard';
import { properties } from '@/src/data/mockData';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const featured = properties.slice(0, 3);

  useEffect(() => {
    // Featured section animation
    gsap.fromTo(featuredRef.current?.querySelectorAll('.listing-card-anim'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 80%",
        }
      }
    );

    // Parallax reveal for the middle section
    gsap.fromTo(parallaxRef.current?.querySelector('.parallax-bg'),
      { scale: 1.3 },
      {
        scale: 1,
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <div className="home-page overflow-hidden">
      <Hero />

      {/* Featured Listings - More Spacious */}
      <section ref={featuredRef} className="py-32 px-6 bg-bg-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Curated Selection</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">Featured <br />Residences</h2>
              <p className="text-muted-text text-lg leading-relaxed">
                Explore our hand-picked selection of Kampala's most exceptional properties, where luxury meets lifestyle.
              </p>
            </div>
            <Link to="/search" className="group flex items-center gap-4 text-primary font-bold text-lg hover:text-accent transition-colors">
              View All Listings
              <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-primary transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featured.map((prop) => (
              <div key={prop.id} className="listing-card-anim">
                <ListingCard property={prop} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Full-Width Section */}
      <section ref={parallaxRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="parallax-bg absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687940-4e524cb35a36?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
            Uncompromising <br />
            <span className="italic text-accent">Quality</span>
          </h2>
          <p className="text-xl text-white/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            We believe that luxury is in the details. From the initial consultation to the final handover, we ensure every step of your journey is handled with absolute precision.
          </p>
          <Link to="/about" className="inline-block border border-white/30 hover:bg-white hover:text-primary px-12 py-4 rounded-full font-bold transition-all">
            Our Philosophy
          </Link>
        </div>
      </section>

      <Neighborhoods />
      <Testimonials />
      <TrustSignals />
      <MapPreview />

      {/* Bold CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-[4rem] p-12 md:p-32 relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-20">
              <img
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=2000"
                alt="Architecture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">Ready to find your <br /><span className="italic text-accent">dream home?</span></h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto mb-12 font-light">
                Our team of dedicated experts is ready to guide you through the most exclusive real estate opportunities in Uganda.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/contact" className="bg-accent text-primary px-12 py-5 rounded-full font-bold text-lg hover:bg-white transition-all shadow-2xl">
                  Contact an Agent
                </Link>
                <Link to="/search" className="text-white font-bold hover:text-accent transition-colors flex items-center gap-2">
                  Browse Properties <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
