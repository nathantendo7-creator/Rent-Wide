import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-40 pb-32 bg-bg-light">
      <div className="max-w-[1800px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left Side - Info */}
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Concierge</span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-primary mb-12 leading-tight">
              Connect with <br /> <span className="italic text-accent">Excellence</span>
            </h1>
            <p className="text-muted-text text-xl font-light leading-relaxed mb-16 max-w-xl">
              Our dedicated concierge team is available to assist you with any inquiries regarding our exclusive property collections or bespoke management services.
            </p>

            <div className="space-y-12">
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-accent shrink-0">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">Direct Line</h3>
                  <p className="text-muted-text font-light">0772803170</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-accent shrink-0">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">Digital Inquiries</h3>
                  <p className="text-muted-text font-light">rent@rentwide.co.ug</p>
                  <p className="text-muted-text font-light">deals@rentwide.co.ug</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-accent shrink-0">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">Visit the Gallery</h3>
                  <p className="text-muted-text font-light">Mukisa Mall Ntinda Road-Kampala</p>
                  <p className="text-muted-text font-light">3rd Floor</p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <a 
                href="https://wa.me/256772803170"
                className="inline-flex items-center gap-4 bg-[#25D366] text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-green-500/20 hover:scale-105 transition-all"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp Concierge
              </a>
            </div>
          </div>

          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-16 rounded-[4rem] shadow-2xl shadow-primary/5 border border-gray-100"
          >
            <h2 className="text-3xl font-serif font-bold text-primary mb-10">Send a Message</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">Subject</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light appearance-none cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Property Viewing</option>
                  <option>List My Property</option>
                  <option>Commercial Space</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">Message</label>
                <textarea rows={6} placeholder="How can we assist you today?" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light resize-none"></textarea>
              </div>

              <button className="w-full bg-primary text-white py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-accent transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3">
                <Send className="w-4 h-4" />
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
