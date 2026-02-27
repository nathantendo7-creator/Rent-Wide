import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Robert Okello",
    role: "CEO, TechPoint Uganda",
    text: "RentWide didn't just find us an office; they found us a home for our vision. Their understanding of the Bugolobi business ecosystem is unparalleled. The transition was flawless.",
    image: "https://picsum.photos/seed/user1/100/100",
    rating: 5,
    location: "Bugolobi"
  },
  {
    name: "Aisha Nakato",
    role: "International Consultant",
    text: "As a frequent traveler, I needed a property manager I could trust blindly. Sarah and her team at RentWide have exceeded every expectation. My Kololo villa is in perfect hands.",
    image: "https://picsum.photos/seed/user2/100/100",
    rating: 5,
    location: "Kololo"
  },
  {
    name: "David Ssemwanga",
    role: "Senior Architect",
    text: "From an architectural standpoint, the properties RentWide curates are top-tier. Their eye for quality and structural integrity is what sets them apart in the Kampala market.",
    image: "https://picsum.photos/seed/user3/100/100",
    rating: 5,
    location: "Naguru"
  },
  {
    name: "Brenda Namubiru",
    role: "Restaurateur",
    text: "Securing a prime spot in Nakasero for my new restaurant seemed impossible. RentWide used their network to find a location that wasn't even on the market yet. Truly elite service.",
    image: "https://picsum.photos/seed/user4/100/100",
    rating: 5,
    location: "Nakasero"
  },
  {
    name: "Marcus Thorne",
    role: "Expat Director",
    text: "Moving to Uganda was a big step. RentWide made the housing part the easiest. They understood my requirements for security and proximity to international schools perfectly.",
    image: "https://picsum.photos/seed/user5/100/100",
    rating: 5,
    location: "Muyenga"
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Duplicate reviews for seamless loop
    const totalWidth = scrollContainer.scrollWidth;
    
    const animation = gsap.to(scrollContainer, {
      x: `-${totalWidth / 2}`,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    // Pause on hover
    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    // GSAP Scroll Animation for the section header
    const header = containerRef.current?.querySelector('.testimonial-header');
    if (header) {
      gsap.fromTo(header, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }

    return () => {
      animation.kill();
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-primary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-24 testimonial-header">
        <div className="flex flex-col items-center text-center">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Client Testimonials</span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
            Voices of <span className="italic text-accent">Excellence</span>
          </h2>
          <p className="text-white/60 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Our reputation is built on the success stories of our clients. Join the elite community of property owners who choose RentWide.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-primary to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-primary to-transparent z-10" />

        <div 
          ref={scrollRef}
          className="flex gap-12 whitespace-nowrap py-4"
          style={{ width: 'fit-content' }}
        >
          {[...reviews, ...reviews].map((review, i) => (
            <div 
              key={i} 
              className="inline-block w-[500px] bg-white/5 backdrop-blur-sm p-12 rounded-[3rem] border border-white/10 whitespace-normal group hover:border-accent transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-current" />
                  ))}
                </div>
                <Quote className="w-12 h-12 text-accent/20 group-hover:text-accent/40 transition-colors" />
              </div>
              
              <p className="text-white/90 text-xl font-serif italic leading-relaxed mb-12 min-h-[140px]">
                "{review.text}"
              </p>

              <div className="flex items-center gap-5 pt-10 border-t border-white/10">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-16 h-16 rounded-2xl object-cover shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div>
                  <h4 className="font-bold text-white text-xl">{review.name}</h4>
                  <p className="text-[10px] text-accent font-black uppercase tracking-[0.2em] mb-1">{review.role}</p>
                  <div className="flex items-center gap-1 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                    <MapPin className="w-3 h-3" />
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
