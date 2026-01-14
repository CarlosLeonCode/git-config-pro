import { motion } from "framer-motion";
import { X } from "lucide-react";
import { getTechnologyById } from "@/lib/templates/technologies";
import { useConfigStore } from "@/store/configStore";
import { MotionButton } from "./ui/MotionButton";

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
      {selectedTechnologies.map((id, _index) => {
        const tech = getTechnologyById(id);
        if (!tech) return null;

        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/40 bg-background/50 backdrop-blur-sm group transition-all hover:border-border/80"
          >
            <span className="text-lg grayscale group-hover:grayscale-0 transition-all">
              {tech.icon}
            </span>
            <span className="text-sm font-medium text-foreground">
              {tech.name}
            </span>
            <button
              onClick={() => removeTechnology(id)}
              className="ml-1 p-0.5 rounded-md text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
