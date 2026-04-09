import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Github } from 'lucide-react';
import Link from 'next/link'
import { useI18nStore } from '@/store/i18nStore';

export default function Navigation () {
    const { language, setLanguage } = useI18nStore();
    return(
      <nav className="relative z-50 border-b border-border/40 bg-background/40 backdrop-blur-xl py-2">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                <img src="/icon.png" alt="gitconfig pro icon" className='rounded-full shadow-sm' width={24} height={24}/>
              </div>
              <span className="gradient-text font-bold">GitConfig</span>
              <span className="text-foreground font-bold"> Pro</span>
            </motion.div>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-xs font-semibold px-2 py-1 uppercase rounded-md hover:bg-secondary/50 border border-border/40 transition-colors"
            >
              {language}
            </button>
            <ThemeToggle />
            <motion.a 
              href="https://github.com/CarlosLeonCode/git-config-pro" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block p-2 rounded-lg hover:bg-secondary/50"
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </nav>
    )
}
