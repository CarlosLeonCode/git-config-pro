import { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';
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
    <div className="flex flex-wrap items-center gap-3">
      <button 
        onClick={handleCopy} 
        disabled={!currentFile}
        className="px-4 py-2 rounded-lg border border-border/40 bg-background/50 text-sm font-medium hover:bg-background/80 transition-all flex items-center gap-2 group"
      >
        {copiedState === 'content' ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
        <span className={copiedState === 'content' ? 'text-green-500' : 'text-muted-foreground group-hover:text-foreground transition-colors'}>
          {copiedState === 'content' ? 'Copied' : 'Copy Content'}
        </span>
      </button>

      <button 
        onClick={handleDownloadZip} 
        className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
      >
        <Download className="w-4 h-4" />
        Download ZIP
      </button>

      {/* TODO: Uncomment cURL button and add logic  */}
      {/* <button 
        onClick={handleCopyCurl} 
        className="px-4 py-2 rounded-lg border border-border/40 bg-background/50 text-sm font-medium hover:bg-background/80 transition-all flex items-center gap-2 group"
      >
        {copiedState === 'curl' ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Terminal className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
        <span className={copiedState === 'curl' ? 'text-green-500' : 'text-muted-foreground group-hover:text-foreground transition-colors'}>
          {copiedState === 'curl' ? 'Copied' : 'Copy cURL'}
        </span>
      </button> */}
    </div>
  );
}
