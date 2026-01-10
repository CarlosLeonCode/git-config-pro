import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileJson, FileText, Sparkles, Zap } from 'lucide-react';
import { useConfigStore } from '@/store/configStore';
import {
  detectTechnologiesFromPackageJson,
  detectTechnologiesFromRequirementsTxt,
} from '@/lib/templates/engine';

export function SmartDetector() {
  const [isDragging, setIsDragging] = useState(false);
  const [detectedCount, setDetectedCount] = useState<number | null>(null);
  const { setTechnologies, selectedTechnologies } = useConfigStore();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (!file) return;

      const content = await file.text();
      let detected: string[] = [];

      if (file.name === 'package.json') {
        detected = detectTechnologiesFromPackageJson(content);
      } else if (file.name === 'requirements.txt') {
        detected = detectTechnologiesFromRequirementsTxt(content);
      }

      if (detected.length > 0) {
        const merged = [...new Set([...selectedTechnologies, ...detected])];
        setTechnologies(merged);
        setDetectedCount(detected.length);
        setTimeout(() => setDetectedCount(null), 3000);
      }
    },
    [selectedTechnologies, setTechnologies]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 30 }}
      className={`drop-zone p-8 text-center ${isDragging ? 'active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div 
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            detectedCount !== null 
              ? 'bg-primary/20 border border-primary/30' 
              : isDragging 
                ? 'bg-primary/10 border border-primary/20' 
                : 'bg-secondary/50 border border-border/50'
          }`}
          animate={detectedCount !== null ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {detectedCount !== null ? (
            <Sparkles className="w-7 h-7 text-primary" />
          ) : (
            <Upload className={`w-7 h-7 transition-colors duration-300 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          )}
        </motion.div>
        
        {detectedCount !== null ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <div className="text-primary font-semibold flex items-center gap-2 justify-center">
              <Zap className="w-4 h-4" />
              Detected {detectedCount} technologies!
            </div>
            <div className="text-xs text-muted-foreground">
              Files are being generated...
            </div>
          </motion.div>
        ) : (
          <>
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                Smart Detection
              </div>
              <div className="text-sm text-muted-foreground">
                Drop a file to auto-detect technologies
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground/80">
              <span className="flex items-center gap-2">
                <FileJson className="w-4 h-4" />
                package.json
              </span>
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                requirements.txt
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}