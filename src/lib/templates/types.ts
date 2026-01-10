export type FileType = 'gitignore' | 'gitattributes' | 'editorconfig' | 'dockerignore' | 'license';

export interface TechnologyTemplate {
  id: string;
  name: string;
  icon: string;
  category: 'language' | 'framework' | 'tool' | 'ide' | 'os' | 'database' | 'cloud';
  description: string;
  files: Partial<Record<FileType, string[]>>;
}

export interface GeneratedFile {
  type: FileType;
  filename: string;
  content: string;
}

export interface ConfigState {
  selectedTechnologies: string[];
  generatedFiles: GeneratedFile[];
  activeTab: FileType;
}

export const FILE_NAMES: Record<FileType, string> = {
  gitignore: '.gitignore',
  gitattributes: '.gitattributes',
  editorconfig: '.editorconfig',
  dockerignore: '.dockerignore',
  license: 'LICENSE',
};

export const FILE_DESCRIPTIONS: Record<FileType, string> = {
  gitignore: 'Files and directories to ignore in Git',
  gitattributes: 'Path-specific Git settings',
  editorconfig: 'Editor configuration for consistency',
  dockerignore: 'Files to exclude from Docker builds',
  license: 'Open source license',
};
