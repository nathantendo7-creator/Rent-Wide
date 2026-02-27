import { useEffect, useRef } from 'react';
import { Search, MapPin, Home, DollarSign, ChevronDown, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Initial entrance
    tl.fromTo(bgRef.current, 
      { scale: 1.2, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 2 }
    )
    .fromTo(titleRef.current, 
      { y: 150, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5 }, 
      "-=1.5"
    )
    .fromTo(subRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2 }, 
      "-=1.2"
    )
    .fromTo(searchRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      "-=1"
    );

    // Parallax effect on scroll
    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Immersive Background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Estate"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20">
        <div className="flex flex-col items-center text-center">
          <div className="overflow-hidden mb-4">
            <span className="inline-block text-accent font-bold uppercase tracking-[0.4em] text-xs mb-2">Exclusive Real Estate</span>
          </div>
          
          <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-8 leading-[0.85] tracking-tighter text-balance">
            The Art of <br />
            <span className="italic text-accent">Living</span> Well
          </h1>
          
          <p ref={subRef} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-12 text-balance">
            Discover Kampala's most prestigious residences. We curate spaces that aren't just homes, but legacies of architectural excellence.
          </p>

          {/* Minimalist Search Bar */}
          <div
            ref={searchRef}
            className="w-full max-w-4xl bg-white/10 backdrop-blur-2xl p-2 rounded-full border border-white/20 shadow-2xl flex flex-col md:flex-row items-center"
          >
            <div className="flex-1 flex items-center gap-4 px-8 py-4 border-r border-white/10 w-full md:w-auto">
              <MapPin className="text-accent w-5 h-5 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search by neighborhood..." 
                className="bg-transparent text-white placeholder:text-white/50 focus:outline-none w-full font-medium"
              />
            </div>
            
            <div className="flex-1 hidden md:flex items-center gap-4 px-8 py-4 border-r border-white/10">
              <Home className="text-accent w-5 h-5 flex-shrink-0" />
              <select className="bg-transparent text-white focus:outline-none w-full font-medium appearance-none cursor-pointer">
                <option className="text-primary">All Property Types</option>
                <option className="text-primary">Luxury Villas</option>
                <option className="text-primary">Penthouse Suites</option>
              </select>
            </div>

            <button className="bg-accent text-primary px-10 py-4 rounded-full font-bold hover:bg-white transition-all flex items-center gap-3 m-1 w-full md:w-auto justify-center group">
              Explore
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-12 hidden lg:block">
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-white/30" />
          <span className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold">Kampala, Uganda</span>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:block">
        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold mb-2">Featured Listing</span>
          <span className="text-white font-serif text-xl italic">The Summit, Kololo</span>
        </div>
      </div>
    </section>
  );
}
