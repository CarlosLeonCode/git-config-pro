"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileCode, Zap, Layers, Sparkles, ArrowRight, Github, Shield, Command, Heart, GitFork, Star, ExternalLink } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

export default function Index() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-1/4 w-[800px] h-[600px] bg-primary/[0.05] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[500px] bg-accent/[0.05] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-border/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
              <FileCode className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">GitConfig Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

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
            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-xl glass hover:bg-secondary/50">
              <Command className="mr-2 w-4 h-4" /> View Documentation
            </Button>
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
                  <Button variant="outline" className="w-full sm:w-auto gap-2">
                    <Github className="w-4 h-4" />
                    View Issues & PRs
                  </Button>
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

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                <FileCode className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-lg tracking-tight">GitConfig Pro</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The ultimate configuration orchestrator for modern developers. Built with ❤️ for the open source community.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/gitconfig-generate" className="hover:text-primary transition-colors">Generator</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">CLI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">License</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GitConfig Pro. Open Source Software.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
