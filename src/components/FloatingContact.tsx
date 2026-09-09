import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { MessageSquare, X } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="hidden sm:flex fixed bottom-6 right-6 z-50 items-center space-x-3">
      {/* Tooltip Badge */}
      {showTooltip && (
        <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full glass-panel-gold border-brand-gold/40 text-white text-xs font-semibold shadow-2xl animate-fade-in">
          <span>Need a car? Chat with Concierge</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-400 hover:text-white ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Persistent Button */}
      <a
        href={SITE_CONFIG.getWhatsappUrl("Hi RENT A CAR, I am reaching out from your website for an instant inquiry.")}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold text-black shadow-2xl shadow-brand-gold/40 hover:scale-110 active:scale-95 transition-all duration-300 gold-border-glow"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-black text-brand-gold" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black"></span>
      </a>
    </div>
  );
};
