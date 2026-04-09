import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useConfigStore } from "@/store/configStore";
import { FileType, FILE_NAMES } from "@/lib/templates/types";
import { DiffViewer } from "./DiffViewer";
import { SmartDetector } from "./SmartDetector";
import { Upload, X, FileText, Command } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConfigComparator() {
  const { generatedFiles, activeTab, uploadedConfigs, setUploadedConfig, setCommandOpen } = useConfigStore();
  const uploadedContent = uploadedConfigs[activeTab];

  // Obtenemos el contenido actual para comparar
  const currentContent = generatedFiles.find((f) => f.type === activeTab)?.content || "";

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
          const content = reader.result as string;
          setUploadedConfig(activeTab, content);
        };

        reader.readAsText(file);
      }
    },
    [activeTab, setUploadedConfig]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  if (!currentContent) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="max-w-md w-full text-center space-y-8 py-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Configure Comparison</h2>
            <p className="text-muted-foreground">
              To compare files, we first need to know your stack to build the recommended template.
            </p>
          </div>

          <div className="space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs">1</span>
                Auto-detect (Recommended)
              </h3>
              <SmartDetector />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background/80 px-2 text-muted-foreground backdrop-blur-sm">Or select manually</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs">2</span>
                Choose technologies
              </h3>
              <button
                onClick={() => setCommandOpen(true)}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border border-border/40 bg-card/50 hover:bg-card hover:border-primary/30 transition-all font-medium text-muted-foreground hover:text-foreground group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Command className="w-4 h-4 text-primary" />
                </div>
                <span className="flex-1 text-left">Open technology library</span>
                <div className="flex items-center gap-1.5 opacity-40">
                  <kbd className="font-sans">⌘</kbd><kbd className="font-sans">K</kbd>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="px-6 py-4 border-b border-border/30">
        <h2 className="text-lg font-semibold tracking-tight">Compare {FILE_NAMES[activeTab]}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload your local <span className="font-mono">{FILE_NAMES[activeTab]}</span> to compare it with the recommended configuration.
        </p>
      </div>

      <div className="flex-1 relative p-6">
        {uploadedContent ? (
          <div className="h-full flex flex-col pt-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Comparison Results
                </h3>
                <div className="text-xs text-muted-foreground mt-2 flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-[3px] bg-red-500/20 border border-red-500/50"></span>
                    <span className="font-medium text-foreground/80">Red:</span> Outdated / Not recommended
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-[3px] bg-green-500/20 border border-green-500/50"></span>
                    <span className="font-medium text-foreground/80">Green:</span> Missing / Recommended to add
                  </span>
                </div>
              </div>
              <button
                onClick={() => setUploadedConfig(activeTab, "")}
                className="text-xs px-3 py-1.5 rounded-md bg-secondary/50 hover:bg-secondary text-secondary-foreground font-medium transition-colors border border-border/50"
              >
                Change file
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden border border-border/50 flex flex-col bg-card">
              <div className="flex border-b border-border/50 bg-muted/40">
                <div className="flex-1 px-4 py-2.5 text-xs font-semibold text-muted-foreground border-r border-border/50 flex items-center gap-2">
                  Your Local File
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-background border border-border/50 font-mono font-normal">
                    {FILE_NAMES[activeTab]}
                  </span>
                </div>
                <div className="flex-1 px-4 py-2.5 text-xs font-semibold text-primary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Recommended Template
                </div>
              </div>
              <div className="flex-1 relative">
                <DiffViewer
                  original={uploadedContent}
                  modified={currentContent}
                  language={activeTab === "editorconfig" ? "ini" : "shell"}
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              "h-full flex flex-col items-center justify-center p-12 text-center cursor-pointer transition-all border-2 border-dashed",
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-border/50 hover:border-primary/50 hover:bg-card"
            )}
          >
            <input {...getInputProps()} />
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Drop your {FILE_NAMES[activeTab]}</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Drag and drop your local file,
              <br />
              or click to browse from your device.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
