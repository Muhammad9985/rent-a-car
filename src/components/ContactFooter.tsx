import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { MessageSquare, Phone, Mail, MapPin, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactFooter: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const conversionCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single scroll background zoom scrub without pinning
      gsap.to(imageRef.current, {
        scale: 1.25,
        ease: 'none',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      if (conversionCardRef.current) {
        gsap.fromTo(
          conversionCardRef.current,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: conversionCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="relative w-full bg-black text-white overflow-hidden border-t border-white/10 pt-16 sm:pt-20 pb-10 sm:pb-12">
      {/* Full-Bleed Background Photography with Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src="/images/range_rover.jpg"
          alt="RENT A CAR Contact & Footer Backdrop"
          className="w-full h-full object-cover object-center transform origin-center will-change-transform opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10 pointer-events-none"></div>
      </div>

      {/* Main Hero-Style Content Overlay — Opens in Single Scroll */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Stats Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {SITE_CONFIG.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-8 rounded-2xl glass-panel text-center border border-white/10 hover:border-brand-gold/40 transition-all duration-300 shadow-2xl backdrop-blur-xl"
            >
              <span className="font-heading text-2xl sm:text-5xl font-black text-brand-gold block mb-1 sm:mb-2">
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-xs uppercase tracking-widest text-zinc-300 font-mono font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Central Conversion CTA Card */}
        <div
          ref={conversionCardRef}
          className="rounded-2xl sm:rounded-3xl glass-panel-gold p-6 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl backdrop-blur-2xl border border-brand-gold/30 mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/40 mb-5">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-brand-gold font-bold">
              Instant Concierge Booking
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4 sm:mb-6 gold-gradient-text px-2">
            READY TO HIT THE ROAD?
          </h2>

          <p className="text-zinc-300 text-xs sm:text-lg font-light max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Tell us your destination and preferred vehicle. Our executive concierge handles delivery, paperwork, and support 24/7.
          </p>

          {/* Action Triggers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={SITE_CONFIG.getWhatsappUrl("Hi RENT A CAR, I would like to book a luxury car rental right now.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-brand-gold text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-3 hover:bg-brand-gold-bright hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-brand-gold/30"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-black text-brand-gold shrink-0" />
              <span>CHAT ON WHATSAPP NOW</span>
            </a>

            <a
              href={SITE_CONFIG.getPhoneUrl()}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-5 rounded-full glass-panel text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 hover:border-brand-gold/50 transition-all"
            >
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <span>CALL CONCIERGE</span>
            </a>

            <a
              href={SITE_CONFIG.getEmailUrl()}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-5 rounded-full border border-white/15 text-zinc-300 font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 hover:text-white hover:border-white/30 transition-all"
            >
              <Mail className="w-4 h-4 text-brand-gold shrink-0" />
              <span>EMAIL US</span>
            </a>
          </div>
        </div>

        {/* Footer Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 pt-8 border-t border-white/10 text-center md:text-left">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3 sm:space-y-4">
            <a href="#home" className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-white block">
              {SITE_CONFIG.brandName}
            </a>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm mx-auto md:mx-0">
              Flagship luxury automotive mobility across Pakistan. Pristine sports coupes, luxury SUVs, and executive sedans.
            </p>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-brand-gold mb-3 sm:mb-4">Navigation</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-zinc-400 font-light">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Experience</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">Fleet Collection</a></li>
              <li><a href="#spotlight" className="hover:text-white transition-colors">Vehicle Spotlight</a></li>
              <li><a href="#locations" className="hover:text-white transition-colors">Physical Hubs</a></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="hidden md:block">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-brand-gold mb-3 sm:mb-4">Metro Hubs</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-zinc-400 font-light">
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Karachi — DHA Phase 6</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Lahore — Gulberg III</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Islamabad — Blue Area</span>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="hidden md:block">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-brand-gold mb-3 sm:mb-4">Direct Contact</h4>
            <div className="space-y-2.5 sm:space-y-3 text-xs text-zinc-400 font-mono">
              <a href={SITE_CONFIG.getWhatsappUrl()} target="_blank" rel="noopener noreferrer" className="block hover:text-brand-gold">
                WhatsApp: {SITE_CONFIG.primaryWhatsapp}
              </a>
              <a href={SITE_CONFIG.getPhoneUrl()} className="block hover:text-brand-gold">
                Phone: {SITE_CONFIG.primaryPhone}
              </a>
              <a href={SITE_CONFIG.getEmailUrl()} className="block hover:text-brand-gold">
                Email: {SITE_CONFIG.primaryEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 sm:pt-8 mt-8 sm:mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-zinc-500 font-mono gap-3 sm:gap-4">
          <p>© 2026 {SITE_CONFIG.brandName}. All rights reserved.</p>
          <p className="text-zinc-400">
            Developed by{' '}
            <a
              href="https://mr-software.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-brand-gold-bright hover:underline font-semibold transition-colors"
            >
              MR Software
            </a>
          </p>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a href="#home" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#home" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href={SITE_CONFIG.getWhatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Concierge WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
