import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import { CommandPalette } from "./CommandPalette";
import { SmartDetector } from "./SmartDetector";
import { TechnologyBadges } from "./TechnologyBadges";
import { PreviewPanel } from "./PreviewPanel";
import { ActionButtons } from "./ActionButtons";
import { Sidebar } from "./layout/Sidebar";
import { useConfigStore } from "@/store/configStore";

export function ConfigGenerator() {
  const [activeTool, setActiveTool] = useState<"generate" | "compare">("generate");
  const { setCommandOpen, selectedTechnologies } = useConfigStore();

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar activeTool={activeTool} onToolChange={setActiveTool} />
      
      <div className="flex-1 h-full relative p-6 flex flex-col overflow-hidden">
        <CommandPalette />

        {/* Main Content Area */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Left Panel - Generator Controls */}
          {activeTool === "generate" && (
            <div className="w-[400px] shrink-0 flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-thin">
              <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 shrink-0"
              >
                <h1 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                  GitConfig Pro
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Generate standardized Git configuration files with intelligent
                  detection.
                </p>
              </motion.header>

              <button
                onClick={() => setCommandOpen(true)}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg border border-border/40 bg-card/30 transition-all group"
              >
                <Search className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1 text-left text-muted-foreground">
                  Search technologies...
                </span>
                <div className="flex items-center gap-1.5 opacity-20 text-xs">
                  <kbd>⌘</kbd><kbd>K</kbd>
                </div>
              </button>
              <SmartDetector />

              {selectedTechnologies.length > 0 && (
                <div className="glass p-5 rounded-xl">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    Selected Technologies
                  </h3>
                  <TechnologyBadges />
                </div>
              )}

              <ActionButtons />
            </div>
          )}

          {/* Right Panel - Preview/Tool Content (Expands to fill) */}
          <motion.div
            layout
            className="flex-1 h-full overflow-hidden"
          >
            <PreviewPanel activeTool={activeTool} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
