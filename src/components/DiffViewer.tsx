import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const DiffEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.DiffEditor),
  { ssr: false }
);

interface DiffViewerProps {
  original: string;
  modified: string;
  language: string;
}

export function DiffViewer({ original, modified, language }: DiffViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full"
    >
      <DiffEditor
        original={original}
        modified={modified}
        language={language}
        theme="vs-dark"
        height="100%"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
          renderSideBySide: true,
          scrollBeyondLastLine: false,
        }}
      />
    </motion.div>
  );
}
