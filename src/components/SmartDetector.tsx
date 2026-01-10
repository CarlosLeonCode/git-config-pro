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
      <div className="flex flex-col items-center gap-3">
        <motion.div 
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            detectedCount !== null 
              ? 'bg-primary/10 border border-primary/20' 
              : isDragging 
                ? 'bg-primary/10 border border-primary/20' 
                : 'bg-card/50 border border-border/20'
          }`}
        >
          {detectedCount !== null ? (
            <Zap className="w-6 h-6 text-primary" />
          ) : (
            <Upload className={`w-6 h-6 ${isDragging ? 'text-primary' : 'text-muted-foreground/40'}`} />
          )}
        </motion.div>
        
        <div className="text-center">
          <div className="text-sm font-medium text-foreground">
            {detectedCount !== null ? `Detected ${detectedCount} Techs` : 'Smart Detection'}
          </div>
          <p className="text-xs text-muted-foreground/60 mt-1">
            {detectedCount !== null ? 'Config updated automatically' : 'Drag package.json or requirements.txt'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
