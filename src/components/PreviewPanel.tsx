import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { FileType, FILE_NAMES, FILE_DESCRIPTIONS } from '@/lib/templates/types';
import { useConfigStore } from '@/store/configStore';
import { FileCode, FileText, Settings, Box, Scale } from 'lucide-react';

const TAB_ICONS: Record<FileType, React.ReactNode> = {
  gitignore: <FileCode className="w-4 h-4" />,
  gitattributes: <FileText className="w-4 h-4" />,
  editorconfig: <Settings className="w-4 h-4" />,
  dockerignore: <Box className="w-4 h-4" />,
  license: <Scale className="w-4 h-4" />,
};

export function PreviewPanel() {
  const { generatedFiles, activeTab, setActiveTab, selectedTechnologies } = useConfigStore();
  
  const availableTabs = generatedFiles.map((f) => f.type);
  const currentFile = generatedFiles.find((f) => f.type === activeTab);

  // If active tab not in available tabs, switch to first available
  if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
    setActiveTab(availableTabs[0]);
  }

  if (selectedTechnologies.length === 0) {
    return (
      <div className="glass rounded-xl h-full flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
            <FileCode className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No technologies selected
          </h3>
          <p className="text-muted-foreground text-sm">
            Press{' '}
            <kbd className="px-2 py-1 rounded bg-secondary text-foreground font-mono text-xs">
              ⌘K
            </kbd>{' '}
            to search and add technologies, or drag a package.json file to auto-detect.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl h-full flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center border-b border-border/50 bg-card/50">
        {availableTabs.map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`tab-button flex items-center gap-2 relative ${
              activeTab === type ? 'active' : ''
            }`}
          >
            {TAB_ICONS[type]}
            <span>{FILE_NAMES[type]}</span>
            {activeTab === type && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* File Description */}
      <div className="px-4 py-2 text-xs text-muted-foreground bg-card/30 border-b border-border/30">
        {FILE_DESCRIPTIONS[activeTab]}
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
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
              language={activeTab === 'editorconfig' ? 'ini' : 'shell'}
              value={currentFile?.content || '# No content generated'}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: 'none',
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'hidden',
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
