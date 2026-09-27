'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StacksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const stacksSec = sectionRef.current;
      const maskText = textRef.current;

      if (!stacksSec || !maskText) return;

      const stacksTl = gsap.timeline({
        scrollTrigger: {
          trigger: stacksSec,
          pin: true,
          start: 'top top',
          end: '+=1400px',
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Entrada por Masking: surge de baixo para o centro da tela
      stacksTl.fromTo(maskText,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
        // Pausa sutil no centro para leitura perfeita
        .to({}, { duration: 0.8 })
        // Saída por Masking: continua subindo e sai pelo topo da máscara
        .to(maskText,
          { yPercent: -115, opacity: 0, duration: 1, ease: 'power3.in' }
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stacks-mask-section" id="stacks-section" ref={sectionRef}>
      <div className="relative z-10 text-center px-6">
        <div className="mask-line-container">
          <h2 className="mask-text-content" ref={textRef}>
            Stacks Dominadas
          </h2>
        </div>
      </div>

      {/* Indicador de Rolagem e Exploração (Desktop com Mouse Azul e Mobile com Texto) */}
      <div className="scroll-explorer-indicator">
        <span className="scroll-explorer-text scroll-desktop-text">
          Role para Explorar
        </span>
        <span className="scroll-explorer-text scroll-mobile-text">
          Deslize para Explorar
        </span>
        <div className="scroll-mouse-icon">
          <div className="scroll-mouse-wheel" />
        </div>
      </div>
    </section>
  );
}
