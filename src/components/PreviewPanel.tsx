import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import { FileType, FILE_NAMES, FILE_DESCRIPTIONS } from "@/lib/templates/types";
import { useConfigStore } from "@/store/configStore";
import {
  FileCode,
  FileText,
  Settings,
  Box,
  Scale,
  Code2,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TAB_ICONS: Record<FileType, React.ReactNode> = {
  gitignore: <FileCode className="w-4 h-4" />,
  gitattributes: <FileText className="w-4 h-4" />,
  editorconfig: <Settings className="w-4 h-4" />,
  dockerignore: <Box className="w-4 h-4" />,
  prettierignore: <Sparkles className="w-4 h-4" />,
  eslintignore: <AlertCircle className="w-4 h-4" />,
  license: <Scale className="w-4 h-4" />,
};

export function PreviewPanel() {
  const { generatedFiles, activeTab, setActiveTab, selectedTechnologies } =
    useConfigStore();

  const availableTabs = generatedFiles.map((f) => f.type);
  const currentFile = generatedFiles.find((f) => f.type === activeTab);

  // If active tab not in available tabs, switch to first available
  if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
    setActiveTab(availableTabs[0]);
  }

  if (selectedTechnologies.length === 0) {
    return (
      <div className="glass rounded-2xl h-full flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-6 border border-border/50">
            <Code2 className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            No technologies selected
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Press <kbd className="mx-1">⌘</kbd>
            <kbd className="mr-1">K</kbd> to search and add technologies, or
            drag a package.json file to auto-detect.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl h-full flex flex-col overflow-hidden">
      {/* Minimal Tabs */}
      <div className="flex items-center gap-1 p-1.5 border-b border-border/20 bg-background/50 overflow-x-auto scrollbar-none">
        {availableTabs.map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              activeTab === type
                ? "bg-foreground/5 text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
            )}
          >
            {TAB_ICONS[type]}
            {FILE_NAMES[type]}
          </button>
        ))}
      </div>

      {/* File Description */}
      <div className="px-4 py-2.5 text-xs text-muted-foreground bg-card/20 border-b border-border/30 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        {FILE_DESCRIPTIONS[activeTab]}
      </div>

      {/* Editor */}
      <div className="flex-1 relative bg-card/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0"
          >
            <Editor
              height="100%"
              language={activeTab === "editorconfig" ? "ini" : "shell"}
              value={currentFile?.content || "# No content generated"}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
                fontLigatures: true,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: "none",
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                lineHeight: 1.6,
                letterSpacing: 0.3,
                scrollbar: {
                  vertical: "visible",
                  horizontal: "hidden",
                  verticalScrollbarSize: 8,
                },
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
