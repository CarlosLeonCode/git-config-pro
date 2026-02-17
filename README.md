<div align="center">
  
# Git Config Pro
  
<img width="400" height="400" alt="hp-open-api" src="https://github.com/user-attachments/assets/a3c93e94-8c01-4424-9857-6afb10c937e7" />  
</div>

<br /> 

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)

**GitC onfig Pro** is the ultimate configuration orchestrator for modern developers. It intelligently generates battle-tested boilerplate configurations for `.gitignore`, `.gitattributes`, `.editorconfig`, `.dockerignore`, and more—instantly tailored to your specific project stack.

## 🚀 Features

- **Smart Detection**: Automatically detects your project dependencies (via `package.json` upload) and recommends the perfect settings.
- **Multi-File Generation**: Create multiple config files simultaneously.
- **20+ Supported Technologies**: From Node.js and Python to Ruby on Rails and Go.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for a premium user experience.
- **Dark/Light Mode**: Fully themeable interface.

## 🛠️ Technology Stack

- **Frontend Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

Here is an overview of the project's file structure to help you get oriented:

```
/
├── public/              # Static assets (images, favicons)
├── src/
│   ├── components/      # React components
│   │   ├── ui/          # Reusable UI components (buttons, dialogs, etc.)
│   │   ├── ConfigGenerator.tsx  # Main application logic and layout
│   │   ├── PreviewPanel.tsx     # Monaco editor preview
│   │   ├── SmartDetector.tsx    # Drag-and-drop file detection logic
│   │   └── ...
│   ├── lib/
│   │   ├── templates/   # Core logic for configuration generation
│   │   │   ├── engine.ts       # Template merging and processing engine
│   │   │   ├── technologies.ts # Database of supported technologies & templates
│   │   │   └── types.ts        # TypeScript interfaces for templates
│   │   └── utils.ts     # Utility functions
│   ├── pages/           # Application pages (Routing)
│   │   ├── Index.tsx    # Landing page
│   │   └── Generator.tsx # App interface
│   ├── store/           # Global state management
│   │   └── configStore.ts # Zustand store for selected techs and files
│   ├── App.tsx          # Main App component & Routing setup
│   └── index.css        # Global styles & Tailwind directives
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
└── ...
```

### Key Files Explained

- **`src/lib/templates/technologies.ts`**: This is the heart of the application. It contains the mock database of all supported technologies (Node, Python, Ruby, etc.) and their defining configuration rules (what goes into `.gitignore` or `.editorconfig` for each).
- **`src/lib/templates/engine.ts`**: Contains the logic that takes a list of selected technologies and "merges" their templates into a single, cohesive file output without duplicates.
- **`src/store/configStore.ts`**: Manages the application state, such as which technologies are currently selected by the user and the content of the generated files.

## ⚡ How to Add New Features

We love contributions! One of the easiest and most impactful ways to contribute is by adding support for new technologies.

### Adding a New Technology Template

1.  **Open `src/lib/templates/technologies.ts`**.
2.  Find the `technologies` array.
3.  **Add a new object** following the `TechnologyTemplate` interface.

**Example:**

```typescript
{
  id: 'my-new-tech',
  name: 'My New Tech',
  icon: '🚀', // Use an emoji or React node
  category: 'framework', // 'language' | 'framework' | 'tool' | 'database'
  description: 'A brief description',
  files: {
    gitignore: [
        '# Dependencies',
        '/vendor/',
        '*.log'
    ],
    dockerignore: [
        '/vendor/',
        'Dockerfile'
    ]
    // You can also add 'editorconfig', 'gitattributes', etc.
  }
}
```

4.  **Save the file**. The application will automatically pick up the new technology, add it to the search index, and include its rules when generated!

## 🤝 Contributing

This project is open source and we welcome contributions!

1.  Read our [Code of Conduct](CODE_OF_CONDUCT.md).
2.  See the [Contributing Guide](CONTRIBUTING.md) for details on how to get started, report bugs, or submit pull requests.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## ☕ Support My Work

If this project bring you value, you can support me here:

[![☕ Support on Ko-fi](https://img.shields.io/badge/Support%20My%20Work%20on%20Ko--fi-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/carlosleoncode)

