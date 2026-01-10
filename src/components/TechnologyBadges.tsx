import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getTechnologyById } from '@/lib/templates/technologies';
import { useConfigStore } from '@/store/configStore';

export function TechnologyBadges() {
  const { selectedTechnologies, removeTechnology } = useConfigStore();

  if (selectedTechnologies.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap gap-2"
    >
      {selectedTechnologies.map((id, index) => {
        const tech = getTechnologyById(id);
        if (!tech) return null;

        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.02 }}
            className="glass flex items-center gap-2 px-3 py-1.5 rounded-full group"
          >
            <span className="text-sm">{tech.icon}</span>
            <span className="text-sm font-medium text-foreground">{tech.name}</span>
            <button
              onClick={() => removeTechnology(id)}
              className="w-4 h-4 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-destructive/20 transition-colors group-hover:opacity-100 opacity-50"
            >
              <X className="w-2.5 h-2.5 text-muted-foreground group-hover:text-destructive" />
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
