import React, { useEffect, useRef } from 'react';
import { Car, Clock, Headset, CheckCircle2, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      number: "01",
      title: "PREMIUM FLEET",
      icon: Car,
      description: "Handpicked flagship sports cars, executive sedans, and luxury SUVs maintained to pristine factory standards.",
      highlights: ["Low Mileage Vehicles", "Detailed Before Delivery", "Full Comprehensive Coverage"]
    },
    {
      number: "02",
      title: "FLEXIBLE SERVICE",
      icon: Clock,
      description: "Custom rental durations from daily escapes to monthly corporate leases without rigid online forms or hidden fees.",
      highlights: ["Doorstep Delivery & Pickup", "Flexible Rental Terms", "Zero Red Tape"]
    },
    {
      number: "03",
      title: "PERSONAL SUPPORT",
      icon: Headset,
      description: "Speak directly with our dedicated concierge team via WhatsApp or phone. No chatbots, no queue holds.",
      highlights: ["24/7 WhatsApp Concierge", "On-Demand Chauffeur Option", "Instant Vehicle Upgrades"]
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

      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
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
      id="experience"
      className="relative w-full h-auto min-h-screen py-16 sm:py-24 lg:h-dvh lg:py-0 overflow-hidden flex items-center justify-center bg-brand-dark border-t border-white/10"
    >
      {/* Full-Bleed Background Photography with Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src="/images/porsche_911.jpg"
          alt="RENT A CAR Experience Backdrop"
          className="w-full h-full object-cover object-center transform origin-center will-change-transform opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10 pointer-events-none"></div>
      </div>

      {/* Hero-Style Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full">
        {/* Glass Label Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border-brand-gold/30 mb-5 shadow-2xl">
          <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-zinc-300 font-semibold">
            The RENT A CAR Difference
          </span>
        </div>

        {/* Editorial Heading */}
        <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4 gold-gradient-text px-2">
          MORE THAN A RENTAL.
        </h2>

        {/* Subtitle */}
        <p className="max-w-3xl text-sm sm:text-lg text-zinc-300 font-light tracking-wide mb-8 sm:mb-12 text-balance leading-relaxed px-2">
          Whether you're exploring the city skyline, embarking on a northern mountain expedition, or making an executive entrance, we transform routine car rental into a first-class travel journey.
        </p>

        {/* 3 Floating Glassmorphism Cards — Loads in Single Scroll */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full text-left">
          {experiences.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.number}
                className="group relative p-6 sm:p-8 rounded-2xl glass-panel hover:glass-panel-gold transition-all duration-500 flex flex-col justify-between shadow-2xl backdrop-blur-xl border border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <span className="font-heading text-3xl sm:text-4xl font-extrabold text-zinc-500 group-hover:text-brand-gold transition-colors duration-300">
                      {item.number}
                    </span>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-gold/40 text-brand-gold transition-all duration-300">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-2 sm:mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 sm:pt-5 border-t border-white/10 space-y-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
