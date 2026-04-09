# Changelog

All notable changes to **GitConfig Pro** will be documented in this file.

## [2.0.0] - "The IDE-Grade Leap"

This massive release shifts GitConfig Pro from a simple boilerplate generator to a proper workspace-oriented SaaS tool, focusing heavily on developer experience (DX), layout aesthetics, and file auditing capabilities.

### ✨ Major Features

- **Interactive File Comparator (The Auditor):** 
  A fully integrated diff-viewer engine powered by Monaco Editor. Developers can now drag and drop their local `.gitignore` (or any dotfile) and visually compare it line-by-line against the recommended golden standards. Includes semantic red/green color-coding mapped to what to remove and what to add.
  
- **Dual-Tool Workspace Architecture:**
  The monolithic application has been split into independent `Tools`. Introduced a sleek vertical `Sidebar` to toggle smoothly between the *Config Generator* and the *Comparator* without losing the selected technology context.
  
- **Client-Side i18n Engine (English & Spanish):**
  Full internationalization built from scratch using Zustand and localStorage. Enables instant translations across the app including the Landing Page and Internal features *without* full page reloads or route changes.

### 🎨 Design & UX Refactor

- **Premium Flat UI Evolution:**
  Moved away from outdated padding-heavy "Glassmorphism" boxes towards a strict, flat, IDE-like dark aesthetic. Removed rounded wrappers to give the editor full focus. The landing page now features "mesh spot glow" lighting directly inspired by professional SaaS websites (`openvid.dev`, `vercel.com`).
  
- **Punchy Landing Page Narrative:**
  Completely redesigned the hero section. Swapped heavy paragraphs for a snappy Problem-Solution-Action scheme (`Why it matters`, `What we do`, `How to use it`) to improve conversion and readability.

- **Smart "Dropzone" Improvements:**
  The `SmartDetector` now flawlessly bypasses standard browser MIME-type restrictions natively for dotfiles, allowing dropping `.gitignore` or `package.json` equally effortlessly.

### 🐛 Fixes & Mechanics

- Repaired severe JSX conditional rendering syntax errors affecting the Comparator dropzone state.
- Zustand store restructured to smoothly sync the `uploadedConfig` file buffer directly from the Tool context to the Monaco Diff Viewer seamlessly.
- Optimized massive padding and global margins that caused double-scrolling constraints in the internal App page. App is now strictly flex-bounded to desktop viewport heights.
