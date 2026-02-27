import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "How do I start the process of renting a property?",
    answer: "The process begins with browsing our curated listings. Once you find a property of interest, you can schedule a private viewing through our website or by contacting our concierge. After the viewing, if you wish to proceed, we will guide you through the application and lease agreement process."
  },
  {
    question: "What documents are required for a lease agreement?",
    answer: "Typically, we require a valid government-issued ID (Passport or National ID), proof of income or employment, and references from previous landlords if applicable. For corporate leases, we require company registration documents and a board resolution."
  },
  {
    question: "Does RentWide handle property maintenance?",
    answer: "For properties under our full management service, yes. We have a dedicated facility management team that handles all maintenance requests, repairs, and emergency services. For other listings, maintenance responsibilities are outlined in the specific lease agreement."
  },
  {
    question: "How are rental payments handled?",
    answer: "Rental payments are typically made via bank transfer or mobile money to our secure corporate accounts. We provide digital receipts and monthly statements for all transactions. Payment schedules (monthly, quarterly, or annually) are agreed upon during the lease negotiation."
  },
  {
    question: "Can I list my property with RentWide?",
    answer: "Absolutely. We are always looking for premium properties to add to our portfolio. You can submit your property details through our 'List With Us' page, and one of our advisors will contact you for a professional evaluation."
  },
  {
    question: "What areas of Kampala do you specialize in?",
    answer: "We specialize in Kampala's most prestigious neighborhoods, including Kololo, Nakasero, Naguru, Bugolobi, Muyenga, and Mbuya. We also handle exclusive properties in Entebbe and prime vacation spots across Uganda."
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  key?: any;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={onClick}
        className="w-full py-10 flex items-center justify-between text-left group"
      >
        <span className="text-2xl font-serif font-bold text-primary group-hover:text-accent transition-colors">{question}</span>
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-10 text-muted-text text-lg font-light leading-relaxed max-w-3xl">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-40 pb-32 bg-bg-light">
      <div className="max-w-[1800px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Left Side */}
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Assistance</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-12 leading-tight">
              Frequently <br /> Asked <span className="italic text-accent">Questions</span>
            </h1>
            <p className="text-muted-text text-xl font-light leading-relaxed mb-12">
              Everything you need to know about our services and the real estate process in Uganda.
            </p>
            <div className="p-10 bg-primary rounded-[3rem] text-white">
              <h3 className="text-2xl font-serif font-bold mb-6">Still have questions?</h3>
              <p className="text-white/60 mb-8 font-light">Our concierge team is available 24/7 to assist you with any inquiries.</p>
              <button className="w-full bg-accent text-primary py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all">
                Contact Concierge
              </button>
            </div>
          </div>

          {/* Right Side - FAQ List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-primary/5 border border-gray-100">
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
