import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { MessageSquare, Car, Key, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      step: "01",
      title: "CHOOSE YOUR CAR",
      description: "Explore our curated fleet of sports coupes, luxury SUVs, and executive sedans.",
      icon: Car
    },
    {
      step: "02",
      title: "CONTACT CONCIERGE",
      description: "Send a direct message on WhatsApp or call our team. No complex booking engines or deposit forms.",
      icon: MessageSquare
    },
    {
      step: "03",
      title: "HIT THE ROAD",
      description: "Your vehicle is delivered white-glove to your hotel, residence, or airport arrival terminal.",
      icon: Key
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single scroll reveal without pinning
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

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
    <section
      ref={sectionRef}
      className="relative w-full h-auto min-h-screen py-16 sm:py-24 lg:h-dvh lg:py-0 overflow-hidden flex items-center justify-center bg-brand-surface border-t border-white/10"
    >
      {/* Full-Bleed Background Photography with Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src="/images/land_cruiser.jpg"
          alt="RENT A CAR How It Works Backdrop"
          className="w-full h-full object-cover object-center transform origin-center will-change-transform opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/60 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10 pointer-events-none"></div>
      </div>

      {/* Hero-Style Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full">
        {/* Glass Label Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border-brand-gold/40 mb-5 shadow-2xl">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-zinc-300 font-semibold">
            Effortless Mobility
          </span>
        </div>

        {/* Editorial Heading */}
        <h2 className="font-heading text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-3 sm:mb-4 gold-gradient-text px-2">
          IT'S THAT SIMPLE.
        </h2>

        {/* Subtitle */}
        <p className="max-w-2xl text-xs sm:text-base md:text-lg text-zinc-300 font-light tracking-wide mb-8 sm:mb-12 text-balance leading-relaxed px-2">
          We eliminated complicated online reservation forms, long queues, and hidden deposit clauses.
        </p>

        {/* 3 Step Cards Grid — Loads in Single Scroll */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full text-left mb-8 sm:mb-12">
          {steps.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <div
                key={s.step}
                className="group relative p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 hover:border-brand-gold/40 transition-all duration-500 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <span className="font-heading text-4xl sm:text-5xl font-black text-white/20 group-hover:text-brand-gold transition-colors duration-300">
                    {s.step}
                  </span>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/30">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  </div>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-extrabold uppercase text-white tracking-wide mb-2 sm:mb-3 group-hover:text-brand-gold transition-colors">
                  {s.title}
                </h3>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                  {s.description}
                </p>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20 text-zinc-600">
                    <ArrowRight className="w-6 h-6 text-brand-gold/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Button */}
        <a
          href={SITE_CONFIG.getWhatsappUrl("Hi RENT A CAR, I am ready to rent a car.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-brand-gold text-black font-extrabold text-xs uppercase tracking-wider hover:bg-brand-gold-bright transition-all shadow-xl shadow-brand-gold/25 hover:scale-105 active:scale-95"
        >
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-black text-brand-gold shrink-0" />
          <span>Start Your Rental Journey</span>
        </a>
      </div>
    </section>
  );
};
