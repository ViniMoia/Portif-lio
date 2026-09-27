'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, TrendingUp, Info, ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RoiCalculatorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const monthlyReturnRef = useRef<HTMLSpanElement>(null);
  const annualReturnRef = useRef<HTMLSpanElement>(null);

  const [traffic, setTraffic] = useState<number>(3000);
  const [ticket, setTicket] = useState<number>(5000);
  const [conversionRate, setConversionRate] = useState<number>(10);

  const [monthlyReturn, setMonthlyReturn] = useState<number>(1500000);
  const [annualReturn, setAnnualReturn] = useState<number>(18000000);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      maximumFractionDigits: 0
    }).format(val);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const roiSec = sectionRef.current;
      if (!roiSec) return;

      const roiMaskTexts = roiSec.querySelectorAll('.roi-mask-text');

      if (roiMaskTexts.length > 0) {
        const roiTl = gsap.timeline({
          scrollTrigger: {
            trigger: roiSec,
            start: 'top 85%',
            end: 'top 10%',
            scrub: 1.8,
            invalidateOnRefresh: true
          }
        });

        roiTl.fromTo(
          roiMaskTexts,
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 2.5, stagger: 0.35, ease: 'power2.out' }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sales = traffic * (conversionRate / 100);
    const newMonthlyReturn = sales * ticket;
    const newAnnualReturn = newMonthlyReturn * 12;

    if (monthlyReturnRef.current) {
      gsap.to(monthlyReturnRef.current, {
        innerHTML: newMonthlyReturn,
        duration: 0.4,
        snap: { innerHTML: 1 },
        onUpdate: function () {
          if (monthlyReturnRef.current) {
            const currentVal = parseFloat(this.targets()[0].innerHTML);
            monthlyReturnRef.current.textContent = '+ ' + formatBRL(currentVal);
          }
        }
      });
    }

    if (annualReturnRef.current) {
      gsap.to(annualReturnRef.current, {
        innerHTML: newAnnualReturn,
        duration: 0.4,
        snap: { innerHTML: 1 },
        onUpdate: function () {
          if (annualReturnRef.current) {
            const currentVal = parseFloat(this.targets()[0].innerHTML);
            annualReturnRef.current.textContent = '+ ' + formatBRL(currentVal);
          }
        }
      });
    }

    setMonthlyReturn(newMonthlyReturn);
    setAnnualReturn(newAnnualReturn);
  }, [traffic, ticket, conversionRate]);

  return (
    <section className="roi-section" id="roi-section" ref={sectionRef}>
      <div className="section-bg">
        <div className="dots-grid" />
      </div>

      <div className="roi-container">
        {/* Coluna Esquerda: Texto com Scroll Masking */}
        <div className="roi-text-wrapper">
          <div className="mask-line-container mb-4">
            <div className="roi-mask-text inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[11px] tracking-widest uppercase w-fit">
              <Calculator className="w-3.5 h-3.5" />
              <span>Impacto &amp; Retorno Digital</span>
            </div>
          </div>

          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              Um site <span className="text-blue-400 font-normal">profissional</span> pode abrir
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              novas
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              oportunidades de negócio, e
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              aliado a suas
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              ações de marketing pode
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              <span className="text-blue-400 font-normal">potencializar</span>
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              os seus resultados. Descubra,
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              com esta
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              <span className="text-blue-400 font-normal">calculadora</span>, o potencial
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              <span className="text-blue-400 font-normal">impacto</span> que uma
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              <span className="text-blue-400 font-normal">presença digital</span> bem
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              estruturada pode
            </h2>
          </div>
          <div className="mask-line-container">
            <h2 className="roi-mask-text roi-scroll-text">
              gerar para a sua empresa.
            </h2>
          </div>

          <div className="mask-line-container mt-6">
            <div className="roi-mask-text flex items-center gap-4 text-xs font-mono text-white/40 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                Scroll para revelar
              </span>
              <span>•</span>
              <span>Projeção Estruturada</span>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Calculadora de ROI */}
        <div className="roi-calculator-card">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <div>
              <h3 className="font-display text-2xl font-light tracking-wide text-white uppercase">
                Calculadora de ROI
              </h3>
              <p className="font-sans text-xs text-white/50 font-light mt-1">
                Simule o crescimento potencial do seu negócio
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-white/10 pb-2">
              <h4 className="font-sans font-normal text-sm text-white/90">
                Variáveis de Tráfego e Venda
              </h4>
            </div>

            {/* Control 1: TRÁFEGO DO SITE (MENSAL) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-xs text-white/70 uppercase tracking-wider">
                  TRÁFEGO DO SITE (MENSAL)
                </label>
                <span id="traffic-val" className="font-mono text-sm text-blue-400 font-semibold">
                  {formatNumber(traffic)}
                </span>
              </div>
              <input
                type="range"
                id="traffic-slider"
                className="roi-slider"
                min="500"
                max="50000"
                step="500"
                value={traffic}
                onChange={(e) => setTraffic(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1">
                <span>500</span>
                <span>50 mil+</span>
              </div>
            </div>

            {/* Control 2: TICKET MÉDIO DE PROJETO (R$) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-xs text-white/70 uppercase tracking-wider">
                  TICKET MÉDIO DE PROJETO (R$)
                </label>
                <span id="project-ticket-val" className="font-mono text-sm text-blue-400 font-semibold">
                  {formatBRL(ticket)}
                </span>
              </div>
              <input
                type="range"
                id="project-ticket-slider"
                className="roi-slider"
                min="500"
                max="30000"
                step="500"
                value={ticket}
                onChange={(e) => setTicket(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1">
                <span>R$ 500</span>
                <span>R$ 30 mil+</span>
              </div>
            </div>

            {/* Control 3: CONVERSÃO DE LEAD EM VENDA (%) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-xs text-white/70 uppercase tracking-wider">
                  CONVERSÃO DE LEAD EM VENDA (%)
                </label>
                <span id="conversion-val" className="font-mono text-sm text-blue-400 font-semibold">
                  {conversionRate}%
                </span>
              </div>
              <input
                type="range"
                id="conversion-slider"
                className="roi-slider"
                min="1"
                max="40"
                step="1"
                value={conversionRate}
                onChange={(e) => setConversionRate(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1">
                <span>1%</span>
                <span>40%</span>
              </div>
            </div>

            {/* Painel de Resultados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="metric-card bg-gradient-to-br from-blue-900/20 to-indigo-900/10 border-blue-500/20 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
                <span className="font-mono text-[11px] text-blue-300 uppercase tracking-wider block mb-1.5 font-medium">
                  Retorno Mensal Estimado
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-base text-blue-400 font-bold">+</span>
                  <span
                    id="monthly-return-output"
                    ref={monthlyReturnRef}
                    className="font-display text-2xl sm:text-3xl font-light text-white tracking-tight leading-none"
                  >
                    {formatBRL(monthlyReturn)}
                  </span>
                </div>
              </div>
              <div className="metric-card bg-gradient-to-br from-emerald-900/20 to-teal-900/10 border-emerald-500/20 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
                <span className="font-mono text-[11px] text-emerald-300 uppercase tracking-wider block mb-1.5 font-medium">
                  Potencial Anual Adicional
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-base text-emerald-400 font-bold">+</span>
                  <span
                    id="annual-return-output"
                    ref={annualReturnRef}
                    className="font-display text-2xl sm:text-3xl font-light text-emerald-400 tracking-tight leading-none"
                  >
                    {formatBRL(annualReturn)}
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
              <p className="font-sans text-[11px] text-white/50 font-light leading-relaxed">
                <strong className="text-white/70 font-normal">Nota:</strong> Esta calculadora apresenta apenas uma estimativa técnica com base no potencial de conversão de uma presença digital otimizada, não garantindo resultados exatos.
              </p>
            </div>

            {/* CTA Button */}
            <a href="#contact" className="roi-cta-btn group w-full text-center">
              <div className="roi-cta-spin" />
              <div className="roi-cta-inner justify-center gap-3 text-xs tracking-wider uppercase font-semibold text-white">
                <span className="inline-block overflow-hidden h-[1.4em] relative">
                  <span className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                    <span className="block text-white leading-normal">Potencializar Minha Presença Digital</span>
                    <span className="block text-white leading-normal">Potencializar Minha Presença Digital</span>
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-blue-400 shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
