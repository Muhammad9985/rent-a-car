import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import type { TravelDestination } from '../config/siteConfig';
import { MessageSquare, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Destinations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.25,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="destinations" className="relative py-24 sm:py-32 bg-brand-dark border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-3">
              Curated Routes & Expeditions
            </p>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              WHERE WILL YOU GO?
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-zinc-400 text-sm sm:text-base max-w-md font-light">
            From coastal drives to soaring Karakoram mountain highways, RENT A CAR equips you with the perfect vehicle for any terrain.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SITE_CONFIG.destinations.map((dest: TravelDestination) => (
            <div
              key={dest.id}
              className="group relative rounded-3xl glass-panel overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-all duration-500 flex flex-col justify-between shadow-2xl"
            >
              {/* Image Preview Container */}
              <div className="relative h-72 overflow-hidden bg-black">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"></div>

                {/* Subtitle Badge */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-brand-gold font-mono font-bold">
                  {dest.subtitle}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="font-heading text-2xl font-black uppercase text-white mb-3 group-hover:text-brand-gold transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed font-light mb-6">
                    {dest.description}
                  </p>

                  {/* Recommended Vehicle Tag */}
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Compass className="w-4 h-4 text-brand-gold" />
                      <span className="text-xs text-zinc-400 font-mono uppercase">Recommended Match</span>
                    </div>
                    <span className="text-xs font-bold text-white uppercase">{dest.recommendedVehicle}</span>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <a
                  href={SITE_CONFIG.getWhatsappUrl(
                    `Hi RENT A CAR, I am planning a journey to ${dest.name}. I would like to inquire about renting the ${dest.recommendedVehicle}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-brand-gold text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-brand-gold-bright transition-colors shadow-md shadow-brand-gold/10"
                >
                  <MessageSquare className="w-4 h-4 fill-black text-brand-gold" />
                  <span>Plan Your Journey via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
