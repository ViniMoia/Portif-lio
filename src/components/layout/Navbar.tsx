'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Grid, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

interface NavItem {
  num: string;
  label: string;
  targetId?: string;
  href?: string;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { num: '01', label: 'Início', targetId: 'nav-bar' },
  { num: '02', label: 'Trajetória', targetId: 'timeline' },
  { num: '03', label: 'Trabalhos', targetId: 'selected-work' },
  { num: '04', label: 'Visão & Serviços', targetId: 'services-text-section' },
  { num: '05', label: 'Habilidades (3D)', targetId: 'universe-section' },
  { num: '06', label: 'Calculadora de ROI', targetId: 'roi-section' },
  { num: '07', label: 'Solicitar Proposta', targetId: 'contact' },
  { num: '08', label: 'Perguntas Frequentes', targetId: 'faq' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = (item: NavItem) => {
    setIsMobileMenuOpen(false);
    if (item.isExternal && item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (item.targetId) {
      if (item.targetId === 'nav-bar') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.getElementById(item.targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="nav-glass fixed top-0 left-0 right-0 z-50 py-4 sm:py-6 px-4 sm:px-8 md:px-12 flex justify-between items-center opacity-0 -translate-y-[20px]"
        id="nav-bar"
      >
        {/* Brand Logo */}
        <a href="#" className="font-display text-lg sm:text-xl tracking-widest uppercase font-light text-white hover:opacity-80 transition-opacity">
          VINÍCIUS<span className="text-white/30">.MOIA</span>
        </a>

        {/* Nav Links with Oswald Typography, Smooth Scroll and Left-to-Right Animated Underline */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-12 text-sm font-display tracking-widest uppercase font-light">
          <a
            href="#selected-work"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById('selected-work');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="nav-link-effect cursor-pointer"
          >
            Trabalhos
          </a>
          <a
            href="#universe-section"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById('universe-section');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="nav-link-effect cursor-pointer"
          >
            Habilidade
          </a>
          <a
            href="https://wa.me/5591980804717"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-effect cursor-pointer"
          >
            Contato
          </a>
        </div>

        {/* Grid Action Button (Visível apenas no mobile) */}
        <button
          aria-label="Abrir Menu de Navegação"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 items-center justify-center hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        >
          <Grid className="w-4 h-4 text-white/80" />
        </button>
      </nav>

      {/* Mobile Navigation Drawer / Panel */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop Blur */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        />

        {/* Drawer Content */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-[100dvh] max-h-[100dvh] bg-[#070709]/95 border-l border-white/10 backdrop-blur-2xl px-6 pt-6 pb-12 flex flex-col justify-between overflow-y-auto overscroll-contain shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Header do Drawer */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-5 shrink-0">
              <span className="font-display text-lg tracking-widest uppercase font-light text-white">
                VINÍCIUS<span className="text-white/30">.MOIA</span>
              </span>
              <button
                aria-label="Fechar Menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <span className="font-mono text-[10px] text-blue-400 uppercase tracking-[0.2em] block mb-3 font-medium shrink-0">
              Navegação Rápida
            </span>

            {/* Lista de Atalhos das Dobras */}
            <div className="flex flex-col divide-y divide-white/5">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item)}
                  className="py-3 flex items-center justify-between text-left group hover:pl-2 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-blue-400/80 font-bold">{item.num}</span>
                    <span className="font-display text-base font-light text-white/90 group-hover:text-white transition-colors tracking-wide uppercase">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer do Drawer com CTA de Contato */}
          <div className="pt-5 border-t border-white/10 mt-6 shrink-0 pb-4">
            <a
              href="https://wa.me/5591980804717"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-display text-sm tracking-wider uppercase font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 active:scale-95 transition-all"
            >
              <span>Conversar no WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
