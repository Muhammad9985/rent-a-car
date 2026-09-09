import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import type { Vehicle } from '../config/siteConfig';
import { MessageSquare, Users, Gauge, Zap, Car } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FleetShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const categories = ['ALL', 'Sports Coupe', 'Luxury SUV', 'Performance Sedan', 'Grand Tourer', 'Executive Off-Roader'];

  const filteredFleet = activeCategory === 'ALL'
    ? SITE_CONFIG.fleet
    : SITE_CONFIG.fleet.filter(v => v.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (trackRef.current && sectionRef.current) {
        const track = trackRef.current;
        const padding = window.innerWidth < 640 ? 40 : 120;
        const totalScrollWidth = track.scrollWidth - window.innerWidth + padding;

        if (totalScrollWidth > 0) {
          // Pinned horizontal track scroll scrub timeline for both Mobile & Desktop
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${totalScrollWidth + (window.innerWidth < 640 ? 500 : 800)}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          // 1. Scrub background zoom
          tl.to(imageRef.current, { scale: 1.35, ease: 'none' }, 0);

          // 2. Scrub horizontal movement
          tl.to(track, { x: -totalScrollWidth, ease: 'none' }, 0);
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredFleet, activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="fleet"
      className="relative w-full h-dvh min-h-[620px] overflow-hidden flex flex-col justify-center bg-brand-surface border-t border-white/10"
    >
      {/* Full-Bleed Background Photography with Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src="/images/bmw_m5.jpg"
          alt="RENT A CAR Fleet Showcase Backdrop"
          className="w-full h-full object-cover object-center transform origin-center will-change-transform opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/70 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10 pointer-events-none"></div>
      </div>

      {/* Hero-Style Content Header Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full mb-4 sm:mb-8 shrink-0">
        {/* Glass Label Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border-brand-gold/30 mb-2 sm:mb-4 shadow-2xl">
          <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-zinc-300 font-semibold">
            Flagship Collection
          </span>
        </div>

        {/* Editorial Heading */}
        <h2 className="font-heading text-2xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-3 gold-gradient-text px-2">
          FIND YOUR PERFECT RIDE.
        </h2>

        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-2 w-full max-w-full no-scrollbar px-2 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand-gold text-black shadow-lg shadow-brand-gold/25 scale-105'
                  : 'glass-panel text-zinc-400 hover:text-white hover:border-brand-gold/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Storytelling Track */}
      <div className="relative w-full z-20 overflow-hidden">
        <div
          ref={trackRef}
          className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 lg:px-12 w-max pb-2 lg:pb-0 will-change-transform"
        >
          {filteredFleet.map((vehicle: Vehicle) => (
            <div
              key={vehicle.id}
              className="group relative w-[82vw] max-w-[320px] sm:w-[420px] lg:w-[400px] shrink-0 rounded-2xl glass-panel overflow-hidden border border-white/15 hover:border-brand-gold/50 transition-all duration-500 flex flex-col justify-between shadow-2xl backdrop-blur-xl"
            >
              {/* Card Image Container */}
              <div className="relative h-40 sm:h-60 overflow-hidden bg-black/60">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-black/40"></div>

                {/* Category Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-gold font-semibold">
                  {vehicle.category}
                </div>

                {/* Daily Price Badge */}
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 z-10 text-right">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400 block">Starting At</span>
                  <span className="font-heading text-base sm:text-xl font-bold text-brand-gold">
                    ${vehicle.pricePerDay} <span className="text-[9px] sm:text-xs font-normal text-zinc-300">/ day</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 font-mono block mb-1">
                    {vehicle.brand}
                  </span>
                  <h3 className="font-heading text-base sm:text-xl font-extrabold uppercase tracking-tight text-white mb-1 group-hover:text-brand-gold transition-colors duration-300">
                    {vehicle.model}
                  </h3>
                  <p className="text-[11px] text-zinc-400 italic mb-3 sm:mb-5">"{vehicle.tagline}"</p>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl bg-black/50 border border-white/5 text-center mb-4 sm:mb-6">
                    <div className="flex flex-col items-center">
                      <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold mb-1" />
                      <span className="text-[8px] sm:text-[10px] text-zinc-400 uppercase">Power</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-white">{vehicle.specs.power}</span>
                    </div>

                    <div className="flex flex-col items-center border-x border-white/5">
                      <Gauge className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold mb-1" />
                      <span className="text-[8px] sm:text-[10px] text-zinc-400 uppercase">0-100</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-white">{vehicle.specs.acceleration}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold mb-1" />
                      <span className="text-[8px] sm:text-[10px] text-zinc-400 uppercase">Seats</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-white">{vehicle.seats} Seats</span>
                    </div>
                  </div>
                </div>

                {/* Primary WhatsApp Direct CTA */}
                <a
                  href={SITE_CONFIG.getWhatsappUrl(
                    `Hi RENT A CAR, I am interested in renting the ${vehicle.brand} ${vehicle.model} (${vehicle.category}). Please let me know availability and pricing.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 sm:py-3.5 rounded-xl bg-brand-gold text-black font-extrabold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-brand-gold-bright transition-colors duration-300 shadow-md shadow-brand-gold/10 active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black text-brand-gold shrink-0" />
                  <span>Ask About This Car</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
