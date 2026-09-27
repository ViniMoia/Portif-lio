'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ConversionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const conversionSec = sectionRef.current;
      const conversionCard = cardRef.current;

      if (!conversionSec || !conversionCard) return;

      // GSAP Entrance Animation
      gsap.from(conversionCard, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: conversionSec,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // 3D Parallax Tilt on Desktop
      if (window.matchMedia('(pointer: fine) and (min-width: 1025px)').matches) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = conversionCard.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -4;
          const rotateY = ((x - centerX) / centerX) * 4;

          gsap.to(conversionCard, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: 'power2.out'
          });
        };

        const handleMouseLeave = () => {
          gsap.to(conversionCard, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: 'power3.out'
          });
        };

        conversionCard.addEventListener('mousemove', handleMouseMove);
        conversionCard.addEventListener('mouseleave', handleMouseLeave);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="conversion-section" id="contact" ref={sectionRef}>
      <div className="section-bg">
        <div className="dots-grid" />
        <div className="conversion-aura" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Card de Conversão Minimalista & Centralizado */}
        <div className="conversion-card text-center" id="conversion-tilt-card" ref={cardRef}>
          <div className="max-w-5xl mx-auto flex flex-col items-center justify-center py-6 sm:py-10">
            {/* Headline Principal */}
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-light text-white tracking-tight leading-[1.3] sm:leading-[1.55] uppercase mb-6 sm:mb-8">
              Seu próximo projeto pode ser <br className="hidden sm:inline" />
              <span className="text-blue-400 font-normal relative inline-block pb-4 mt-3">
                desenhado para conversão.
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500/50 rounded-full" />
              </span>
            </h2>

            {/* Subtítulo Limpo */}
            <p className="font-display text-lg sm:text-xl md:text-2xl text-white/70 font-light max-w-3xl leading-relaxed mb-12 tracking-wide">
              Se você tem um projeto em mente ou quer transformar sua presença digital em uma estrutura de autoridade, é aqui que a conversa começa.
            </p>

            {/* Action Support Text */}
            <span className="font-mono text-xs sm:text-sm text-blue-400 uppercase tracking-[0.2em] block mb-8 font-medium">
              Solicite um orçamento exclusivo para o seu negócio
            </span>

            {/* Botão Principal: Solicitar Orçamento */}
            <a
              href="https://wa.me/5591980804717"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-beam group"
            >
              <div className="btn-beam-spin" />
              <div className="btn-inner justify-center gap-3 text-xs sm:text-base tracking-widest uppercase font-semibold text-white px-6 sm:px-12 py-4 sm:py-5">
                {/* Roll-up Texto (Cadenciado em 0.7s) */}
                <span className="inline-block overflow-hidden h-[1.4em] relative">
                  <span className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                    <span className="block text-white leading-normal">Solicitar Orçamento</span>
                    <span className="block text-white leading-normal">Solicitar Orçamento</span>
                  </span>
                </span>

                {/* Ícone Seta Único */}
                <ArrowUpRight className="w-5 h-5 text-blue-400 shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
