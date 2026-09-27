'use client';

import React, { useEffect, useState } from 'react';

interface NavSection {
  id: string;
  num: string;
  label: string;
  ariaLabel: string;
}

const navSections: NavSection[] = [
  { id: 'timeline', num: '01.', label: 'Trajetória', ariaLabel: 'Dobra 01: Trajetória' },
  { id: 'selected-work', num: '02.', label: 'Projetos', ariaLabel: 'Dobra 02: Projetos' },
  { id: 'services-text-section', num: '03.', label: 'Serviços', ariaLabel: 'Dobra 03: Serviços' },
  { id: 'stacks-section', num: '04.', label: 'Stacks', ariaLabel: 'Dobra 04: Stacks' },
  { id: 'universe-section', num: '05.', label: 'Habilidades', ariaLabel: 'Dobra 05: Habilidades' },
  { id: 'roi-section', num: '06.', label: 'Calculadora ROI', ariaLabel: 'Dobra 06: Calculadora ROI' },
  { id: 'contact', num: '07.', label: 'Contato', ariaLabel: 'Dobra 07: Contato' },
  { id: 'faq', num: '08.', label: 'FAQ', ariaLabel: 'Dobra 08: FAQ' }
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState<string>('timeline');

  useEffect(() => {
    const pagObserverOptions = {
      threshold: 0.2,
      rootMargin: '-10% 0px -30% 0px'
    };

    const pagObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, pagObserverOptions);

    navSections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        pagObserver.observe(el);
      }
    });

    return () => {
      pagObserver.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="pagination-indicator"
      id="pagination-indicator"
      aria-label="Navegador de Seções"
    >
      {navSections.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            onClick={(e) => handleClick(e, sec.id)}
            className={`pag-dot ${isActive ? 'active' : ''}`}
            data-section={sec.id}
            aria-label={sec.ariaLabel}
          >
            <span className="pag-tooltip">
              <span className="pag-tooltip-num">{sec.num}</span> {sec.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
