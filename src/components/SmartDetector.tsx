import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileJson, FileText, Sparkles } from 'lucide-react';
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
      transition={{ delay: 0.3 }}
      className={`drop-zone p-6 text-center transition-all duration-300 ${
        isDragging ? 'active border-primary/50 bg-primary/5' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center">
          {detectedCount !== null ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-primary"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          ) : (
            <Upload className={`w-6 h-6 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          )}
        </div>
        
        {detectedCount !== null ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-medium"
          >
            ✨ Detected {detectedCount} technologies!
          </motion.div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground">
              Drop a file to auto-detect technologies
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1.5">
                <FileJson className="w-3.5 h-3.5" />
                package.json
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                requirements.txt
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
