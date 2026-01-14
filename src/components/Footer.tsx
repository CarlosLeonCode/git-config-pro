import { Github, Globe } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col justify-center items-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
              <img
                src="/icon.png"
                alt="gitconfig pro icon"
                className="rounded-full shadow-sm"
                width={24}
                height={24}
              />
            </div>
            <span className="font-bold text-lg tracking-tight">
              GitConfig Pro
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            The ultimate configuration orchestrator for modern developers.
            <br />
            Built with ❤️ for{" "}
            <a
              href="https://carlosleoncode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              CarlosLeonCode
            </a>{" "}
            and maintained by the community.
          </p>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} GitConfig Pro - Open Source Software.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/CarlosLeonCode/git-config-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://carlosleoncode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
