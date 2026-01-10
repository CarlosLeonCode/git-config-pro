import { create } from 'zustand';
import { FileType, GeneratedFile } from '@/lib/templates/types';
import { generateAllFiles } from '@/lib/templates/engine';

interface ConfigStore {
  selectedTechnologies: string[];
  generatedFiles: GeneratedFile[];
  activeTab: FileType;
  isCommandOpen: boolean;
  
  // Actions
  addTechnology: (id: string) => void;
  removeTechnology: (id: string) => void;
  setTechnologies: (ids: string[]) => void;
  toggleTechnology: (id: string) => void;
  clearTechnologies: () => void;
  setActiveTab: (tab: FileType) => void;
  setCommandOpen: (open: boolean) => void;
  regenerateFiles: () => void;
}

export const useConfigStore = create<ConfigStore>((set, get) => ({
  selectedTechnologies: [],
  generatedFiles: [],
  activeTab: 'gitignore',
  isCommandOpen: false,

  addTechnology: (id: string) => {
    const { selectedTechnologies } = get();
    if (!selectedTechnologies.includes(id)) {
      const newTechnologies = [...selectedTechnologies, id];
      set({
        selectedTechnologies: newTechnologies,
        generatedFiles: generateAllFiles(newTechnologies),
      });
    }
  },

  removeTechnology: (id: string) => {
    const { selectedTechnologies } = get();
    const newTechnologies = selectedTechnologies.filter((t) => t !== id);
    set({
      selectedTechnologies: newTechnologies,
      generatedFiles: generateAllFiles(newTechnologies),
    });
  },

  setTechnologies: (ids: string[]) => {
    set({
      selectedTechnologies: ids,
      generatedFiles: generateAllFiles(ids),
    });
  },

  toggleTechnology: (id: string) => {
    const { selectedTechnologies, addTechnology, removeTechnology } = get();
    if (selectedTechnologies.includes(id)) {
      removeTechnology(id);
    } else {
      addTechnology(id);
    }
  },

  clearTechnologies: () => {
    set({
      selectedTechnologies: [],
      generatedFiles: [],
    });
  },

  setActiveTab: (tab: FileType) => {
    set({ activeTab: tab });
  },

  setCommandOpen: (open: boolean) => {
    set({ isCommandOpen: open });
  },

  regenerateFiles: () => {
    const { selectedTechnologies } = get();
    set({
      generatedFiles: generateAllFiles(selectedTechnologies),
    });
  },
}));
