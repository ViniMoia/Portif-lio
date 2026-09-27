'use client';

import React, { useEffect, useState } from 'react';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const timelineEl = document.getElementById('timeline');
      if (timelineEl) {
        const rect = timelineEl.getBoundingClientRect();
        // Surge apenas quando o usuário chega na dobra Timeline
        if (rect.top <= window.innerHeight * 0.75) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        if (window.scrollY > 400) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
      }`}
    >
      <a
        href="https://wa.me/5591980804717"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="relative group w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-full flex items-center justify-center bg-[#0A0A0C]/90 backdrop-blur-xl border border-[#25D366]/40 hover:border-[#25D366] shadow-[0_4px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.9),0_0_35px_rgba(37,211,102,0.55)] active:scale-95 transition-all duration-300"
      >
        {/* Glow Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-ping opacity-60 pointer-events-none" />

        {/* WhatsApp Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 text-[#25D366] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>

        {/* Tooltip flutuante no desktop à esquerda do círculo */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-[#0A0A0C]/90 backdrop-blur-md border border-white/10 text-white text-xs font-display tracking-wider uppercase font-medium pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block whitespace-nowrap shadow-lg">
          WhatsApp
        </div>
      </a>
    </aside>
  );
}
