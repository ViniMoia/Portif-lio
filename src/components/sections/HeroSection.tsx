'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let titleSplit: SplitType | null = null;

    let ctx = gsap.context(() => {
      // SplitType for H1 Title
      if (titleRef.current) {
        titleSplit = new SplitType(titleRef.current, {
          types: 'lines,words',
          tagName: 'span'
        });

        if (titleSplit.lines) {
          gsap.set(titleSplit.lines, { overflow: 'hidden', paddingBottom: '0.15em', marginBottom: '-0.15em' });
        }
        if (titleSplit.words) {
          gsap.set(titleSplit.words, { y: '120%', opacity: 0 });
        }
      }

      // Initial states matching reference index.html
      gsap.set('#core-light', { opacity: 0, scale: 0.5 });
      gsap.set(['#hero-badge', '#hero-subtitle', '#hero-ctas', '#hero-visual', '#hud-1', '#hud-2'], { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Entrance Animation Sequence
      tl.to('#core-light', {
        opacity: 1,
        scale: 1,
        duration: 3,
        ease: 'power2.out'
      })
        .to('#nav-bar', {
          y: 0,
          opacity: 1,
          duration: 1.5,
        }, '-=2.5')
        .to('#hero-visual', {
          opacity: 1,
          duration: 2,
        }, '-=2.2')
        .fromTo('#image-wrapper',
          { filter: 'blur(20px)', scale: 1.05 },
          { filter: 'blur(0px)', scale: 1, duration: 2.5, ease: 'power3.out' },
          '-=2'
        )
        .to('#hero-badge', {
          opacity: 1,
          y: 0,
          duration: 1.5,
        }, '-=1.8');

      if (titleSplit && titleSplit.words) {
        tl.to(titleSplit.words, {
          y: '0%',
          opacity: 1,
          duration: 1.5,
          stagger: 0.04,
        }, '-=1.6');
      }

      tl.to('#hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1.5,
      }, '-=1.2')
        .to('#hero-ctas', {
          opacity: 1,
          y: 0,
          duration: 1.5,
        }, '-=1.2')
        .fromTo(['#hud-1', '#hud-2'],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power2.out' },
          '-=1.5'
        );

      const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;

      if (isDesktop) {
        // Ambient Animations for HUDs (Desktop only)
        gsap.to('#hud-1', {
          y: -15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        gsap.to('#hud-2', {
          y: 15,
          x: -10,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1
        });

        // Core Light Breathing Loop
        gsap.to('#core-light', {
          scale: 1.05,
          opacity: 0.8,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        // Text Accent ("Autoridade") Breathing Glow Loop
        gsap.to('.text-accent', {
          textShadow: '0 0 20px rgba(59, 130, 246, 0.85), 0 0 35px rgba(59, 130, 246, 0.55), 0 0 50px rgba(59, 130, 246, 0.35)',
          color: '#60a5fa',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // 3D Parallax Tilt Effect for Hero Container
      const container = parallaxContainerRef.current;
      const wrapper = imageWrapperRef.current;

      if (container && wrapper && window.innerWidth > 1024) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const mouseX = e.clientX - centerX;
          const mouseY = e.clientY - centerY;

          gsap.to(wrapper, {
            x: mouseX * 0.03,
            y: mouseY * 0.03,
            rotationY: mouseX * 0.015,
            rotationX: -mouseY * 0.015,
            duration: 1,
            ease: 'power2.out'
          });
        };

        const handleMouseLeave = () => {
          gsap.to(wrapper, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 1.5,
            ease: 'power2.out'
          });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
      }
    }, containerRef);

    return () => {
      ctx.revert();
      if (titleSplit) {
        titleSplit.revert();
      }
    };
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-16 px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden">
      <div className="core-light" id="core-light" />

      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center relative z-10">

        {/* Left: Strategic Typography & Copy */}
        <div className="lg:col-span-7 flex flex-col items-start relative z-40 order-2 lg:order-1 pt-6 sm:pt-10 lg:pt-0">

          {/* Authority Badge (Oculto no mobile, visível em sm+) */}
          <div className="hidden sm:flex items-center gap-3 mb-8 opacity-0" id="hero-badge">
            <span className="font-mono text-[9px] sm:text-[10px] text-white/50 uppercase tracking-[0.2em] border border-white/10 px-4 py-1.5 rounded-full bg-white/[0.02] backdrop-blur-md">
              Engenharia Visual & Estratégia B2B
            </span>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">Available 2026</span>
            </div>
          </div>

          {/* Strategic H1 */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-light tracking-tight text-white mb-6 sm:mb-8 leading-[1.05]"
            id="hero-title"
          >
            Arquitetura digital<br />
            estratégica<br />
            desenhada para<br />
            <span className="text-accent">autoridade</span> e<br />
            conversão.
          </h1>

          {/* Support Paragraph */}
          <p
            className="text-lg sm:text-xl md:text-2xl font-light text-neutral-400 max-w-xl leading-relaxed mb-12 opacity-0 font-display tracking-wide"
            id="hero-subtitle"
          >
            Não crio apenas websites. Desenvolvo experiências digitais de alto impacto que lhe ajuda a elevar o valor percebido de suas marcas e transformar visitantes em negócios.
          </p>

          {/* High-Conversion CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-6 opacity-0 w-full sm:w-auto" id="hero-ctas">
            {/* Primary Hero Button com transição horizontal de cor azul autoridade e direcionamento para WhatsApp */}
            <a
              href="https://wa.me/5591980804717?text=Ol%C3%A1%2C%20Vin%C3%ADcius!%20Gostaria%20de%20agendar%20uma%20reuni%C3%A3o%20para%20conversarmos%20sobre%20um%20novo%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="hero-primary-btn group"
            >
              <span className="hero-primary-btn-content">
                <span className="text-xs font-display font-medium tracking-[0.15em] uppercase text-white transition-colors">
                  Iniciar Projeto
                </span>
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white transition-transform group-hover:translate-x-1" />
              </span>
            </a>

            {/* Secondary Text Action */}
            <a
              href="#timeline"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('timeline');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-3 text-xs font-display font-medium tracking-[0.15em] uppercase text-white/40 group hover:text-white transition-colors cursor-pointer"
            >
              Explorar Cases
            </a>
          </div>
        </div>

        {/* Right: Integrated Portrait & HUDs */}
        <div
          className="lg:col-span-5 flex justify-center opacity-0 relative order-1 lg:order-2 w-full h-[45vh] lg:h-auto"
          id="hero-visual"
        >
          <div className="image-composition" id="parallax-container" ref={parallaxContainerRef}>

            {/* Floating Tech HUD 1 - Node.js (Oculto no mobile, visível em sm+) */}
            <div className="hidden sm:flex hud-badge top-[15%] left-[-10%] md:left-[-20%] border-emerald-500/20 bg-emerald-950/30 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]" id="hud-1">
              <svg className="w-4 h-4 text-[#22c55e] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a1.7 1.7 0 0 0-.85.23l-7.7 4.45A1.7 1.7 0 0 0 2.6 8.15v8.9a1.7 1.7 0 0 0 .85 1.47l7.7 4.45a1.7 1.7 0 0 0 1.7 0l7.7-4.45a1.7 1.7 0 0 0 .85-1.47v-8.9a1.7 1.7 0 0 0-.85-1.47l-7.7-4.45A1.7 1.7 0 0 0 12 2zm0 2.2 6.7 3.86v7.73L12 19.66l-6.7-3.87V8.06L12 4.2z" />
              </svg>
              <span className="font-mono text-[10px] tracking-widest uppercase text-white font-medium">Node.js</span>
            </div>

            {/* Floating Tech HUD 2 - PostgreSQL (Oculto no mobile, visível em sm+) */}
            <div className="hidden sm:flex hud-badge bottom-[30%] right-[-5%] md:right-[-10%] border-blue-500/20 bg-blue-950/30 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]" id="hud-2">
              <svg className="w-4 h-4 text-[#38bdf8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
              </svg>
              <span className="font-mono text-[10px] tracking-widest uppercase text-white font-medium">PostgreSQL</span>
            </div>

            {/* Masked Image with Float Wrapper */}
            <div className="animate-float w-full">
              <div className="image-mask-wrapper" id="image-wrapper" ref={imageWrapperRef}>
                <Image
                  src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1781752610/imagem-link_bspbkl.jpg"
                  alt="Vinícius Moia - Engenheiro Visual e Arquiteto Digital"
                  className="hero-portrait"
                  width={580}
                  height={725}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
