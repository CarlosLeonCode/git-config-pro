import { motion } from 'framer-motion';
import { Search, Github, Zap, FileCode, Layers, Sparkles, Star } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { SmartDetector } from './SmartDetector';
import { TechnologyBadges } from './TechnologyBadges';
import { PreviewPanel } from './PreviewPanel';
import { ActionButtons } from './ActionButtons';
import { useConfigStore } from '@/store/configStore';

export function ConfigGenerator() {
  const { setCommandOpen, selectedTechnologies } = useConfigStore();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary glow */}
        <div className="absolute top-[-20%] left-1/4 w-[800px] h-[600px] bg-primary/[0.07] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        {/* Accent glow */}
        <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[500px] bg-accent/[0.05] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Top gradient fade */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent" />
      </div>

      <CommandPalette />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="icon-container w-14 h-14">
              <FileCode className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              <span className="gradient-text">GitConfig</span>
              <span className="text-foreground"> Pro</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed text-balance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The ultimate Git configuration orchestrator. Generate .gitignore, .gitattributes,
            .editorconfig, and .dockerignore files with intelligent detection.
          </motion.p>
          
          {/* Features */}
          <motion.div 
            className="flex items-center justify-center gap-8 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="feature-badge">
              <Zap className="w-4 h-4" />
              Smart Detection
            </span>
            <span className="feature-badge">
              <Layers className="w-4 h-4" />
              Multi-file Support
            </span>
            <span className="feature-badge">
              <Sparkles className="w-4 h-4" />
              20+ Technologies
            </span>
          </motion.div>
        </motion.header>

        {/* Search Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <button
            onClick={() => setCommandOpen(true)}
            className="w-full max-w-2xl mx-auto search-trigger p-4 flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/80 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
            <span className="flex-1 text-left text-muted-foreground text-base">
              Search technologies...
            </span>
            <div className="flex items-center gap-1.5">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </div>
          </button>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            <SmartDetector />
            
            {selectedTechnologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-5"
              >
                <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  Selected Technologies
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {selectedTechnologies.length}
                  </span>
                </h3>
                <TechnologyBadges />
              </motion.div>
            )}

            <ActionButtons />
          </div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-[600px]"
          >
            <PreviewPanel />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium">Open Source on GitHub</span>
          </a>
        </motion.footer>
      </div>
    </div>
  );
}