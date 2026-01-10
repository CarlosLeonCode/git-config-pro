import { motion } from 'framer-motion';
import { Search, Github, Zap, FileCode, Layers, Sparkles, Star } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { SmartDetector } from './SmartDetector';
import { TechnologyBadges } from './TechnologyBadges';
import { PreviewPanel } from './PreviewPanel';
import { ActionButtons } from './ActionButtons';
import { useConfigStore } from '@/store/configStore';
import { ThemeToggle } from './ThemeToggle';
import { MotionButton } from './ui/MotionButton';

export function ConfigGenerator() {
  const { setCommandOpen, selectedTechnologies } = useConfigStore();

  return (
    <div className="min-h-screen. relative overflow-hidden py-16">
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
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img src="/icon.png" alt="gitconfig pro icon" className='rounded-full' width={24} height={24}/>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              GitConfig Pro
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Generate standardized Git configuration files with intelligent detection.
          </motion.p>
          

        </motion.header>

        {/* Minimal Search Trigger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12"
        >
          <button
            onClick={() => setCommandOpen(true)}
            className="w-full max-w-2xl mx-auto flex items-center gap-4 px-5 py-4 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/50 transition-all group"
          >
            <Search className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="flex-1 text-left text-muted-foreground">
              Search technologies...
            </span>
            <div className="flex items-center gap-1.5 opacity-20 text-xs">
              <kbd className="bg-transparent border-none shadow-none">⌘</kbd>
              <kbd className="bg-transparent border-none shadow-none">K</kbd>
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
            className="h-[500px] lg:h-[600px]"
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
