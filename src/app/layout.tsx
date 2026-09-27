import type { Metadata } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'Vinícius Moia | Engenharia Visual & Arquitetura Digital',
  description: 'Arquitetura digital estratégica desenhada para autoridade e conversão. Experiências digitais B2B de alto impacto.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: ['Engenharia Visual', 'Arquitetura Digital', 'Frontend', 'Next.js', 'Three.js', 'GSAP'],
  authors: [{ name: 'Vinícius Dias Moia' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://viniciusmoia.com.br/',
    title: 'Vinícius Moia | Engenharia Visual & Arquitetura Digital',
    description: 'Arquitetura digital estratégica desenhada para autoridade e conversão.',
    images: [{ url: 'https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1781752610/imagem-link_bspbkl.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinícius Moia | Engenharia Visual & Arquitetura Digital',
    description: 'Arquitetura digital estratégica desenhada para autoridade e conversão.',
    images: ['https://res.cloudinary.com/dpt3zi8kx/image/upload/f_auto,q_auto/v1781752610/imagem-link_bspbkl.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="bg-[#050505] text-white selection:bg-blue-500 selection:text-white">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
