import { useState } from "react";
import {
  GitCompare,
  Zap,
  Bot,
  Github,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTool: "generate" | "compare";
  onToolChange: (tool: "generate" | "compare") => void;
}

const TOOLS = [
  { id: "generate", label: "Generator", icon: Zap },
  { id: "compare", label: "Comparator", icon: GitCompare },
];

export function Sidebar({ activeTool, onToolChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <aside
      className={cn(
        "border-r border-border/20 bg-background flex flex-col p-2 gap-2 justify-between transition-all duration-300",
        isCollapsed ? "w-16" : "w-48",
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between p-2 mb-4">
          {!isCollapsed && (
            <>
              <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                <img
                  src="/icon.png"
                  alt="gitconfig pro icon"
                  className="rounded-full shadow-sm"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-xs text-foreground truncate">
                GitConfig Pro
              </span>
            </>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-foreground/5 text-muted-foreground"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id as "generate" | "compare")}
              className={cn(
                "p-3 rounded-lg transition-all flex items-center gap-3",
                activeTool === tool.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
              )}
              title={isCollapsed ? tool.label : ""}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm">{tool.label}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1 border-t border-border/20 pt-2">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-3 text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg hover:bg-foreground/5"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 shrink-0" />
          ) : (
            <Moon className="w-5 h-5 shrink-0" />
          )}
          {!isCollapsed && (
            <span className="text-sm font-medium">Toggle Theme</span>
          )}
        </button>
        <a
          href="https://github.com/CarlosLeonCode/git-config-pro"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg hover:bg-foreground/5"
        >
          <Github className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">GitHub</span>}
        </a>
      </div>
    </aside>
  );
}
