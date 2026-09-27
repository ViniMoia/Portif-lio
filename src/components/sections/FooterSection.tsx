'use client';

import React from 'react';
import { MessageSquare, Mail, ArrowUpRight, ArrowUp } from 'lucide-react';

export default function FooterSection() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="section-bg">
        <div className="dots-grid" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Grid Principal de Contatos e Branding */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          {/* Coluna 1: Branding & Desenvolvedor */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[11px] tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Disponível para novos projetos</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-light text-white uppercase tracking-tight mb-4">
                Vamos construir algo <br />
                <span className="text-blue-400 font-normal">extraordinário?</span>
              </h3>

              <p className="font-display text-base text-white/70 font-light leading-relaxed max-w-md">
                Engenharia visual, alta performance e inteligência de conversão para transformar a presença digital do seu negócio.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-mono text-xs font-bold">
                VDM
              </div>
              <div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                  Desenvolvedor &amp; Designer
                </span>
                <span className="font-display text-base text-white font-medium">
                  Vinícius Dias Moia
                </span>
              </div>
            </div>
          </div>

          {/* Coluna 2: Cards de Contato Direto */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-4">
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2">
              Canais Diretos de Atendimento
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card WhatsApp */}
              <a
                href="https://wa.me/5591980804717"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-card-glass group"
              >
                <div className="footer-card-icon">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                    WhatsApp Direto
                  </span>
                  <span className="font-sans text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    +55 (91) 98080-4717
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto" />
              </a>

              {/* Card E-mail */}
              <a
                href="mailto:vinidm98@gmail.com"
                className="footer-card-glass group"
              >
                <div className="footer-card-icon">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                    E-mail Profissional
                  </span>
                  <span className="font-sans text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate block">
                    vinidm98@gmail.com
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto" />
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-mono text-xs text-white/40">
            <span>© 2026</span>
            <span>•</span>
            <span className="text-white/70">Vinícius Dias Moia</span>
            <span>•</span>
            <span>Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-white/30 uppercase tracking-widest hidden sm:inline">
              Voltar ao topo
            </span>
            <button
              id="back-to-top"
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
