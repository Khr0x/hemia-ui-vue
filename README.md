# @hemia/ui

A shadcn-inspired, **multi-framework**, local-first component generator.

> Components are copied into your project — not imported from npm.

## Packages

| Package | Version | Description |
|---|---|---|
| `@hemia/core` | 0.0.1 | Runtime, tokens (framework-agnostic) |
| `@hemia/vue` | 0.0.1 | Vue 3 components |
| `@hemia/registry` | 0.0.1 | Component templates |
| `@hemia/cli` | 0.0.1 | Universal CLI |

## Quick Start (Vue)

```bash
pnpm add @hemia/vue
pnpm add -D @hemia/cli

npx hemia init
npx hemia add button
```

## Monorepo Structure

```
hemia-ui/
├── apps/
│   ├── web/         # Vue 3 playground
│   └── docs/        # VitePress docs
├── packages/
│   ├── core/        # @hemia/core
│   ├── vue/         # @hemia/vue
│   ├── registry/    # @hemia/registry
│   └── cli/         # @hemia/cli
```

# web
```bash
cd apps/web
pnpm dev          # Solo el playground
```

# Docs
```bash
cd apps/docs
pnpm dev          # Servidor de desarrollo de docs
pnpm build        # Build para producción (deploy)
```