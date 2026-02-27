import { motion } from 'motion/react';
import { Shield, Target, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-40 pb-32 bg-bg-light">
      <div className="max-w-[1800px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Our Heritage</span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-primary mb-12 leading-tight">
              Redefining <br />
              <span className="italic text-accent">Excellence</span> in Uganda
            </h1>
            <p className="text-xl text-muted-text mb-8 leading-relaxed font-light max-w-xl">
              RentWide Uganda was founded with a singular vision: to elevate the real estate landscape in Kampala through transparency, innovation, and an unwavering commitment to quality.
            </p>
            <p className="text-xl text-muted-text mb-12 leading-relaxed font-light max-w-xl">
              Our team of local experts brings decades of collective experience and a deep passion for the Ugandan property market, curating only the most prestigious residences for our discerning clientele.
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-5xl font-serif font-bold text-primary mb-2 italic">500+</h4>
                <p className="text-[10px] text-accent uppercase font-black tracking-[0.2em]">Properties Managed</p>
              </div>
              <div>
                <h4 className="text-5xl font-serif font-bold text-primary mb-2 italic">15+</h4>
                <p className="text-[10px] text-accent uppercase font-black tracking-[0.2em]">Years Experience</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/about-team/1200/1500" 
                alt="Our Team" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 bg-primary p-12 rounded-[3rem] shadow-2xl text-white hidden md:block max-w-sm">
              <Quote className="w-12 h-12 text-accent mb-6" />
              <p className="text-2xl font-serif font-bold mb-6 italic leading-relaxed">"Trust is the invisible foundation of every masterpiece we manage."</p>
              <p className="text-[10px] text-accent uppercase font-black tracking-[0.3em]">Nathan Tendo — Founder</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: Shield,
              title: "Our Values",
              text: "Integrity, transparency, and excellence are at the core of everything we do. We believe in honest communication and delivering on our promises."
            },
            {
              icon: Target,
              title: "Our Mission",
              text: "To provide a world-class real estate platform that empowers Ugandans to find, rent, and buy property with confidence and ease."
            },
            {
              icon: Award,
              title: "Our Vision",
              text: "To be the leading real estate agency in East Africa, recognized for our innovation, customer service, and community impact."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-16 rounded-[3.5rem] shadow-2xl shadow-primary/5 border border-gray-100 group hover:border-accent transition-all duration-500">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-10 text-accent group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-primary mb-6">{item.title}</h3>
              <p className="text-muted-text leading-relaxed font-light">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Quote({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91238 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H3.017C2.46472 8 2.017 8.44772 2.017 9V11C2.017 11.5523 1.56928 12 1.017 12H0.017V5H10.017V15C10.017 18.3137 7.33072 21 4.017 21H2.017Z" />
    </svg>
  );
}
