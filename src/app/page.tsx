"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Layers,
  Sparkles,
  ArrowRight,
  Github,
  Shield,
  Heart,
  GitFork,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/ui/feature-card";
import { useI18nStore } from "@/store/i18nStore";

export default function Index() {
  const { t } = useI18nStore();
  return (
    <div className="min-h-screen bg-background/60 relative overflow-hidden flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <main className="flex-1 relative z-10 flex flex-col items-center pt-24 lg:pt-32 pb-16">
        
        {/* Glow Effects */}
        <div className="absolute top-0 inset-x-0 h-screen overflow-hidden -z-10 pointer-events-none flex justify-center">
          <div className="absolute top-[-20%] w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-[100%]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1000px] mx-auto px-4 text-center space-y-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/50 border border-border/50 text-sm font-medium text-muted-foreground shadow-[0_0_30px_-5px_rgba(var(--primary),0.2)] backdrop-blur-md transition-all hover:bg-background hover:border-primary/50 cursor-pointer">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>{t.landing.badge}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter text-balance leading-[1.05]">
            {t.landing.title1} <br className="hidden md:block" />
            {t.landing.title2}
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto leading-relaxed text-balance">
            {t.landing.description1} <code className="text-foreground bg-foreground/10 px-1.5 py-0.5 rounded-md font-mono text-sm">.gitignore</code> {t.landing.description2}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/gitconfig-generate">
              <Button
                size="lg"
                className="h-14 px-8 text-base font-semibold rounded-full shadow-[0_0_40px_-10px_rgba(var(--primary),0.4)] hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.6)] transition-all duration-300 group"
              >
                {t.landing.buttonLaunch}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="https://github.com/CarlosLeonCode/git-config-pro" target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-semibold rounded-full bg-background/50 backdrop-blur-sm border-border/60 hover:bg-muted/50 transition-all duration-300"
              >
                <Github className="mr-2 w-4 h-4" />
                {t.landing.buttonGithub}
              </Button>
            </a>
          </div>
        </motion.div>

        {/* What, Why & How Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1000px] mx-auto mt-20 px-4"
        >
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Box 1: The Problem (Why) */}
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-xl font-bold">{t.landing.whyTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.landing.whyDesc}
              </p>
            </div>

            {/* Box 2: The Solution (What) */}
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <Zap className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-xl font-bold">{t.landing.whatTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.landing.whatDesc}
              </p>
            </div>

            {/* Box 3: The Usage (How) */}
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t.landing.howTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.landing.howDesc}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-6 px-4"
        >
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-yellow-500" />}
            title={t.landing.feat1Title}
            description={t.landing.feat1Desc}
          />
          <FeatureCard
            icon={<Layers className="w-6 h-6 text-blue-500" />}
            title={t.landing.feat2Title}
            description={t.landing.feat2Desc}
          />
          <FeatureCard
            icon={<GitFork className="w-6 h-6 text-green-500" />}
            title={t.landing.feat3Title}
            description={t.landing.feat3Desc}
          />
        </motion.div>

        {/* Open Source Ecosystem */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 w-full max-w-6xl mx-auto px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.landing.osTitle1} <span className="gradient-text">{t.landing.osTitle2}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: Community Driven */}
            <div className="glass p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-card/50 to-secondary/20">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.landing.osCard1Title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t.landing.osCard1Desc}
              </p>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{t.landing.osCard1Star}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-blue-500" />
                  <span>{t.landing.osCard1Fork}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Contribute */}
            <div className="glass p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-card/50 to-secondary/20">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Github className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.landing.osCard2Title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t.landing.osCard2Desc}
              </p>
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <Github className="w-4 h-4" />
                {t.landing.osCard2Button}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
