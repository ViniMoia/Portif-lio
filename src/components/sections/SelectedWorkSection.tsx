'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardItem {
  index: number;
  wrapper: HTMLElement;
  imgWrapper: HTMLElement | null;
  images: NodeListOf<HTMLElement>;
  hasVideo: boolean;
  video: HTMLVideoElement | null;
  intervalId: NodeJS.Timeout | null;
  currentIndex: number;
}

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let activeScrollIndex = -1;
    let hoveredIndex: number | null = null;
    let updateCyclingState: (() => void) | null = null;

    let ctx = gsap.context(() => {
      const selectedWorkSec = sectionRef.current;
      if (!selectedWorkSec) return;

      const workItems = selectedWorkSec.querySelectorAll<HTMLElement>('.work-wrapper');
      const l = workItems.length;
      const imgWrappers = gsap.utils.toArray<HTMLElement>('.selected-work .work-img-wrapper');
      const infoWrappers = gsap.utils.toArray<HTMLElement>('.selected-work .work-info-wrapper');

      const setupStackingAnimation = (t: number, r: number, s: number, i: number, o: boolean, n: number = 0) => {
        gsap.set(selectedWorkSec, { height: `${l * (r + n)}svh` });

        let timeline = gsap.timeline({
          scrollTrigger: {
            trigger: selectedWorkSec,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              const time = timeline.time();
              let newActive = -1;
              for (let e = 0; e < l; e++) {
                if (d[e] && time >= d[e].hMiddle) {
                  newActive = e;
                }
              }
              if (newActive !== activeScrollIndex) {
                activeScrollIndex = newActive;
                if (typeof updateCyclingState === 'function') {
                  updateCyclingState();
                }
              }
            }
          }
        });

        let d: any[] = [];
        for (let e = 0; e < l; e++) {
          let getH = (idx: number, st: number) => {
            let a = d[idx];
            return st <= a.hStart ? t + n : st >= a.hEnd ? r + n : t + n + (r - t) * (st - a.hStart) / (a.hEnd - a.hStart);
          };
          let getA = (st: number) => {
            let sum = 0;
            for (let a = 0; a < e; a++) sum += getH(a, st);
            return 100 - st + sum;
          };
          let getI = (fn: (st: number) => number, val: number) => {
            let low = 0, high = 3000;
            for (let a = 0; a < 50; a++) {
              let mid = (low + high) / 2;
              fn(mid) > val ? low = mid : high = mid;
            }
            return (low + high) / 2;
          };

          let hStart = getI(getA, 100);
          let hEnd = getI(getA, 10);
          let hMiddle = getI(getA, 50);
          let infoFadeStart = getI(getA, 70);

          d.push({
            hStart,
            hEnd,
            hMiddle,
            infoFadeStart,
            wGrowEnd: 0,
            wShrinkStart: 0,
            wShrinkEnd: 0
          });

          let wGrowEnd = 0, wShrinkStart = 0, wShrinkEnd = 0;
          if (o) {
            let getT = (st: number) => getA(st) + getH(e, st) / 2;
            wGrowEnd = getI(getT, 55);
            wShrinkStart = getI(getT, 45);
            wShrinkEnd = getI((st: number) => getA(st) + getH(e, st), 0);
          }
          d[e] = {
            ...d[e],
            wGrowEnd,
            wShrinkStart,
            wShrinkEnd
          };
        }

        imgWrappers.forEach((imgEl, idx) => {
          if (!imgEl) return;
          let data = d[idx];
          let infoEl = infoWrappers[idx];

          timeline.fromTo(imgEl, {
            height: `${t}svh`
          }, {
            height: `${r}svh`,
            ease: 'none',
            duration: data.hEnd - data.hStart
          }, data.hStart);

          if (infoEl) {
            timeline.fromTo(infoEl, {
              opacity: 0
            }, {
              opacity: 1,
              ease: 'none',
              duration: 20
            }, data.infoFadeStart);
          }

          if (o) {
            timeline.fromTo(imgEl, {
              width: `${s}vw`
            }, {
              width: `${i}vw`,
              ease: 'none',
              duration: data.wGrowEnd - data.hStart
            }, data.hStart);

            timeline.fromTo(imgEl, {
              width: `${i}vw`
            }, {
              width: `${s}vw`,
              ease: 'none',
              duration: data.wShrinkEnd - data.wShrinkStart,
              immediateRender: false
            }, data.wShrinkStart);
          } else {
            gsap.set(imgEl, { width: `${s}vw` });
          }
        });

        timeline.to({}, { duration: 0.01 }, l * (r + n) + 100);
      };

      let mm = gsap.matchMedia();
      mm.add('(min-width: 1025px)', () => {
        setupStackingAnimation(28, 72, 48, 60, true, 0);
      });
      mm.add('(max-width: 1024px)', () => {
        // Mobile-optimized lightweight stack: stable heights, GPU-accelerated opacity & transform (0 layout reflows)
        gsap.set(selectedWorkSec, { height: 'auto' });

        workItems.forEach((item, idx) => {
          const imgEl = imgWrappers[idx];
          const infoEl = infoWrappers[idx];

          if (imgEl) {
            gsap.set(imgEl, { width: '100vw', height: '34svh' });
          }
          if (infoEl) {
            gsap.set(infoEl, { opacity: 1 });
          }

          // Ativa automaticamente quando o card passa da metade da tela para cima (top 50%)
          ScrollTrigger.create({
            trigger: item,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => {
              activeScrollIndex = idx;
              if (typeof updateCyclingState === 'function') {
                updateCyclingState();
              }
            },
            onEnterBack: () => {
              activeScrollIndex = idx;
              if (typeof updateCyclingState === 'function') {
                updateCyclingState();
              }
            },
            onLeave: () => {
              if (activeScrollIndex === idx) {
                activeScrollIndex = -1;
                if (typeof updateCyclingState === 'function') {
                  updateCyclingState();
                }
              }
            },
            onLeaveBack: () => {
              if (activeScrollIndex === idx) {
                activeScrollIndex = -1;
                if (typeof updateCyclingState === 'function') {
                  updateCyclingState();
                }
              }
            }
          });
        });
      });

      // Gallery Cycling & State Management
      const workWrappers = selectedWorkSec.querySelectorAll<HTMLElement>('.work-wrapper');
      const cardsData: CardItem[] = Array.from(workWrappers).map((wrapper, index) => {
        const images = wrapper.querySelectorAll<HTMLElement>('.work-img-wrapper-2 .work-image');
        const hasVideo = wrapper.getAttribute('data-has-video') === 'true';
        const video = wrapper.querySelector<HTMLVideoElement>('.work-img-wrapper-2 .work-video');
        const imgWrapper = wrapper.querySelector<HTMLElement>('.work-img-wrapper');

        return {
          index,
          wrapper,
          imgWrapper,
          images,
          hasVideo,
          video,
          intervalId: null,
          currentIndex: 0
        };
      });

      const isMobile = typeof window !== 'undefined' && (window.matchMedia('(max-width: 1024px)').matches || 'ontouchstart' in window);

      const startCycling = (card: CardItem) => {
        // No mobile, não há ciclagem contínua de imagens
        if (isMobile || card.images.length <= 1 || card.intervalId) return;
        card.intervalId = setInterval(() => {
          gsap.to(card.images[card.currentIndex], { opacity: 0, duration: 0.4 });
          card.currentIndex = (card.currentIndex + 1) % card.images.length;
          gsap.to(card.images[card.currentIndex], { opacity: 1, duration: 0.4 });
        }, 1000);
      };

      const stopCycling = (card: CardItem) => {
        if (card.intervalId) {
          clearInterval(card.intervalId);
          card.intervalId = null;
        }
        card.images.forEach((img, idx) => {
          gsap.set(img, { opacity: idx === 0 ? 1 : 0 });
        });
        card.currentIndex = 0;
      };

      updateCyclingState = () => {
        const highlightedIndex = hoveredIndex !== null ? hoveredIndex : activeScrollIndex;

        cardsData.forEach(card => {
          const isActive = card.index === highlightedIndex;

          if (isMobile) {
            // MOBILE: Auto-play do vídeo quando o card passa da metade da tela (sem passar imagens)
            stopCycling(card);
            if (isActive) {
              if (card.hasVideo && card.video) {
                card.images.forEach(img => gsap.set(img, { opacity: 0 }));
                gsap.to(card.video, { opacity: 1, duration: 0.4 });
                card.video.play().catch(e => console.log('Video playback error:', e));
              } else {
                if (card.images[0]) gsap.set(card.images[0], { opacity: 1 });
              }
            } else {
              if (card.hasVideo && card.video) {
                gsap.to(card.video, {
                  opacity: 0,
                  duration: 0.4,
                  onComplete: () => {
                    if (card.video) {
                      card.video.pause();
                      card.video.currentTime = 0;
                    }
                  }
                });
              }
              if (card.images[0]) {
                gsap.set(card.images[0], { opacity: 1 });
              }
            }
          } else {
            // DESKTOP: 100% Intocado - Ciclagem de imagens no scroll e vídeo no hover do mouse
            if (isActive) {
              if (card.hasVideo && card.video) {
                if (hoveredIndex === card.index) {
                  stopCycling(card);
                  card.images.forEach(img => gsap.set(img, { opacity: 0 }));
                  gsap.to(card.video, { opacity: 1, duration: 0.4 });
                  card.video.play().catch(e => console.log('Video playback error:', e));
                } else {
                  gsap.to(card.video, {
                    opacity: 0,
                    duration: 0.4,
                    onComplete: () => {
                      if (card.video) {
                        card.video.pause();
                        card.video.currentTime = 0;
                      }
                    }
                  });
                  gsap.set(card.images[0], { opacity: 1 });
                  startCycling(card);
                }
              } else {
                startCycling(card);
              }
            } else {
              stopCycling(card);
              if (card.hasVideo && card.video) {
                gsap.to(card.video, {
                  opacity: 0,
                  duration: 0.4,
                  onComplete: () => {
                    if (card.video) {
                      card.video.pause();
                      card.video.currentTime = 0;
                    }
                  }
                });
              }
            }
          }
        });
      };

      cardsData.forEach(card => {
        if (card.imgWrapper) {
          card.imgWrapper.addEventListener('mouseenter', () => {
            hoveredIndex = card.index;
            if (updateCyclingState) updateCyclingState();
          });

          card.imgWrapper.addEventListener('mouseleave', () => {
            hoveredIndex = null;
            if (updateCyclingState) updateCyclingState();
          });
        }
      });

      if (updateCyclingState) updateCyclingState();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-scroll-section">
      <div className="blank-section-gap" />
      <section className="selected-work" id="selected-work" style={{ height: '288svh' }} ref={sectionRef}>

        {/* Case 1: Aura Shield */}
        <div className="work-wrapper" data-has-video="true">
          <div className="work-img-wrapper" onClick={() => window.open('https://aura-shield-security.netlify.app/', '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer', height: '28svh', width: '48vw' }}>
            <div className="work-img-wrapper-2">
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784556728/Captura_de_tela_2026-07-20_104828_zmcjuc.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 1, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784556738/Captura_de_tela_2026-07-20_104852_rhqfu2.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784556746/Captura_de_tela_2026-07-20_104940_imnwtq.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <video
                className="work-video"
                loop
                muted
                playsInline
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity', zIndex: 10, pointerEvents: 'none' }}
              >
                <source
                  src="https://res.cloudinary.com/dpt3zi8kx/video/upload/v1784571825/20260720-1821-35.3520937_oof1z1.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="bg-img-overlay" />
            <img
              alt="work image"
              className="bg-image"
              decoding="async"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 60vw"
              src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784556728/Captura_de_tela_2026-07-20_104828_zmcjuc.png"
              style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
            />
          </div>
          <div className="work-info-wrapper" style={{ opacity: 0 }}>
            <div className="work-title" onClick={() => window.open('https://aura-shield-security.netlify.app/', '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer' }}>
              <h2 className="title">Aura Shield</h2>
              <span className="bracket-button">[Open]</span>
            </div>
            <div className="work-detail">
              <label className="tag text-small">Scroll Scrubbing, Horizontal Scrolling</label>
              <label className="role text-small">Role: Web Design &amp; Motion Design</label>
            </div>
          </div>
        </div>

        {/* Case 2: Vértice Ferramental */}
        <div className="work-wrapper" data-has-video="true">
          <div className="work-img-wrapper" onClick={() => window.open('https://vertice-ferramental.netlify.app/', '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer', height: '28svh', width: '48vw' }}>
            <div className="work-img-wrapper-2">
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784562574/Captura_de_tela_2026-07-20_123543_vuqrza.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 1, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784562574/Captura_de_tela_2026-07-20_123603_u1q0bc.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784562574/Captura_de_tela_2026-07-20_123620_h8mcru.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <video
                className="work-video"
                loop
                muted
                playsInline
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity', zIndex: 10, pointerEvents: 'none' }}
              >
                <source
                  src="https://res.cloudinary.com/dpt3zi8kx/video/upload/v1784570327/20260720-1755-54.0566639_bkfld8.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="bg-img-overlay" />
            <img
              alt="work image"
              className="bg-image"
              decoding="async"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 60vw"
              src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784562574/Captura_de_tela_2026-07-20_123543_vuqrza.png"
              style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
            />
          </div>
          <div className="work-info-wrapper" style={{ opacity: 0 }}>
            <div className="work-title" onClick={() => window.open('https://vertice-ferramental.netlify.app/', '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer' }}>
              <h2 className="title">Vértice Ferramental</h2>
              <span className="bracket-button">[Open]</span>
            </div>
            <div className="work-detail">
              <label className="tag text-small">Scroll Scrubbing, Horizontal Scrolling</label>
              <label className="role text-small">Role: Web Design &amp; Motion Design</label>
            </div>
          </div>
        </div>

        {/* Case 3: Hermes Pen */}
        <div className="work-wrapper" data-has-video="true">
          <div className="work-img-wrapper" onClick={() => window.open('https://hermes-pen.netlify.app/', '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer', height: '28svh', width: '48vw' }}>
            <div className="work-img-wrapper-2">
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784564981/Captura_de_tela_2026-07-20_132817_ez9lbr.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 1, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784564981/Captura_de_tela_2026-07-20_132841_bensin.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784564981/Captura_de_tela_2026-07-20_132904_tlst2q.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <video
                className="work-video"
                loop
                muted
                playsInline
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity', zIndex: 10, pointerEvents: 'none' }}
              >
                <source
                  src="https://res.cloudinary.com/dpt3zi8kx/video/upload/v1784574637/20260720-1908-45.3465586_n4n7l7.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="bg-img-overlay" />
            <img
              alt="work image"
              className="bg-image"
              decoding="async"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 60vw"
              src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1784564981/Captura_de_tela_2026-07-20_132817_ez9lbr.png"
              style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
            />
          </div>
          <div className="work-info-wrapper" style={{ opacity: 0 }}>
            <div className="work-title" onClick={() => window.open('https://hermes-pen.netlify.app/', '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer' }}>
              <h2 className="title">Hermes Pen</h2>
              <span className="bracket-button">[Open]</span>
            </div>
            <div className="work-detail">
              <label className="tag text-small">Scroll Scrubbing</label>
              <label className="role text-small">Role: Web Design &amp; Motion Design</label>
            </div>
          </div>
        </div>

        {/* Case 4: E-Commerce */}
        <div className="work-wrapper" data-has-video="true">
          <div className="work-img-wrapper" onClick={() => window.open('https://continental-prototipo.vercel.app/', '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer', height: '28svh', width: '48vw' }}>
            <div className="work-img-wrapper-2">
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1790478596/Captura_de_tela_2026-09-26_235930_fuq8q7.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 1, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1790478609/Captura_de_tela_2026-09-27_000007_yokfzf.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <img
                alt="work image"
                className="work-image"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1790478619/Captura_de_tela_2026-09-27_000019_cexp6e.png"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
              />
              <video
                className="work-video"
                loop
                muted
                playsInline
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity', zIndex: 10, pointerEvents: 'none' }}
              >
                <source
                  src="https://res.cloudinary.com/dpt3zi8kx/video/upload/v1790478327/Video_Project_2_cni9fh.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="bg-img-overlay" />
            <img
              alt="work image"
              className="bg-image"
              decoding="async"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 60vw"
              src="https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1790478596/Captura_de_tela_2026-09-26_235930_fuq8q7.png"
              style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
            />
          </div>
          <div className="work-info-wrapper" style={{ opacity: 0 }}>
            <div className="work-title" onClick={() => window.open('https://continental-prototipo.vercel.app/', '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer' }}>
              <h2 className="title">E-Commerce</h2>
              <span className="bracket-button">[Open]</span>
            </div>
            <div className="work-detail">
              <label className="tag text-small">Next.js, PostgreSQL, Node.js</label>
              <label className="role text-small">Role: Full-Stack Developer;</label>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
