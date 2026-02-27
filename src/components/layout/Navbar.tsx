import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', path: '/listings' },
    { name: 'Services', path: '/services' },
    { name: 'Team', path: '/team' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHomePage = location.pathname === '/';
  const isLightMode = scrolled || !isHomePage;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-10 py-8',
        scrolled ? 'bg-white/90 backdrop-blur-xl py-6 shadow-sm border-b border-gray-100' : 'bg-transparent'
      )}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className={cn(
            "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500",
            isLightMode ? "bg-primary text-white" : "bg-white text-primary"
          )}>
            <Home className="w-5 h-5" />
          </div>
          <span className={cn(
            "text-2xl font-serif font-bold tracking-tight transition-colors duration-500",
            isLightMode ? "text-primary" : "text-white"
          )}>
            RentWide <span className="italic text-accent">Uganda</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 hover:text-accent',
                location.pathname === link.path
                  ? 'text-accent'
                  : isLightMode ? 'text-primary' : 'text-white'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/list-property"
            className={cn(
              "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500",
              isLightMode
                ? "bg-primary text-white hover:bg-accent"
                : "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-primary"
            )}
          >
            List Property
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={isLightMode ? 'text-primary' : 'text-white'} />
          ) : (
            <Menu className={isLightMode ? 'text-primary' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-primary z-[60] flex flex-col items-center justify-center gap-12"
          >
            <button
              className="absolute top-10 right-10 text-white p-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-serif font-bold text-white hover:text-accent transition-colors italic"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/list-property"
              onClick={() => setIsOpen(false)}
              className="mt-8 bg-accent text-primary px-12 py-4 rounded-full font-bold text-xl"
            >
              List Property
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
