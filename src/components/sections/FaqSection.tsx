'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelpCircle, ChevronDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FaqItemData {
  num: string;
  question: string;
  answer: string;
}

const faqData: FaqItemData[] = [
  {
    num: '01',
    question: 'Por que eu preciso de um site se o meu Instagram/WhatsApp já vende?',
    answer: 'Redes sociais são um "terreno alugado": algoritmos mudam e contas podem ser bloqueadas. Um site é o seu terreno próprio, com 100% de controle. Ele transmite credibilidade imediata e atrai clientes que buscam por soluções diretamente no Google.'
  },
  {
    num: '02',
    question: 'O site vai abrir bem no celular?',
    answer: 'Com certeza! 70 – 80% dos acessos vem de smartphones, construo os projetos com foco total no celular (Mobile-First). Isso garante botões no tamanho certo, leitura confortável e carregamento rápido para você não perder vendas.'
  },
  {
    num: '03',
    question: 'Dá para integrar o site com o meu sistema / WhatsApp/Formulários?',
    answer: 'Sim! O site será uma verdadeira ferramenta de negócios. Integramos o botão de WhatsApp direto para a sua equipe e conectamos formulários ao seu e-mail, planilhas ou sistema de gestão (CRM) para automatizar o atendimento.'
  },
  {
    num: '04',
    question: 'O meu site vai aparecer na primeira página do Google?',
    answer: 'Desconfie de promessas mágicas para o topo do dia para a noite. O que entrego é um site com as melhores práticas de SEO Técnico: rápido e otimizado para o Google ler perfeitamente. Essa é a fundação essencial para crescer nas buscas.'
  },
  {
    num: '05',
    question: 'O que me impede de fazer sozinho naquelas plataformas gratuitas (Wix, Canva, etc)?',
    answer: 'Plataformas gratuitas são como roupas de tamanho único: genéricas e limitadas. O meu trabalho vai muito além de "montar telas": entrego estratégia, navegação focada em conversões (UX/UI) e a base técnica profissional que o seu negócio exige para crescer.'
  }
];

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const faqSec = sectionRef.current;
      if (!faqSec) return;

      // Header Scroll Animation
      gsap.from('#faq .faq-header', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: faqSec,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // Accordion Items Staggered Entrance
      gsap.from('.faq-accordion-item', {
        opacity: 0,
        y: 40,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-accordion-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      <div className="section-bg">
        <div className="dots-grid" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header da Seção FAQ */}
        <div className="text-center mb-12 sm:mb-16 faq-header">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[11px] tracking-widest uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Esclareça Suas Dúvidas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-light text-white tracking-tight leading-none uppercase mb-4 sm:mb-6">
            Perguntas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 font-normal">
              Frequentes
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Respostas transparentes sobre metodologia de desenvolvimento, estratégias de conversão, SEO e tecnologia para o seu projeto.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4 faq-accordion-container">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  className="faq-trigger"
                  type="button"
                  onClick={() => toggleItem(idx)}
                >
                  <span className="faq-trigger-num">{item.num}</span>
                  <span className="faq-trigger-title">{item.question}</span>
                  <div className="faq-icon-box">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div
                  className="faq-answer-wrapper"
                  style={{ maxHeight: isOpen ? '300px' : '0px' }}
                >
                  <div className="faq-answer-content">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
