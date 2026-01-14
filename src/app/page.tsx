"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileCode, Zap, Layers, Sparkles, ArrowRight, Github, Shield, Command, Heart, GitFork, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Index() {
  return (
    <div className="min-h-screen bg-background/60 relative overflow-hidden flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <main className="flex-1 relative z-10 flex flex-col justify-center items-center text-center px-4 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium text-muted-foreground animate-fade-in backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>The Next Generation of Config Management</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
            Master Your <br />
            <span className="gradient-text">Development Workflow</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            Generate battle-tested boilerplate configurations for <span className="text-foreground font-medium">.gitignore</span>, <span className="text-foreground font-medium">.gitattributes</span>, and more. Instantly tailored to your stack.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/gitconfig-generate">
              <Button size="lg" className="h-12 px-8 text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                Start Generating <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
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
            title="Smart Detection"
            description="Automatically detects your project dependencies and recommends the perfect configuration settings."
          />
          <FeatureCard
            icon={<Layers className="w-6 h-6 text-blue-500" />}
            title="Multi-File Generation"
            description="Create .gitignore, .dockerignore, and .editorconfig files simultaneously with a unified interface."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-green-500" />}
            title="Industry Standards"
            description="Templates based on best practices from top tech companies and open-source communities."
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
            Empowering the <span className="gradient-text">Open Source</span> Ecosystem
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: Community Driven */}
            <div className="glass p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-card/50 to-secondary/20">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Community Driven</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                GitConfig Pro is built by developers, for developers. We believe in the power of open collaboration to create tools that solve real-world problems.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Star us on GitHub</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-blue-500" />
                  <span>Fork the Repo</span>
                </div>
              </div>
            </div>

            {/* Card 2: Contribute */}
            <div className="glass p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-card/50 to-secondary/20">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Github className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Contribute Code</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Found a bug? Want to add a new technology template? We welcome pull requests! Check out our contribution guidelines to get started.
              </p>
              <a href="https://github.com/CarlosLeonCode/git-config-pro/issues" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <Github className="w-4 h-4" />
                  View Issues & PRs
                </Button>
              </a>
            </div>
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass p-6 rounded-2xl border border-white/5 bg-card/30 hover:bg-card/50 transition-all duration-300 hover:-translate-y-1 group">
      <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-border/50">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

