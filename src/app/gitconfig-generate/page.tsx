"use client";

import { ConfigGenerator } from '@/components/ConfigGenerator';
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer';

export default function GeneratorPage() {
  return (
    <div className='bg-background/60'>
      <Navigation />
      <ConfigGenerator />
      <Footer />
    </div>
  );
}
