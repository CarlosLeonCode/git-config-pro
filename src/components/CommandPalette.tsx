import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check } from 'lucide-react';
import { useState } from 'react';
import { technologies } from '@/lib/templates/technologies';
import { useConfigStore } from '@/store/configStore';

export function CommandPalette() {
  const [query, setQuery] = useState('');
  const { isCommandOpen, setCommandOpen, selectedTechnologies, toggleTechnology } = useConfigStore();

  const filteredTechnologies = query
    ? technologies.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase())
      )
    : technologies;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(!isCommandOpen);
      }
      if (e.key === 'Escape') {
        setCommandOpen(false);
      }
    },
    [isCommandOpen, setCommandOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const groupedTechnologies = filteredTechnologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  const categoryLabels: Record<string, string> = {
    language: 'Languages',
    framework: 'Frameworks',
    tool: 'Tools',
    ide: 'IDEs',
    os: 'Operating Systems',
    database: 'Databases',
    cloud: 'Cloud',
  };

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setCommandOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed left-1/2 top-[15%] -translate-x-1/2 w-full max-w-xl z-50"
          >
            <div className="glass-strong rounded-xl shadow-2xl overflow-hidden glow-subtle">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-border/50">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search technologies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
                  autoFocus
                />
                <button
                  onClick={() => setCommandOpen(false)}
                  className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto scrollbar-thin p-2">
                {Object.entries(groupedTechnologies).map(([category, techs]) => (
                  <div key={category} className="mb-4">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
                      {categoryLabels[category] || category}
                    </div>
                    {techs.map((tech) => {
                      const isSelected = selectedTechnologies.includes(tech.id);
                      return (
                        <button
                          key={tech.id}
                          onClick={() => toggleTechnology(tech.id)}
                          className={`command-item w-full text-left ${
                            isSelected ? 'bg-primary/10 border border-primary/30' : ''
                          }`}
                        >
                          <span className="text-xl">{tech.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{tech.name}</div>
                            <div className="text-sm text-muted-foreground">{tech.description}</div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {filteredTechnologies.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No technologies found for "{query}"
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono">↑↓</kbd>{' '}
                    Navigate
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono">Enter</kbd>{' '}
                    Select
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono">Esc</kbd>{' '}
                    Close
                  </span>
                </div>
                <span>{selectedTechnologies.length} selected</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
