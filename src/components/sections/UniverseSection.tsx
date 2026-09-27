'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { X, ArrowUpRight } from 'lucide-react';

interface TechPlanetData {
  id: string;
  name: string;
  category: string;
  color: number;
  glowColor: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  exp: string;
  desc: string;
  features: string[];
  projects: string[];
  projectUrl: string;
}

const techPlanetsData: TechPlanetData[] = [
  {
    id: 'gsap',
    name: 'GSAP',
    category: 'Motion & Animation Engine',
    color: 0x22c55e,
    glowColor: 'rgba(34, 197, 94, 0.4)',
    radius: 0.85,
    orbitRadius: 6.5,
    orbitSpeed: 0.009,
    exp: '1+ Anos',
    desc: 'Motor de animação de alta performance para a web moderna, permitindo criar sequências complexas, timelines e controle preciso de física e scroll.',
    features: ['ScrollTrigger & Timelines Complexas', 'MorphSVG & MotionPath Native', 'Renderização Fluida a 60/120 FPS'],
    projects: ['Aura Shield', 'Vértice Ferramental', 'Hermes Pen'],
    projectUrl: 'https://aura-shield-security.netlify.app/'
  },
  {
    id: 'threejs',
    name: 'Three.js',
    category: '3D & WebGL Graphic Engine',
    color: 0x3b82f6,
    glowColor: 'rgba(59, 130, 246, 0.4)',
    radius: 1.1,
    orbitRadius: 10.5,
    orbitSpeed: 0.0065,
    exp: '1+ Anos',
    desc: 'Biblioteca WebGL 3D para renderização de cenas tridimensionais avançadas no navegador, iluminação procedural e shaders customizados.',
    features: [
      'Arquitetura de Cena Procedural Multicamadas e Otimização de Buffers',
      'Raycasting Interativo com Projeção Matemática de Coordenadas 3D para 2D',
      'Cinemática Orbital Contínua e Transição Cinemática de Câmera Integrada ao GSAP'
    ],
    projects: ['Aura Shield', 'Este Portfólio'],
    projectUrl: 'https://aura-shield-security.netlify.app/'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend & Event-Driven Runtime',
    color: 0x10b981,
    glowColor: 'rgba(16, 185, 129, 0.4)',
    radius: 0.95,
    orbitRadius: 14.5,
    orbitSpeed: 0.0048,
    exp: '1+ Anos',
    desc: 'Ambiente de execução JavaScript server-side de alto desempenho orientado a eventos, ideal para microserviços e APIs escaláveis.',
    features: [
      'Arquitetura Multi-Tenant e Otimização de Cache',
      'Transações Relacionais ACID e Modelagem de Dados com Prisma',
      'Segurança de Autenticação em Camadas e Validação com Zod'
    ],
    projects: ['E-Commerce', 'Este Portfólio'],
    projectUrl: 'https://e-commerce-systen.netlify.app/'
  },
  {
    id: 'react',
    name: 'React',
    category: 'UI & Component Architecture',
    color: 0x06b6d4,
    glowColor: 'rgba(6, 182, 212, 0.4)',
    radius: 1.0,
    orbitRadius: 18.5,
    orbitSpeed: 0.0036,
    exp: '1+ Anos',
    desc: 'Biblioteca reativa para criação de interfaces declarativas baseadas em componentes reutilizáveis, gerenciamento de estado e ecossistemas web complexos.',
    features: ['Custom Hooks & React Context', 'Otimização de Virtual DOM & Memoization', 'Arquitetura de Componentes Reutilizáveis'],
    projects: ['E-Commerce', 'Este Portfólio'],
    projectUrl: 'https://e-commerce-systen.netlify.app/'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Fullstack & SSR Framework',
    color: 0xe2e8f0,
    glowColor: 'rgba(226, 232, 240, 0.4)',
    radius: 1.15,
    orbitRadius: 22.5,
    orbitSpeed: 0.0028,
    exp: '1+ Anos',
    desc: 'Framework React para produção com suporte nativo a Server-Side Rendering (SSR), Static Site Generation (SSG), App Router e otimização automatizada.',
    features: [
      'Domínio do App Router com React Server Components (RSC) e Metadados Dinâmicos',
      'Middleware de Proteção Perimetral e Route Handlers RESTful Padronizados',
      'Arquitetura em Camadas com Separação Estrita de Responsabilidades (Clean Architecture)'
    ],
    projects: ['E-Commerce', 'Este Portfólio'],
    projectUrl: 'https://e-commerce-systen.netlify.app/'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Relational Database System',
    color: 0x1d4ed8,
    glowColor: 'rgba(29, 78, 216, 0.4)',
    radius: 1.05,
    orbitRadius: 26.5,
    orbitSpeed: 0.0021,
    exp: '1+ Anos',
    desc: 'Banco de dados relacional enterprise de código aberto, famoso pela consistência ACID rigorosa, robustez e suporte avançado a dados relacionais e JSONB.',
    features: [
      'Modelagem de Dados com Tipagem Nativa do PostgreSQL (Enums, Decimais, JSON e Sequências)',
      'Integridade Referencial, Ações em Cascata e Agregações Analíticas',
      'Garantia de Atomicidade e Isolamento Concorrente com Transações ACID'
    ],
    projects: ['E-Commerce'],
    projectUrl: 'https://e-commerce-systen.netlify.app/'
  }
];

export default function UniverseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closePanelRef = useRef<() => void>(() => { });

  const [selectedPlanet, setSelectedPlanet] = useState<TechPlanetData | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [hoveredName, setHoveredName] = useState<string>('');
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    const universeCanvas = canvasRef.current;
    const universeSec = sectionRef.current;
    if (!universeCanvas || !universeSec) return;

    // Scene & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      canvas: universeCanvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2));

    const defaultCameraPos = { x: 0, y: 16, z: 36 };
    camera.position.set(defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z);
    camera.lookAt(0, 0, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404050, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffdd66, 3, 100);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // 1. Sun Core & Glow Aura
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    const sunGeo = new THREE.SphereGeometry(2.4, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    const sunGlowGeo = new THREE.SphereGeometry(2.8, 32, 32);
    const sunGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const sunGlowMesh = new THREE.Mesh(sunGlowGeo, sunGlowMat);
    sunGroup.add(sunGlowMesh);

    // 2. Stars Field (2000 stars)
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 2000;
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 220;
      starPositions[i + 1] = (Math.random() - 0.5) * 220;
      starPositions[i + 2] = (Math.random() - 0.5) * 220;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.6,
      transparent: true,
      opacity: 0.7
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // 3. Space Floating Particles (500 particles)
    const partGeo = new THREE.BufferGeometry();
    const partCount = 500;
    const partPositions = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount * 3; i += 3) {
      partPositions[i] = (Math.random() - 0.5) * 100;
      partPositions[i + 1] = (Math.random() - 0.5) * 100;
      partPositions[i + 2] = (Math.random() - 0.5) * 100;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0x9333ea,
      size: 0.8,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(partGeo, partMat);
    scene.add(particleField);

    // 4. Planets Setup
    const planetsList: Array<{
      mesh: THREE.Mesh;
      glowMesh: THREE.Mesh;
      data: TechPlanetData;
      angle: number;
      orbitRadius: number;
      orbitSpeed: number;
    }> = [];

    techPlanetsData.forEach((data, index) => {
      // Orbit Line Ring
      const orbitCurve = new THREE.EllipseCurve(0, 0, data.orbitRadius, data.orbitRadius, 0, 2 * Math.PI, false, 0);
      const points = orbitCurve.getPoints(100);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.y)));
      const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 });
      const orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
      scene.add(orbitLine);

      // Planet Mesh
      const planetGeo = new THREE.SphereGeometry(data.radius, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.35,
        metalness: 0.5,
        emissive: data.color,
        emissiveIntensity: 0.2
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);

      // Planet Glow Shell
      const planetGlowGeo = new THREE.SphereGeometry(data.radius * 1.25, 24, 24);
      const planetGlowMat = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
      });
      const planetGlowMesh = new THREE.Mesh(planetGlowGeo, planetGlowMat);
      planetMesh.add(planetGlowMesh);

      scene.add(planetMesh);

      const initialAngle = (index / techPlanetsData.length) * Math.PI * 2;

      planetsList.push({
        mesh: planetMesh,
        glowMesh: planetGlowMesh,
        data,
        angle: initialAngle,
        orbitRadius: data.orbitRadius,
        orbitSpeed: data.orbitSpeed
      });
    });

    // Interactivity Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let currentHovered: typeof planetsList[0] | null = null;

    const updateTooltipPosition = (planet: typeof planetsList[0]) => {
      if (!tooltipRef.current) return;
      const vector = planet.mesh.position.clone();
      vector.project(camera);

      const x = (vector.x * 0.5 + 0.5) * universeCanvas.clientWidth;
      const y = (-(vector.y * 0.5) + 0.5) * universeCanvas.clientHeight;

      tooltipRef.current.style.left = `${x}px`;
      tooltipRef.current.style.top = `${y}px`;
    };

    let pointerDownPos = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        const rect = universeCanvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const onPointerLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
      if (currentHovered) {
        gsap.to(currentHovered.mesh.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        currentHovered = null;
      }
      setIsTooltipVisible(false);
      document.body.style.cursor = 'default';
    };

    const onPlanetClick = (e: PointerEvent) => {
      // Se houve arrasto superior a 10px (ex: rolagem da página), não interpreta como toque no planeta
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist > 10) return;

      const rect = universeCanvas.getBoundingClientRect();
      const clickMouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const clickRaycaster = new THREE.Raycaster();
      clickRaycaster.setFromCamera(clickMouse, camera);

      const meshesToTest = planetsList.map(p => p.mesh);
      const intersects = clickRaycaster.intersectObjects(meshesToTest);

      let targetPlanet: typeof planetsList[0] | null = null;
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        targetPlanet = planetsList.find(p => p.mesh === hitMesh || p.mesh.children.includes(hitMesh)) || null;
      } else if (currentHovered) {
        targetPlanet = currentHovered;
      }

      if (targetPlanet) {
        setSelectedPlanet(targetPlanet.data);
        setIsPanelOpen(true);

        const pPos = targetPlanet.mesh.position;
        gsap.to(camera.position, {
          x: pPos.x + 3.5,
          y: pPos.y + 2.5,
          z: pPos.z + 4.5,
          duration: 1.5,
          ease: 'power3.inOut',
          onUpdate: () => {
            camera.lookAt(pPos);
          }
        });
      }
    };

    universeCanvas.addEventListener('pointerdown', onPointerDown);
    universeCanvas.addEventListener('pointermove', onPointerMove);
    universeCanvas.addEventListener('pointerleave', onPointerLeave);
    universeCanvas.addEventListener('pointerup', onPlanetClick);

    // Animation Loop
    const clock = new THREE.Clock();
    let isUniverseVisible = false;

    const universeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isUniverseVisible = entry.isIntersecting;
        if (!entry.isIntersecting) {
          if (currentHovered) {
            gsap.to(currentHovered.mesh.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
            currentHovered = null;
          }
          setIsTooltipVisible(false);
          document.body.style.cursor = 'default';
        }
      });
    }, { threshold: 0.05 });
    universeObserver.observe(universeSec);

    let animFrameId: number;

    const animateUniverse = () => {
      animFrameId = requestAnimationFrame(animateUniverse);
      if (!isUniverseVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Sun Pulsation & Rotation
      sunGroup.rotation.y = elapsedTime * 0.15;
      const pulseScale = 1.0 + Math.sin(elapsedTime * 2) * 0.03;
      sunGlowMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // Stars slow rotation
      starField.rotation.y = elapsedTime * 0.01;
      particleField.rotation.y = -elapsedTime * 0.015;

      // Update Planet Orbits
      planetsList.forEach(planet => {
        const currentSpeed = currentHovered === planet ? planet.orbitSpeed * 0.2 : planet.orbitSpeed;
        planet.angle += currentSpeed;

        planet.mesh.position.x = Math.cos(planet.angle) * planet.orbitRadius;
        planet.mesh.position.z = Math.sin(planet.angle) * planet.orbitRadius;
        planet.mesh.position.y = Math.sin(planet.angle * 2) * 0.4;

        planet.mesh.rotation.y += 0.01;
      });

      // Raycasting Hover Detection
      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = planetsList.map(p => p.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const hitPlanet = planetsList.find(p => p.mesh === hitMesh || p.mesh.children.includes(hitMesh));

        if (hitPlanet && currentHovered !== hitPlanet) {
          if (currentHovered) {
            gsap.to(currentHovered.mesh.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
          }
          currentHovered = hitPlanet;
          gsap.to(currentHovered.mesh.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.3 });

          setHoveredName(currentHovered.data.name);
          setIsTooltipVisible(true);
          document.body.style.cursor = 'pointer';
        }
      } else {
        if (currentHovered) {
          gsap.to(currentHovered.mesh.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
          currentHovered = null;
          setIsTooltipVisible(false);
          document.body.style.cursor = 'default';
        }
      }

      if (currentHovered) {
        updateTooltipPosition(currentHovered);
      }

      renderer.render(scene, camera);
    };

    animateUniverse();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2));
    };

    const handleClosePanel = () => {
      setIsPanelOpen(false);
      setSelectedPlanet(null);
      gsap.to(camera.position, {
        x: defaultCameraPos.x,
        y: defaultCameraPos.y,
        z: defaultCameraPos.z,
        duration: 1.4,
        ease: 'power3.out',
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        }
      });
    };

    closePanelRef.current = handleClosePanel;

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      universeCanvas.removeEventListener('pointerdown', onPointerDown);
      universeCanvas.removeEventListener('pointermove', onPointerMove);
      universeCanvas.removeEventListener('pointerleave', onPointerLeave);
      universeCanvas.removeEventListener('pointerup', onPlanetClick);
      window.removeEventListener('resize', handleResize);
      universeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  const closePanel = () => {
    if (closePanelRef.current) {
      closePanelRef.current();
    }
  };

  return (
    <section className="universe-section" id="universe-section" ref={sectionRef}>
      {/* Three.js Canvas */}
      <canvas id="universe-canvas" ref={canvasRef} />

      {/* Floating 3D Tooltip */}
      <div
        id="planet-tooltip"
        ref={tooltipRef}
        className={`planet-tooltip ${isTooltipVisible ? 'visible' : ''}`}
      >
        <span id="tooltip-text">{hoveredName}</span>
      </div>

      {/* Overlay Header & Content */}
      <div className="universe-overlay max-w-7xl mx-auto px-4 sm:px-6">
        <div className="universe-header-title text-center sm:text-left mt-4 sm:mt-8">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-light text-white tracking-tight uppercase leading-none">
            Minhas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 font-normal">
              Habilidades
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/60 max-w-md mt-3 font-light leading-relaxed">
            Explore o ecossistema de tecnologias. Passe o mouse para inspecionar e clique sobre qualquer planeta para detalhar dados de arquitetura.
          </p>
        </div>

        {/* Footer / CTA da Seção */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
              6 Tecnologias Ativas
            </span>
          </div>
          <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
            Interação 3D • WebGL + Three.js
          </div>
        </div>
      </div>

      {/* Painel Lateral Glassmorphism */}
      <div id="glass-side-panel" className={`glass-side-panel ${isPanelOpen ? 'open' : ''}`}>
        <div
          className="panel-glow-accent"
          id="panel-glow-accent"
          style={{
            background: selectedPlanet ? `radial-gradient(circle, ${selectedPlanet.glowColor} 0%, transparent 70%)` : undefined
          }}
        />

        {/* Header do Painel */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span
              id="panel-tech-category"
              className="font-mono text-[10px] text-blue-400 uppercase tracking-widest border border-blue-500/20 px-3 py-1 rounded-full bg-blue-500/10"
            >
              {selectedPlanet?.category || 'Front-end Motion'}
            </span>
            <button
              id="close-panel-btn"
              onClick={closePanel}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 id="panel-tech-name" className="text-4xl font-display font-light text-white uppercase tracking-tight mb-2">
            {selectedPlanet?.name || 'GSAP'}
          </h3>
          <p id="panel-tech-exp" className="font-mono text-xs text-white/50 mb-6">
            Anos de Experiência: <span id="panel-tech-exp-val" className="text-white font-semibold">{selectedPlanet?.exp || '4+ anos'}</span>
          </p>
          <p id="panel-tech-desc" className="font-display text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
            {selectedPlanet?.desc || 'Motor de animação de alto desempenho para a web moderna...'}
          </p>

          {/* Principais Recursos */}
          <div className="mb-6">
            <h4 className="font-display text-xs text-white/50 uppercase tracking-wider mb-3 font-medium">
              Principais Recursos &amp; Domínio
            </h4>
            <ul id="panel-tech-features" className="space-y-2 font-display text-sm text-white/80 font-light">
              {selectedPlanet?.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Projetos Relacionados */}
          <div>
            <h4 className="font-display text-xs text-white/50 uppercase tracking-wider mb-3 font-medium">
              Aplicações &amp; Casos de Uso
            </h4>
            <div id="panel-tech-projects" className="flex flex-wrap gap-2">
              {selectedPlanet?.projects.map((proj, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                >
                  {proj}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer do Painel / CTA */}
        <div className="pt-6 border-t border-white/10">
          <button
            type="button"
            id="panel-cta-btn"
            onClick={() => {
              if (selectedPlanet?.projectUrl && selectedPlanet.projectUrl.startsWith('http')) {
                window.open(selectedPlanet.projectUrl, '_blank', 'noopener,noreferrer');
                closePanel();
              }
            }}
            className="group w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-sans text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <span className="inline-block overflow-hidden h-[1.3em] relative">
              <span className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                <span className="block text-white">Ver projeto relacionado</span>
                <span className="block text-white">Ver projeto relacionado</span>
              </span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-white shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45" />
          </button>
        </div>
      </div>
    </section>
  );
}
