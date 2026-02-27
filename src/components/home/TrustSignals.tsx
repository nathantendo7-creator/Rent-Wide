import { useEffect, useRef } from 'react';
import { ShieldCheck, Clock, Users, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const signals = [
  {
    icon: Clock,
    title: '10+ Years Experience',
    desc: 'Deep knowledge of the Kampala real estate market and trends.'
  },
  {
    icon: Users,
    title: '500+ Happy Clients',
    desc: 'We pride ourselves on building lasting relationships with our clients.'
  },
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    desc: 'Every property on our platform is thoroughly vetted for authenticity.'
  },
  {
    icon: Zap,
    title: 'Fast Response',
    desc: 'Our agents are dedicated to providing quick and efficient service.'
  }
];

export default function TrustSignals() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current?.querySelectorAll('.trust-card'), 
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Our Commitment</span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-8 leading-tight">The RentWide <span className="italic text-accent">Standard</span></h2>
          <p className="text-muted-text text-xl max-w-2xl mx-auto font-light leading-relaxed">
            We are committed to providing a seamless real estate experience through transparency, expertise, and personalized service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {signals.map((item, i) => (
            <div key={i} className="trust-card group text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 mx-auto shadow-xl border border-gray-50 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                <item.icon className="w-8 h-8 text-accent group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">{item.title}</h3>
              <p className="text-muted-text text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
