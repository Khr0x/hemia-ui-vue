# Introduction

`@hemia/lume` is a **local-first, CLI-driven, multi-framework** component system inspired by shadcn/ui.

Components are **copied into your project**, not imported from npm — giving you full control over styling and behavior.

## Packages

| Package | Description |
|---|---|
| `@hemia/lume` | Framework-agnostic runtime: `cn()`, `cva`, design tokens |
| `@hemia/lume-vue` | Vue 3 component generator (re-exports `@hemia/lume`) |
| `@hemia/lume-react` | React component generator *(coming soon)* |
| `@hemia/lume-svelte` | Svelte component generator *(coming soon)* |
| `@hemia/lume-astro` | Astro component generator *(coming soon)* |
| `@hemia/lume-registry` | Multi-framework component templates |
| `hemia-lume` | Universal CLI — framework-aware |

## Core Principles

- **Local-first** – components live in your project
- **CLI-driven** – add components via `hemia-lume add`
- **Multi-framework** – Vue, React, Svelte, Astro
- **Themeable** via CSS variables
- **TypeScript-first**
