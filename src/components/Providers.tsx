"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import ClickSpark from "@/components/ClickSpark";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <ClickSpark
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ClickSpark>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
