import { motion } from 'motion/react';
import { 
  Camera, 
  MapPin, 
  Home, 
  DollarSign, 
  CheckCircle2,
  UploadCloud
} from 'lucide-react';

export default function ListProperty() {
  return (
    <div className="pt-40 pb-32 bg-bg-light">
      <div className="max-w-[1800px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left Side - Info */}
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Partnership</span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-primary mb-12 leading-tight">
              List Your <br /> <span className="italic text-accent">Masterpiece</span>
            </h1>
            <p className="text-muted-text text-xl font-light leading-relaxed mb-16 max-w-xl">
              Partner with Kampala's most recognized real estate brand. We don't just list properties; we showcase them to the right audience.
            </p>

            <div className="space-y-12">
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-accent shrink-0">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">Professional Showcase</h3>
                  <p className="text-muted-text font-light">We provide professional photography and cinematic video tours for every elite listing.</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-accent shrink-0">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">Strategic Exposure</h3>
                  <p className="text-muted-text font-light">Your property will be featured across our exclusive network and premium marketing channels.</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-accent shrink-0">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">Qualified Leads</h3>
                  <p className="text-muted-text font-light">Our screening process ensures you only interact with serious, high-intent buyers and tenants.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-16 rounded-[4rem] shadow-2xl shadow-primary/5 border border-gray-100"
          >
            <h2 className="text-3xl font-serif font-bold text-primary mb-10">Property Details</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Property Name</label>
                  <input type="text" placeholder="e.g. The Grand Villa" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Location</label>
                  <input type="text" placeholder="e.g. Kololo, Kampala" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Property Type</label>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light appearance-none">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Land</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent">Expected Price (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                    <input type="number" placeholder="0.00" className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-accent font-light" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">Description</label>
                <textarea rows={4} placeholder="Tell us about the unique features of your property..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent font-light resize-none"></textarea>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">Upload Photos</label>
                <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center hover:border-accent transition-colors cursor-pointer group">
                  <UploadCloud className="w-12 h-12 text-gray-300 mx-auto mb-4 group-hover:text-accent transition-colors" />
                  <p className="text-sm text-muted-text font-light">Drag and drop images or <span className="text-accent font-bold">browse files</span></p>
                  <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Max file size: 10MB</p>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-accent transition-all shadow-2xl shadow-primary/20">
                Submit Listing Request
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
