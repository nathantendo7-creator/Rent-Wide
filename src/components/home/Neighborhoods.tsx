import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { neighborhoods } from '@/src/data/mockData';
import { ArrowRight } from 'lucide-react';

export default function Neighborhoods() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current?.querySelectorAll('.neighborhood-card'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Prime Locations</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">Elite <br />Neighborhoods</h2>
            <p className="text-muted-text text-lg leading-relaxed">
              Explore the most prestigious enclaves in Kampala. From the historic charm of Nakasero to the modern luxury of Kololo.
            </p>
          </div>
          <Link to="/listings" className="text-accent font-bold text-lg hover:underline tracking-widest uppercase text-[12px]">
            Explore All Areas
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {neighborhoods.slice(0, 4).map((area, i) => (
            <div
              key={i}
              className={`neighborhood-card relative rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl ${i === 1 || i === 2 ? 'md:h-[600px]' : 'md:h-[450px]'} h-[400px]`}
            >
              <img
                src={area.image}
                alt={area.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 text-white">
                <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">{area.count} Listings</span>
                <h3 className="text-4xl font-serif font-bold mb-4">{area.name}</h3>
                <div className="flex items-center gap-2 text-white/60 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  View Neighborhood <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
