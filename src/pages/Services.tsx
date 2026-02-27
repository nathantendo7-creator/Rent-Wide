import { motion } from 'motion/react';
import { 
  Building2, 
  Key, 
  BarChart3, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  ClipboardCheck,
  Gem
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Property Management",
    description: "Comprehensive management solutions for residential and commercial properties, ensuring maximum ROI and tenant satisfaction.",
    icon: Building2,
    features: ["Tenant Screening", "Maintenance & Repairs", "Financial Reporting", "Legal Compliance"]
  },
  {
    title: "Real Estate Agency",
    description: "Expert guidance in buying, selling, and letting premium properties across Kampala's most prestigious neighborhoods.",
    icon: Key,
    features: ["Market Analysis", "Professional Photography", "Strategic Marketing", "Negotiation Support"]
  },
  {
    title: "Investment Advisory",
    description: "Strategic consulting for real estate investors looking to build or diversify their portfolios in the Ugandan market.",
    icon: BarChart3,
    features: ["Feasibility Studies", "Portfolio Management", "Risk Assessment", "Market Insights"]
  },
  {
    title: "Facility Management",
    description: "Specialized care for high-end facilities, maintaining the highest standards of luxury and operational efficiency.",
    icon: ShieldCheck,
    features: ["Security Systems", "Energy Management", "Janitorial Services", "Asset Life-cycle Planning"]
  },
  {
    title: "Property Valuation",
    description: "Accurate and professional valuation services for all types of real estate assets, recognized by major financial institutions.",
    icon: ClipboardCheck,
    features: ["Mortgage Valuation", "Insurance Valuation", "Rental Assessment", "Asset Revaluation"]
  },
  {
    title: "Corporate Relocation",
    description: "Seamless relocation services for international organizations and expatriates moving to Uganda.",
    icon: Users,
    features: ["Home Search", "School Selection", "Orientation Tours", "Settling-in Services"]
  }
];

export default function Services() {
  return (
    <div className="pt-40 pb-32 bg-bg-light">
      <div className="max-w-[1800px] mx-auto px-10">
        {/* Header */}
        <div className="mb-24 max-w-4xl">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Our Expertise</span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-primary mb-12 leading-tight">
            Elevated <span className="italic text-accent">Real Estate</span> Solutions
          </h1>
          <p className="text-muted-text text-xl font-light leading-relaxed max-w-2xl">
            RentWide offers a comprehensive suite of services designed to meet the sophisticated needs of property owners, investors, and tenants in Kampala.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-primary/5 border border-gray-100 group hover:border-accent transition-all duration-500"
            >
              <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center text-accent mb-10 group-hover:scale-110 transition-transform duration-500">
                <service.icon className="w-10 h-10" />
              </div>
              
              <h3 className="text-3xl font-serif font-bold text-primary mb-6">{service.title}</h3>
              <p className="text-muted-text mb-10 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-4 mb-12">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-sm font-medium text-primary/70">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact" 
                className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary group-hover:text-accent transition-colors"
              >
                Inquire Now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 relative rounded-[4rem] overflow-hidden bg-primary p-20 text-center">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://picsum.photos/seed/luxury/1920/1080" 
              alt="" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <Gem className="w-16 h-16 text-accent mx-auto mb-10" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
              Experience the <span className="italic text-accent">RentWide</span> Standard
            </h2>
            <p className="text-white/60 text-xl mb-12 font-light">
              Whether you are looking to list a property or seeking expert management, our team is ready to deliver excellence.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-accent text-primary px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
