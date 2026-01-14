import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check, Command } from "lucide-react";
import { technologies } from "@/lib/templates/technologies";
import { useConfigStore } from "@/store/configStore";
import { MotionButton } from "./ui/MotionButton";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const [query, setQuery] = useState("");
  const {
    isCommandOpen,
    setCommandOpen,
    selectedTechnologies,
    toggleTechnology,
  } = useConfigStore();

  const filteredTechnologies = query
    ? technologies.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase())
      )
    : technologies;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(!isCommandOpen);
      }
      if (e.key === "Escape") {
        setCommandOpen(false);
      }
    },
    [isCommandOpen, setCommandOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const groupedTechnologies = filteredTechnologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  const categoryLabels: Record<string, string> = {
    language: "Languages",
    framework: "Frameworks",
    tool: "Tools",
    ide: "IDEs",
    os: "Operating Systems",
    database: "Databases",
    cloud: "Cloud",
  };

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
            onClick={() => setCommandOpen(false)}
          />

          {/* Modal Wrapper */}
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xl pointer-events-auto"
            >
              <div className="glass-strong rounded-2xl overflow-hidden glow-ambient">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Command className="w-4 h-4 text-primary" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search technologies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base font-medium"
                    autoFocus
                  />
                  <button
                    onClick={() => setCommandOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors duration-200"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto scrollbar-thin p-2">
                  {Object.entries(groupedTechnologies).map(
                    ([category, techs]) => (
                      <div key={category} className="mb-4 last:mb-0">
                        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-3 py-2">
                          {categoryLabels[category] || category}
                        </div>
                        <div className="space-y-0.5">
                          {techs.map((tech) => {
                            const isSelected = selectedTechnologies.includes(
                              tech.id
                            );
                            return (
                              <MotionButton
                                key={tech.id}
                                onClick={() => toggleTechnology(tech.id)}
                                variant="ghost"
                                className={cn(
                                  "command-item w-full text-left justify-start",
                                  isSelected &&
                                    "selected bg-primary/10 border-primary/30"
                                )}
                              >
                                <span className="text-xl flex-shrink-0">
                                  {tech.icon}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-foreground truncate">
                                    {tech.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground truncate">
                                    {tech.description}
                                  </div>
                                </div>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20"
                                  >
                                    <Check className="w-3 h-3 text-primary-foreground" />
                                  </motion.div>
                                )}
                              </MotionButton>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                  {filteredTechnologies.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-3">
                        <Search className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        No technologies found for "
                        <span className="text-foreground">{query}</span>"
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-card/30">
                  <div className="flex items-center gap-5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <kbd className="min-w-[20px]">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd>Enter</kbd>
                      Select
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd>Esc</kbd>
                      Close
                    </span>
                  </div>
                  <span className="text-xs font-medium text-primary">
                    {selectedTechnologies.length} selected
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
