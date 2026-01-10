import { motion } from 'framer-motion';
import { Search, Github, Zap, FileCode, Layers, Sparkles } from 'lucide-react';
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
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-glow-secondary/5 rounded-full blur-3xl" />
      </div>

      <CommandPalette />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
              <FileCode className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold">
              <span className="gradient-text">GitConfig</span>
              <span className="text-foreground"> Pro</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The ultimate Git configuration generator. Create .gitignore, .gitattributes,
            .editorconfig, and .dockerignore files in seconds.
          </p>
          
          {/* Features */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-primary" />
              Smart Detection
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary" />
              Multi-file Support
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              20+ Technologies
            </span>
          </div>
        </motion.header>

        {/* Search Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <button
            onClick={() => setCommandOpen(true)}
            className="w-full max-w-2xl mx-auto glass rounded-xl p-4 flex items-center gap-4 hover:bg-secondary/50 transition-all duration-200 group"
          >
            <Search className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="flex-1 text-left text-muted-foreground">
              Search technologies...
            </span>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 rounded bg-secondary text-xs font-mono text-foreground">⌘</kbd>
              <kbd className="px-2 py-1 rounded bg-secondary text-xs font-mono text-foreground">K</kbd>
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-xl p-4"
              >
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Selected Technologies ({selectedTechnologies.length})
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
            transition={{ delay: 0.2 }}
            className="h-[600px]"
          >
            <PreviewPanel />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">Open Source on GitHub</span>
          </a>
        </motion.footer>
      </div>
    </div>
  );
}
