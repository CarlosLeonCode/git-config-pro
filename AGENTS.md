# GitConfig Pro - Documentación del Proyecto

## Big Picture Overview

### Qué es este proyecto

**GitConfig Pro** es una aplicación web moderna orientada a optimizar tu flujo de trabajo al manejar configuraciones estándar (`.gitignore`, `.gitattributes`, `.editorconfig`, `.dockerignore`). Funciona no solo como un **Generador** inteligente para arrancar de cero, sino también como un **Comparador interactivo** para auditar un repositorio existente contra un "template recomendado" (oro) para tu stack tecnológico específico.
Soporta 26+ tecnologías y frameworks.

**URL de Producción:** `https://git-config-pro.carlosleoncode.dev`

---

## Tech Stack Principal

| Categoría | Tecnologías |
|-----------|-------------|
| **Framework** | Next.js 16 + React 18 + TypeScript |
| **Estado** | Zustand |
| **UI/UX**   | Tailwind CSS + Shadcn UI + Radix UI + Framer Motion |
| **Editor**  | Monaco Editor (Code Viewer y visualizador Diff) |
| **Deploy**  | Netlify |

---

## Estructura de Carpetas

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout con metadata
│   ├── page.tsx           # Landing page
│   ├── gitconfig-generate/ # Aplicación principal (App Core)
│   └── ...                # SEO config
│
├── components/
│   ├── ui/                # Componentes base (Shadcn + Radix)
│   ├── layout/            # Wrapper visuales
│   │   └── Sidebar.tsx    # Menú lateral para navegar Tools 
│   ├── ConfigGenerator.tsx # Core de la aplicación (Maneja las Tools)
│   ├── PreviewPanel.tsx   # Vista de la tool "Generator" (Mónaco en crudo)
│   ├── ConfigComparator.tsx# Vista de la tool "Comparator" (Diff File Drop)
│   ├── DiffViewer.tsx     # Monaco Diff wrapper
│   ├── SmartDetector.tsx  # Detección inteligente vía Drag & Drop
│   ├── CommandPalette.tsx # Side Drawer para búsqueda/selección tecno
│   └── ...
│
├── lib/templates/          # Engine Lógico
│   ├── technologies.ts    # Base de datos de tecnologías
│   └── engine.ts          # Motor deduplicador de merges
│
└── store/
    └── configStore.ts     # Estado global Zustand reactivo
```

---

## Arquitectura y Flujo de Datos

```text
       [ SmartDetector ] ---------/ OR /-------- [ CommandPalette ]
               ↓                                        ↓
     Zustand Store (Update selectedTechnologies)
               ↓
    Generate "Recommended Templates" (engine.ts)
               ↓
 -----------------------------------------------------------
 |          Actúa según la Tool Activa seleccionada         |
 -----------------------------------------------------------
             ↙                                 ↘
    TOOL: GENERATE                       TOOL: COMPARE
  (PreviewPanel.tsx)                 (ConfigComparator.tsx)
          ↓                                     ↓
 Muestra archivos finales                 Drop local file
          ↓                                     ↓
 Copia o Descarga ZIP                Muestra Monaco Diff vs Template Recomendado
```

### Patrones Arquitectónicos de Destaque

1. **Tool-based Sidebar UI:**
   La aplicación está diseñada como un miniescritorio ("Desktop Web App"). Cuenta con una barra de navegación lateral flotante que alterna las herramientas de trabajo ("Generator" y "Comparator"), mientras que un panel izquierdo constante en `ConfigGenerator` mantiene vivo el contexto general del stack tecnológico interactivo.
2. **Template Merge Engine** (`engine.ts`):
   Agrupa, normaliza y elimina código duplicado a través de secciones para formar un solo archivo pulido.
3. **Mónaco Diff Engine:**
   Reutiliza Mónaco Editor pero en su formato Diff. Agrega leyendas rojas y verdes semánticas para informarle intuitivamente al usuario qué código desechar y cuál añadir para que su stack quede impecable.

---

## Características Principales

- **Generator:** Generación sincronizada de 4 tipos de archivos de config en vivo. Soporta 26+ tecnologías (Node.js, Python, Ruby, Go, Java, etc.).
- **Comparator:** Auditoría on-the-fly (`DiffViewer`) que compara tu `.gitignore` local versus la recomendación perfecta del sistema según el stack de tu app.
- **Smart Detection:** Automáticamente detecta tu tecnología al soltar un archivo descriptivo (`package.json`, entre otros).
- **Interface Pro:** Modal transformado en Side Drawer, Dark/Light mode fluido por `next-themes`, y UI plana, profesional y sin envoltorios distractores (No glass-boxes). Mobile-first logic y diseño Desktop restringido con Flex para cancelar scroll genérico.

---

## Roadmap de Mejoras Sugeridas (specs/improvements-v1.md)

Las "killer features" planeadas para llevar este ecosistema al siguiente nivel están basadas en potenciar la herramienta como auditor de código:

1. **Ecosistema CLI / Automatización:** Un comando `npx gitconfig-pro --detect` que actualice los ignores locales sin abrir la web UI.
2. **Autenticación GitHub Auth / Pull Requests:** Clickea un botón "Escanear Repositorio", evalúa tus archivos en secreto y te levanta un _PR_ con los `.gitignore` ajustados y listos a mergear en Gtihub.
3. **Persistencia local:** Retener perfiles y stacks por localStorage.

(Revisé y concluí el Feature de Comparador interactivo priorizado para esta versión iterativa.)
