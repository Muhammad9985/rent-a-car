import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { MessageSquare, Menu, X, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Spotlight', href: '#spotlight' },
    { name: 'Locations', href: '#locations' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-brand-dark/85 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/80'
          : 'py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="group flex items-center space-x-2">
          <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-brand-gold transition-colors duration-300">
            {SITE_CONFIG.brandName}
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest text-zinc-300 hover:text-brand-gold transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Group */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={SITE_CONFIG.getPhoneUrl()}
            className="p-2.5 rounded-full border border-white/10 text-zinc-300 hover:text-white hover:border-brand-gold/50 transition-all duration-300"
            title="Call Concierge"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href={SITE_CONFIG.getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-brand-gold text-black font-semibold text-xs uppercase tracking-wider hover:bg-brand-gold-bright hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-brand-gold/20"
          >
            <MessageSquare className="w-4 h-4 fill-black text-brand-gold" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-lg text-white hover:text-brand-gold border border-white/10 bg-black/40 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-brand-dark/95 backdrop-blur-2xl z-40 border-t border-white/10 flex flex-col justify-between p-6 overflow-y-auto">
          <div className="flex flex-col space-y-6 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-heading font-semibold uppercase tracking-wider text-zinc-200 hover:text-brand-gold transition-colors duration-200 border-b border-white/5 pb-3"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-8 pb-4 flex flex-col space-y-3">
            <a
              href={SITE_CONFIG.getWhatsappUrl("Hi RENT A CAR, I am contacting you via your mobile website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-4 rounded-xl bg-brand-gold text-black font-bold text-sm uppercase tracking-wider shadow-lg shadow-brand-gold/20"
            >
              <MessageSquare className="w-5 h-5 fill-black text-brand-gold" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={SITE_CONFIG.getPhoneUrl()}
              className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl border border-white/20 text-zinc-200 font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Call Concierge ({SITE_CONFIG.primaryPhone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
