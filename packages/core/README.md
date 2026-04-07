# @hemia/lume-core

Framework-agnostic runtime utilities and design tokens for the Lume UI system.

## What's included

- **`cn()`** — Smart Tailwind class merger
- **`cva()`** — Type-safe component variants
- **Tokens** — Colors, radius, theme values

## Installation

Install via framework adapter (recommended):

```bash
npm install @hemia/lume-vue
```

Or directly:

```bash
npm install @hemia/lume-core
```

## Usage

```ts
import { cn, cva, colors, radius } from "@hemia/lume-core"

// Merge classes
cn("px-2 py-1", "px-4") // → "py-1 px-4"

// Define variants
const button = cva("base", {
  variants: {
    variant: { default: "bg-primary", outline: "border" }
  }
})
```

## Framework Adapters

- **[@hemia/lume-vue](../vue)** — Vue 3
- **@hemia/lume-react** — React (coming soon)
- **@hemia/lume-svelte** — Svelte (coming soon)

**Note:** In projects, import from the framework adapter (`@hemia/lume-vue`) not directly from core.

## License

MIT
