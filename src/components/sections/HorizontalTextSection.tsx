'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalTextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let splitTextHoriz: SplitType | null = null;

    let ctx = gsap.context(() => {
      const textWrapper = sectionRef.current;
      const textEl = textRef.current;

      if (!textWrapper || !textEl) return;

      // Split text into characters and words using SplitType
      splitTextHoriz = new SplitType(textEl, { types: 'chars,words' });

      // Total scroll distance needed to move text completely left
      const getScrollDistance = () => textEl.scrollWidth;

      const scrollTween = gsap.to(textEl, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: textWrapper,
          pin: true,
          start: 'top top',
          end: () => '+=' + (getScrollDistance() + 400),
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      if (splitTextHoriz.chars && splitTextHoriz.chars.length > 0) {
        splitTextHoriz.chars.forEach((char) => {
          gsap.from(char, {
            yPercent: 'random(-120, 120)',
            rotation: 'random(-15, 15)',
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: 'left 95%',
              end: 'left 35%',
              scrub: 1
            }
          });
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      if (splitTextHoriz) {
        splitTextHoriz.revert();
      }
    };
  }, []);

  return (
    <section className="horizontal-section" id="services-text-section" ref={sectionRef}>
      <div className="section-bg">
        <div className="dots-grid" />
      </div>
      <div className="horizontal-container">
        <h3 className="horizontal-text-scroll" ref={textRef}>
          Construo experiências digitais completas, de ponta a ponta. Muito além de visuais que prendem a atenção, agrego valor e solidez ao seu negócio.
        </h3>
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
