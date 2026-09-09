import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

export const StatsAndReviews: React.FC = () => {
  return (
    <section className="relative py-20 bg-brand-surface border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SITE_CONFIG.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl glass-panel text-center border border-white/10 hover:border-brand-gold/40 transition-all duration-300 shadow-xl"
            >
              <span className="font-heading text-3xl sm:text-5xl font-black text-brand-gold block mb-2">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400 font-mono font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
