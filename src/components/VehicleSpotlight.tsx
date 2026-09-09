import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { MessageSquare, Shield, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VehicleSpotlight: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const gClass = SITE_CONFIG.fleet.find(v => v.id === 'g-class-amg') || SITE_CONFIG.fleet[1];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single scroll background zoom scrub without pinning
      gsap.to(imageRef.current, {
        scale: 1.25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="spotlight"
      className="relative w-full h-auto min-h-screen py-16 sm:py-24 lg:h-dvh lg:py-0 overflow-hidden flex items-center justify-center bg-black border-t border-white/10"
    >
      {/* Full-Bleed Background Photography with Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src={gClass.image}
          alt="Mercedes-AMG G 63 Spotlight"
          className="w-full h-full object-cover object-center transform origin-center will-change-transform opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10 pointer-events-none"></div>
      </div>

      {/* Hero-Style Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full">
        {/* Glass Label Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border-brand-gold/40 mb-5 shadow-2xl">
          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-brand-gold font-bold">
            Flagship Spotlight
          </span>
        </div>

        {/* Editorial Heading */}
        <h2 className="font-heading text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-2 sm:mb-3 gold-gradient-text px-2">
          THE G-CLASS
        </h2>

        {/* Subtitle */}
        <p className="font-heading text-sm sm:text-xl md:text-2xl font-bold uppercase tracking-widest text-brand-gold mb-4 sm:mb-6 px-2">
          ICONIC BY DESIGN. UNMATCHED IN PRESENCE.
        </p>

        {/* Description */}
        <p className="max-w-2xl text-xs sm:text-base md:text-lg text-zinc-300 font-light tracking-wide mb-8 sm:mb-10 text-balance leading-relaxed px-2">
          Engineered with a twin-turbocharged 4.0-liter V8 engine producing 577 horsepower, the Mercedes-AMG G 63 combines ultimate off-road dominance with supreme luxury cabin acoustics.
        </p>

        {/* Numerical Specifications Grid — Opens in Single Scroll */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-8 sm:mb-10 text-center px-2">
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 hover:border-brand-gold/40 transition-all duration-300 backdrop-blur-xl">
            <span className="font-heading text-2xl sm:text-4xl font-extrabold text-white block mb-1">577</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Horsepower</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 hover:border-brand-gold/40 transition-all duration-300 backdrop-blur-xl">
            <span className="font-heading text-2xl sm:text-4xl font-extrabold text-brand-gold block mb-1">4.5s</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 font-mono">0-100 km/h</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 hover:border-brand-gold/40 transition-all duration-300 backdrop-blur-xl">
            <span className="font-heading text-2xl sm:text-4xl font-extrabold text-white block mb-1">AUTO</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 font-mono">9G-TRONIC</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 hover:border-brand-gold/40 transition-all duration-300 backdrop-blur-xl">
            <span className="font-heading text-2xl sm:text-4xl font-extrabold text-white block mb-1">5</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Executive Seats</span>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-10 text-[11px] sm:text-xs text-zinc-300 px-2">
          {[
            "Handcrafted AMG V8 Biturbo Engine",
            "Designo Nappa Leather Seats",
            "Burmester® Surround Sound",
            "Armored Bulletproof Option"
          ].map((feat, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className="p-1 rounded-full bg-brand-gold/20 text-brand-gold shrink-0">
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Primary WhatsApp Action */}
        <a
          href={SITE_CONFIG.getWhatsappUrl(
            `Hi RENT A CAR, I am inquiring about availability for the Mercedes-AMG G 63 Spotlight vehicle.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-brand-gold text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-3 hover:bg-brand-gold-bright hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-brand-gold/25"
        >
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-black text-brand-gold shrink-0" />
          <span>Check G-Class Availability</span>
        </a>
      </div>
    </section>
  );
};
