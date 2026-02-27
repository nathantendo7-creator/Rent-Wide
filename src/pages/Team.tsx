import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Instagram } from 'lucide-react';

const team = [
  {
    name: "Sarah Namubiru",
    role: "Managing Director",
    bio: "With over 15 years in the Ugandan real estate market, Sarah leads RentWide with a vision for excellence and integrity.",
    image: "https://picsum.photos/seed/agent1/600/800",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    name: "James Okello",
    role: "Technical Director",
    bio: "James oversees all property valuations and facility management operations, ensuring every asset meets our elite standards.",
    image: "https://picsum.photos/seed/agent2/600/800",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    name: "Aisha Nakato",
    role: "Head of Residential Sales",
    bio: "Aisha specializes in Kampala's luxury enclaves, connecting discerning buyers with the city's most exclusive residences.",
    image: "https://picsum.photos/seed/agent3/600/800",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    name: "David Ssemwanga",
    role: "Property Management Lead",
    bio: "David's focus on tenant relations and operational efficiency has made RentWide a trusted name for property owners.",
    image: "https://picsum.photos/seed/agent4/600/800",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    name: "Brenda Akello",
    role: "Investment Advisor",
    bio: "Brenda provides strategic insights for our corporate clients and high-net-worth investors looking to grow their portfolios.",
    image: "https://picsum.photos/seed/agent5/600/800",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    name: "Marcus Thorne",
    role: "Expatriate Services",
    bio: "Having lived in 5 countries, Marcus understands the unique needs of our international clients moving to Uganda.",
    image: "https://picsum.photos/seed/agent6/600/800",
    socials: { linkedin: "#", instagram: "#" }
  }
];

export default function Team() {
  return (
    <div className="pt-40 pb-32 bg-bg-light">
      <div className="max-w-[1800px] mx-auto px-10">
        {/* Header */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Our People</span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-primary mb-12 leading-tight">
            Meet the <span className="italic text-accent">Visionaries</span>
          </h1>
          <p className="text-muted-text text-xl font-light leading-relaxed">
            A collective of industry experts dedicated to redefining the real estate experience in Uganda through passion and professionalism.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden mb-8 shadow-2xl">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Social Overlay */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-3">{member.role}</p>
                <h3 className="text-3xl font-serif font-bold text-primary mb-4">{member.name}</h3>
                <p className="text-muted-text font-light leading-relaxed max-w-sm mx-auto">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Us Section */}
        <div className="mt-40 p-20 bg-white rounded-[4rem] shadow-2xl shadow-primary/5 border border-gray-100 text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-8">Want to <span className="italic text-accent">Join</span> Our Team?</h2>
          <p className="text-muted-text text-xl mb-12 max-w-2xl mx-auto font-light">
            We are always looking for passionate individuals who share our commitment to excellence.
          </p>
          <button className="bg-primary text-white px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-accent transition-all shadow-2xl shadow-primary/20">
            View Careers
          </button>
        </div>
      </div>
    </div>
  );
}
