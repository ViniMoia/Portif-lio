'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SectionNavigator from '@/components/layout/SectionNavigator';
import AmbientBackground from '@/components/layout/AmbientBackground';
import HeroSection from '@/components/sections/HeroSection';
import TimelineSection from '@/components/sections/TimelineSection';
import SelectedWorkSection from '@/components/sections/SelectedWorkSection';
import HorizontalTextSection from '@/components/sections/HorizontalTextSection';
import StacksSection from '@/components/sections/StacksSection';
import UniverseSection from '@/components/sections/UniverseSection';
import RoiCalculatorSection from '@/components/sections/RoiCalculatorSection';
import ConversionSection from '@/components/sections/ConversionSection';
import FaqSection from '@/components/sections/FaqSection';
import FooterSection from '@/components/sections/FooterSection';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';

export default function Home() {
  return (
    <main className="relative z-10 w-full overflow-hidden bg-[#050505]">
      <AmbientBackground />
      <Navbar />
      <SectionNavigator />
      <FloatingWhatsApp />
      <HeroSection />
      <TimelineSection />
      <SelectedWorkSection />
      <HorizontalTextSection />
      <StacksSection />
      <UniverseSection />
      <RoiCalculatorSection />
      <ConversionSection />
      <FaqSection />
      <FooterSection />
    </main>
  );
}
