import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { FleetShowcase } from './components/FleetShowcase';
import { VehicleSpotlight } from './components/VehicleSpotlight';
import { OfficeLocations } from './components/OfficeLocations';
import { HowItWorks } from './components/HowItWorks';
import { ContactFooter } from './components/ContactFooter';
import { FloatingContact } from './components/FloatingContact';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  useEffect(() => {
    // 1. Configure GSAP ScrollTrigger for optimal mobile touch behavior
    ScrollTrigger.config({ ignoreMobileResize: true });

    // 2. Initialize Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    // 3. Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-brand-dark text-zinc-100 min-h-dvh selection:bg-brand-gold selection:text-black">
      {/* Sticky Top Header Navigation */}
      <Navbar />

      {/* Main Single Page Scrolling Sections */}
      <main>
        <Hero />
        <Experience />
        <FleetShowcase />
        <VehicleSpotlight />
        <OfficeLocations />
        <HowItWorks />
      </main>

      {/* Contact & Footer Section */}
      <ContactFooter />

      {/* Sticky Floating Quick Contact Action */}
      <FloatingContact />
    </div>
  );
}

export default App;
