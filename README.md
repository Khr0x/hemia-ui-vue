# @hemia/lume

A shadcn-inspired, **multi-framework**, local-first component generator.

> Components are copied into your project — not imported from npm.

## Packages

| Package | Version | Description |
|---|---|---|
| `@hemia/lume-core` | 0.0.1 | Runtime, tokens (framework-agnostic) |
| `@hemia/lume-vue` | 0.0.1 | Vue 3 components |
| `@hemia/lume-registry` | 0.0.1 | Component templates |
| `@hemia/lume` | 0.0.1 | Universal CLI |

## Quick Start (Vue)

```bash
pnpm add @hemia/lume-vue

bunx @hemia/lume@latest init
bunx @hemia/lume@latest add button
```

## Monorepo Structure

```
hemia-ui/
├── apps/
│   ├── web/         # Vue 3 playground
│   └── docs/        # VitePress docs
├── packages/
│   ├── core/        # @hemia/lume-core
│   ├── vue/         # @hemia/lume-vue
│   ├── registry/    # @hemia/lume-registry
│   └── cli/         # @hemia/lume
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