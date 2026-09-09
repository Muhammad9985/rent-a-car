import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { MessageSquare, ChevronDown, Phone, Mail, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth background image zoom & content parallax scrub on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 1. Background image zoom & shift
      tl.to(imageRef.current, {
        scale: 1.3,
        y: 80,
        ease: 'none',
      }, 0);

      // 2. Editorial text parallax fade out
      tl.to(contentRef.current, {
        opacity: 0,
        y: -120,
        scale: 0.95,
        ease: 'none',
      }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full h-dvh min-h-[620px] overflow-hidden flex items-center justify-center bg-brand-dark"
    >
      {/* Full-Bleed Background Photography with Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src="/images/hero_car.jpg"
          alt="RENT A CAR Luxury Rental Car"
          className="w-full h-full object-cover object-center transform origin-center will-change-transform"
        />
        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-black/70 z-10"></div>
        <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10 pointer-events-none"></div>
      </div>

      {/* Hero Central Content */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-20 sm:pt-24 will-change-transform"
      >
        {/* Badge Label */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border-brand-gold/30 mb-5 shadow-2xl">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold shrink-0" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-zinc-300 font-semibold">
            Luxury Automotive Mobility
          </span>
        </div>

        {/* Editorial Heading */}
        <h1 className="font-heading text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.08] sm:leading-none mb-5 gold-gradient-text px-2">
          <span className="block">{SITE_CONFIG.tagline}</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm sm:text-lg md:text-xl text-zinc-300 font-light tracking-wide mb-8 sm:mb-10 text-balance px-2 leading-relaxed">
          {SITE_CONFIG.subTagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10 px-4 sm:px-0">
          <a
            href={SITE_CONFIG.getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-brand-gold text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-brand-gold-bright hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-brand-gold/25"
          >
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-black text-brand-gold shrink-0" />
            <span>WhatsApp Us Now</span>
          </a>

          <a
            href="#fleet"
            className="flex items-center justify-center w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full glass-panel text-white hover:text-brand-gold border border-white/20 hover:border-brand-gold/50 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300"
          >
            Explore Our Fleet
          </a>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-6 text-xs text-zinc-400 font-mono">
          <a
            href={SITE_CONFIG.getPhoneUrl()}
            className="flex items-center space-x-2 hover:text-brand-gold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span>{SITE_CONFIG.primaryPhone}</span>
          </a>

          <span className="text-zinc-600 hidden sm:inline">•</span>

          <a
            href={SITE_CONFIG.getEmailUrl()}
            className="flex items-center space-x-2 hover:text-brand-gold transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span>{SITE_CONFIG.primaryEmail}</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-1.5 font-mono">Scroll Journey</span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold animate-bounce" />
      </div>
    </section>
  );
};
