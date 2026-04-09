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
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
            onClick={() => setCommandOpen(false)}
          />

          {/* Drawer Wrapper */}
          <div className="fixed inset-y-0 right-0 z-[100] flex pointer-events-none w-full sm:w-[450px] md:w-[500px]">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="w-full h-full bg-background/95 backdrop-blur-2xl border-l border-border/50 shadow-2xl flex flex-col pointer-events-auto"
            >
              {/* Header / Search Input */}
              <div className="flex-none p-5 lg:p-6 pb-5 border-b border-border/50 bg-background/50">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">Technology Stack</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Select the tools for your project</p>
                  </div>
                  <button
                    onClick={() => setCommandOpen(false)}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search languages, frameworks, tools..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-card/30 border border-border/60 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none outline-transparent focus:ring-2 ring-primary/20 focus:border-primary/50 transition-all font-medium text-foreground placeholder:text-muted-foreground shadow-sm"
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto scrollbar-thin p-5 lg:p-6 space-y-8">
                {Object.entries(groupedTechnologies).map(
                  ([category, techs]) => (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {categoryLabels[category] || category}
                        </div>
                        <div className="h-px flex-1 bg-border/40"></div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
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
                                "command-item w-full text-left justify-start p-3 h-auto group",
                                isSelected
                                  ? "selected bg-primary/10 border border-primary/20"
                                  : "bg-transparent border border-transparent hover:bg-card hover:border-border/50"
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <div className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                                  isSelected ? "bg-background shadow-sm" : "bg-card group-hover:bg-background"
                                )}>
                                  <span className="text-2xl drop-shadow-sm">
                                    {tech.icon}
                                  </span>
                                </div>
                                
                                <div className="flex-1 min-w-0 py-0.5">
                                  <div className={cn(
                                    "text-sm font-semibold truncate transition-colors",
                                    isSelected ? "text-foreground" : "text-foreground/90 group-hover:text-foreground"
                                  )}>
                                    {tech.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 leading-relaxed">
                                    {tech.description}
                                  </div>
                                </div>
                                
                                {isSelected ? (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 mt-2"
                                  >
                                    <Check className="w-3 h-3 text-primary-foreground stroke-[3]" />
                                  </motion.div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-border/60 flex-shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                )}
                              </div>
                            </MotionButton>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
                {filteredTechnologies.length === 0 && (
                  <div className="text-center py-16 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4 border border-border/50">
                      <Search className="w-6 h-6 text-muted-foreground/60" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      No matching technologies
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
                      We couldn't find any tool matching "{query}". Try another search term.
                    </p>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="flex-none flex items-center justify-between p-4 lg:p-6 border-t border-border/50 bg-card/30">
                <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <kbd className="min-w-[20px] font-sans">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="font-sans">Enter</kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="font-sans">Esc</kbd>
                    Close
                  </span>
                </div>
                <div className="flex-1 sm:hidden">
                  <p className="text-xs font-medium text-muted-foreground">Press Esc to close</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {selectedTechnologies.length}
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    Selected
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
