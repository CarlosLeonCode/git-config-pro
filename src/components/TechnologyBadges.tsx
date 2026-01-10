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
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ 
              delay: index * 0.03,
              type: 'spring',
              stiffness: 500,
              damping: 30
            }}
            className="tech-badge group"
          >
            <span className="text-base">{tech.icon}</span>
            <span className="font-medium text-foreground">{tech.name}</span>
            <button
              onClick={() => removeTechnology(id)}
              className="w-4 h-4 -mr-0.5 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-100 hover:bg-destructive/20 transition-all duration-200"
            >
              <X className="w-2.5 h-2.5 text-muted-foreground group-hover:text-destructive" />
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}