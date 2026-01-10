import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Terminal, Check } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useConfigStore } from '@/store/configStore';
import { generateCurlCommand } from '@/lib/templates/engine';

export function ActionButtons() {
  const [copiedState, setCopiedState] = useState<'content' | 'curl' | null>(null);
  const { generatedFiles, selectedTechnologies, activeTab } = useConfigStore();

  const currentFile = generatedFiles.find((f) => f.type === activeTab);

  const handleCopy = async () => {
    if (!currentFile) return;
    await navigator.clipboard.writeText(currentFile.content);
    setCopiedState('content');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const handleCopyCurl = async () => {
    const curl = generateCurlCommand(selectedTechnologies);
    await navigator.clipboard.writeText(curl);
    setCopiedState('curl');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    
    for (const file of generatedFiles) {
      zip.file(file.filename, file.content);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'gitconfig-files.zip');
  };

  if (selectedTechnologies.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap items-center gap-3"
    >
      <button onClick={handleCopy} className="action-button" disabled={!currentFile}>
        {copiedState === 'content' ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
        <span>{copiedState === 'content' ? 'Copied!' : 'Copy to clipboard'}</span>
      </button>

      <button onClick={handleDownloadZip} className="action-button-primary">
        <Download className="w-4 h-4" />
        <span>Download ZIP</span>
      </button>

      <button onClick={handleCopyCurl} className="action-button">
        {copiedState === 'curl' ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Terminal className="w-4 h-4 text-muted-foreground" />
        )}
        <span>{copiedState === 'curl' ? 'Copied!' : 'Copy curl command'}</span>
      </button>
    </motion.div>
  );
}
