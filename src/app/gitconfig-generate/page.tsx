"use client";

import { ConfigGenerator } from "@/components/ConfigGenerator";
import Footer from "@/components/Footer";

export default function GeneratorPage() {
  return (
    <div className="bg-background/60 flex flex-col min-h-[100dvh] lg:h-[100dvh] lg:overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden min-h-0">
        <ConfigGenerator />
        <div className="mt-auto lg:hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
