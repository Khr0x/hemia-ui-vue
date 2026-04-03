# Introduction

`@hemia/ui` is a **local-first, CLI-driven, multi-framework** component system inspired by shadcn/ui.

Components are **copied into your project**, not imported from npm — giving you full control over styling and behavior.

## Packages

| Package | Description |
|---|---|
| `@hemia/core` | Framework-agnostic runtime: `cn()`, `cva`, design tokens |
| `@hemia/vue` | Vue 3 component generator (re-exports `@hemia/core`) |
| `@hemia/react` | React component generator *(coming soon)* |
| `@hemia/svelte` | Svelte component generator *(coming soon)* |
| `@hemia/astro` | Astro component generator *(coming soon)* |
| `@hemia/registry` | Multi-framework component templates |
| `@hemia/cli` | Universal CLI — framework-aware |

## Core Principles

- **Local-first** – components live in your project
- **CLI-driven** – add components via `hemia add`
- **Multi-framework** – Vue, React, Svelte, Astro
- **Themeable** via CSS variables
- **TypeScript-first**
