import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import type { OfficeLocation } from '../config/siteConfig';
import { MapPin, Phone, MessageSquare, Navigation, Clock, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OfficeLocations: React.FC = () => {
  const [activeCityId, setActiveCityId] = useState<string>(SITE_CONFIG.locations[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeLocation = SITE_CONFIG.locations.find(l => l.id === activeCityId) || SITE_CONFIG.locations[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        const distance = window.innerWidth < 640 ? 1200 : 1800;

        // Pinned city hub scroll scrub timeline for both Mobile & Desktop
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${distance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) {
              setActiveCityId(SITE_CONFIG.locations[0].id);
            } else if (p < 0.66) {
              setActiveCityId(SITE_CONFIG.locations[1].id);
            } else {
              setActiveCityId(SITE_CONFIG.locations[2].id);
            }
          },
        });

        // Background zoom scrub
        gsap.to(imageRef.current, {
          scale: 1.35,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${distance}`,
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="locations"
      className="relative w-full h-dvh min-h-[600px] overflow-hidden flex items-center justify-center bg-brand-dark border-t border-white/10"
    >
      {/* Dynamic Full-Bleed Background Photography with Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          key={activeLocation.id}
          src={activeLocation.image}
          alt={`${activeLocation.city} RENT A CAR City Backdrop`}
          className="w-full h-full object-cover object-center transform origin-center will-change-transform opacity-40 animate-fade-in transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10 pointer-events-none"></div>
      </div>

      {/* Hero-Style Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full">
        {/* Glass Label Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border-brand-gold/40 mb-3 sm:mb-5 shadow-2xl">
          <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-brand-gold font-bold">
            Physical Concierge Hubs
          </span>
        </div>

        {/* Editorial Heading */}
        <h2 className="font-heading text-2xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-2 sm:mb-4 gold-gradient-text px-2">
          OUR LOCATIONS.
        </h2>

        {/* Subtitle */}
        <p className="max-w-2xl text-xs sm:text-base md:text-lg text-zinc-300 font-light tracking-wide mb-6 sm:mb-10 text-balance px-2">
          Visit our private executive lounges or request white-glove vehicle delivery anywhere across Karachi, Lahore, and Islamabad.
        </p>

        {/* City Switcher Tabs */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-10 overflow-x-auto pb-2 w-full max-w-full no-scrollbar px-2 sm:px-0">
          {SITE_CONFIG.locations.map((loc: OfficeLocation) => (
            <button
              key={loc.id}
              onClick={() => setActiveCityId(loc.id)}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3.5 py-1.5 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-300 shrink-0 ${
                activeCityId === loc.id
                  ? 'bg-brand-gold text-black shadow-lg shadow-brand-gold/25 scale-105'
                  : 'glass-panel text-zinc-400 hover:text-white border-white/10'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{loc.city}</span>
            </button>
          ))}
        </div>

        {/* Selected City Executive Card */}
        <div ref={cardRef} className="w-full max-w-4xl rounded-2xl sm:rounded-3xl glass-panel border border-white/15 p-4 sm:p-12 text-left shadow-2xl backdrop-blur-xl transition-all duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 sm:pb-6 mb-4 sm:mb-6 gap-2 sm:gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[9px] sm:text-xs font-mono font-bold uppercase">
                  {activeLocation.city} HUB
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-400 flex items-center space-x-1 font-mono">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold shrink-0" />
                  <span>{activeLocation.hours}</span>
                </span>
              </div>
              <h3 className="font-heading text-lg sm:text-3xl md:text-4xl font-extrabold text-white uppercase">
                {activeLocation.officeName}
              </h3>
            </div>

            <a
              href={activeLocation.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl border border-white/15 text-zinc-300 font-semibold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 hover:text-white hover:border-brand-gold/40 transition-colors shrink-0 w-full sm:w-auto"
            >
              <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
              <span>Get Directions</span>
            </a>
          </div>

          <p className="text-zinc-300 text-xs sm:text-base leading-relaxed flex items-start space-x-2 sm:space-x-3 mb-5 sm:mb-8">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold shrink-0 mt-0.5" />
            <span>{activeLocation.address}</span>
          </p>

          {/* Action Triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
            <a
              href={SITE_CONFIG.getWhatsappUrl(`Hi RENT A CAR ${activeLocation.city}, I would like to arrange vehicle pickup/delivery.`, activeLocation.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 sm:py-4 px-4 sm:px-6 rounded-xl bg-brand-gold text-black font-extrabold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-brand-gold-bright active:scale-95 transition-all shadow-lg shadow-brand-gold/15"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black text-brand-gold shrink-0" />
              <span>WhatsApp {activeLocation.city} Office</span>
            </a>

            <a
              href={SITE_CONFIG.getPhoneUrl(activeLocation.phone)}
              className="py-3 sm:py-4 px-4 sm:px-6 rounded-xl glass-panel text-white font-semibold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:border-brand-gold/40 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
              <span>Call Hub ({activeLocation.phone})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
