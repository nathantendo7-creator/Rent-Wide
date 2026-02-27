import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-32 pb-12 px-10">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
        {/* Brand */}
        <div className="space-y-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <Home className="text-primary w-5 h-5" />
            </div>
            <span className="text-3xl font-serif font-bold tracking-tight">
              RentWide <span className="italic text-accent">Uganda</span>
            </span>
          </Link>
          <p className="text-white/50 leading-relaxed font-light text-lg">
            Curating Kampala's most prestigious residences. We bridge the gap between architectural excellence and discerning lifestyles.
          </p>
          <div className="flex gap-6">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="text-white/30 hover:text-accent transition-colors">
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-accent">Navigation</h4>
          <ul className="space-y-6 text-white/60 font-medium">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/listings" className="hover:text-white transition-colors">Collections</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/team" className="hover:text-white transition-colors">Meet the Team</Link></li>
            <li><Link to="/list-property" className="hover:text-white transition-colors">List With Us</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Neighborhoods */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-accent">Enclaves</h4>
          <ul className="space-y-6 text-white/60 font-medium">
            <li><Link to="/listings" className="hover:text-white transition-colors italic font-serif">Kololo Hills</Link></li>
            <li><Link to="/listings" className="hover:text-white transition-colors italic font-serif">Nakasero Heights</Link></li>
            <li><Link to="/listings" className="hover:text-white transition-colors italic font-serif">Naguru Peak</Link></li>
            <li><Link to="/listings" className="hover:text-white transition-colors italic font-serif">Bugolobi Gardens</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-accent">Concierge</h4>
          <ul className="space-y-8 text-white/60">
            <li className="flex gap-4">
              <MapPin className="w-5 h-5 text-accent shrink-0" />
              <span className="leading-relaxed">Mukisa Mall Ntinda Road-Kampala,<br />3rd Floor</span>
            </li>
            <li className="flex gap-4 items-center">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <span>0772803170</span>
            </li>
            <li className="flex gap-4 items-center">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <span>rent@rentwide.co.ug</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-[10px] uppercase font-black tracking-[0.2em]">
        <p>© {new Date().getFullYear()} RentWide Uganda. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
