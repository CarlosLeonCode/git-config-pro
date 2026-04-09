import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { en } from '../lib/i18n/en';
import { es } from '../lib/i18n/es';

export type Language = 'en' | 'es';
type Translations = typeof en;

interface I18nState {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
}

const translations = {
  en,
  es,
};

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      language: 'en',
      t: en,
      setLanguage: (lang: Language) => set({ language: lang, t: translations[lang] }),
    }),
    {
      name: 'gitconfig-i18n',
    }
  ) as any
);

