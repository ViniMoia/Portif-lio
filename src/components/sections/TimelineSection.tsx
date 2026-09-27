'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Central Conduit Active Rail Progress
      gsap.to('#conduit-active', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-body',
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 0.5
        }
      });

      const isDesktop = typeof window !== 'undefined' && window.matchMedia('(pointer: fine) and (min-width: 1025px)').matches;

      // 2. Entrance and Parallax Years for each card
      const timelineItems = gsap.utils.toArray<HTMLElement>('.timeline-item-wrapper');
      timelineItems.forEach((item, index) => {
        const card = item.querySelector('.timeline-card-glass') as HTMLElement;
        const dot = item.querySelector('.timeline-v-dot') as HTMLElement;
        const year = item.querySelector('.timeline-v-year') as HTMLElement;

        if (!card || !year) return;

        const horizontalShift = index % 2 === 0 ? 80 : -80;

        if (isDesktop) {
          // Setup initial cinematic hidden states for Desktop
          gsap.set(card, {
            opacity: 0,
            y: 100,
            scale: 0.9,
            filter: 'blur(30px)',
            transformPerspective: 1200,
            rotationX: index % 2 === 0 ? 12 : -12,
            rotationY: index % 2 === 0 ? -6 : 6
          });

          gsap.set(year, {
            opacity: 0,
            x: horizontalShift
          });

          // ScrollTrigger to animate in and toggle active classes
          ScrollTrigger.create({
            trigger: item,
            start: 'top 78%',
            end: 'bottom 20%',
            toggleClass: 'active',
            onEnter: () => {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                rotationX: 0,
                rotationY: 0,
                duration: 1.4,
                ease: 'power4.out'
              });

              gsap.to(year, {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power3.out'
              });
            },
            onLeaveBack: () => {
              gsap.to(card, {
                opacity: 0,
                y: 100,
                scale: 0.9,
                filter: 'blur(30px)',
                rotationX: index % 2 === 0 ? 12 : -12,
                rotationY: index % 2 === 0 ? -6 : 6,
                duration: 0.9,
                ease: 'power3.inOut'
              });

              gsap.to(year, {
                opacity: 0,
                x: horizontalShift,
                duration: 0.8,
                ease: 'power3.inOut'
              });
            }
          });

          // 3. Mouse position flashlight gloss & 3D tilt tracking per card
          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const maxTilt = 8;
            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            gsap.to(card, {
              rotationX: rotateX,
              rotationY: rotateY,
              transformPerspective: 1200,
              duration: 0.35,
              ease: 'power2.out'
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              duration: 0.8,
              ease: 'power3.out'
            });
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);
        } else {
          // Mobile Hardware-Accelerated Animation (0 blur filters, 0 GPU stalls)
          gsap.set(card, { opacity: 0, y: 40, scale: 0.96 });
          gsap.set(year, { opacity: 0 });

          ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleClass: 'active',
            onEnter: () => {
              gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' });
              gsap.to(year, { opacity: 1, duration: 0.6, ease: 'power2.out' });
            },
            onLeaveBack: () => {
              gsap.to(card, { opacity: 0, y: 40, scale: 0.96, duration: 0.5, ease: 'power2.inOut' });
              gsap.to(year, { opacity: 0, duration: 0.4, ease: 'power2.inOut' });
            }
          });
        }
      });

      // 4. Resistive Parallax transition: Dobra 2 (Timeline) -> Dobra 3 (Selected Work) - Desktop Only
      if (isDesktop) {
        ScrollTrigger.create({
          trigger: '#timeline',
          pin: true,
          start: 'bottom bottom',
          end: '+=100%',
          pinSpacing: false
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="experience-section" ref={sectionRef}>
      <div className="section-bg">
        <div className="dots-grid" />
      </div>

      <div className="timeline-outer">
        {/* Timeline Header (DS4 Vibe) */}
        <div className="flex flex-col items-center mb-32 relative z-10 text-center" id="timeline-header">
          <span className="font-mono text-[9px] sm:text-[10px] text-white/50 uppercase tracking-[0.2em] border border-white/10 px-4 py-1.5 rounded-full bg-white/[0.02] backdrop-blur-md inline-block mb-6">
            Apresentação
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-tight">
            Minha Trajetória
          </h2>
        </div>

        <div className="timeline-body">
          {/* Conduit Rail & Spark */}
          <div className="timeline-v-line" />
          <div className="timeline-v-progress" id="conduit-active">
            <div className="timeline-spark" />
          </div>

          {/* CARD 1: Vancer (2026) */}
          <div className="timeline-item-wrapper" data-glow="rgba(0, 245, 255, 0.22)" data-accent="#00f5ff">
            <div className="timeline-v-dot" />
            <div className="timeline-item-content">
              <span className="timeline-v-year">2026</span>
              <div
                className="timeline-card-glass"
                style={{ '--glow-color': 'rgba(0, 245, 255, 0.18)', '--accent-active': '#00f5ff' } as React.CSSProperties}
              >
                <div className="timeline-card-glow" />
                <div className="company-header">
                  <div className="company-logo">
                    <img
                      src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1783356026/WhatsApp_Image_2025-03-06_at_14.37.03-180w-icone2_jcjwcl.webp"
                      alt="Vancer"
                    />
                  </div>
                  <h3 className="company-name">Vancer</h3>
                </div>
                <p className="job-desc">
                  Desenvolvimento de sistemas web para vendas e operações empresariais, ampliando atuação de design para desenvolvimento full web.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2: Autech (2025) */}
          <div className="timeline-item-wrapper" data-glow="rgba(59, 130, 246, 0.22)" data-accent="#3b82f6">
            <div className="timeline-v-dot" />
            <div className="timeline-item-content">
              <span className="timeline-v-year">2025</span>
              <div
                className="timeline-card-glass"
                style={{ '--glow-color': 'rgba(59, 130, 246, 0.18)', '--accent-active': '#3b82f6' } as React.CSSProperties}
              >
                <div className="timeline-card-glow" />
                <div className="company-header">
                  <div className="company-logo">
                    <img
                      src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1783361859/ChatGPT_Image_6_de_jul._de_2026_15_17_22_hwonlo.png"
                      alt="Autech"
                    />
                  </div>
                  <h3 className="company-name">Autech</h3>
                </div>
                <p className="job-desc">
                  Atuação como Web Designer no desenvolvimento de páginas de alta conversão, além de consultorias em UX/UI e reestruturação de sites institucionais.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 3: Freelancer */}
          <div className="timeline-item-wrapper freelancer-item" data-glow="rgba(157, 0, 255, 0.22)" data-accent="#9d00ff">
            <div className="timeline-v-dot" />
            <div className="timeline-item-content">
              <span className="timeline-v-year">Origem</span>
              <div
                className="timeline-card-glass"
                style={{ '--glow-color': 'rgba(157, 0, 255, 0.18)', '--accent-active': '#9d00ff' } as React.CSSProperties}
              >
                <div className="timeline-card-glow" />
                <div className="company-header">
                  <div className="company-logo bg-gradient-to-br from-purple-950/60 to-indigo-950/80 border border-purple-500/30 text-purple-300">
                    <svg
                      className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <h3 className="company-name">Freelancer</h3>
                </div>
                <p className="job-desc">
                  Trajetória iniciada com desenvolvimento de páginas em HTML/CSS e consolidada na atuação criativa como Motion Designer e profissional multifuncional.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
