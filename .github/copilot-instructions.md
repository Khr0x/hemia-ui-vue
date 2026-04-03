# @hemia/ui — Copilot Instructions

## Architecture

`@hemia/ui` is a **multi-framework, local-first, CLI-driven** component system inspired by shadcn/ui. Components are copied into user projects via the CLI — not imported from npm.

## Monorepo Structure

```
hemia-ui-vue/
├── apps/
│   ├── web/         # Vue 3 playground app
│   └── docs/        # VitePress documentation
├── packages/
│   ├── core/        # @hemia/core — framework-agnostic runtime & design tokens
│   ├── vue/         # @hemia/vue — Vue 3 generator utilities (depends on @hemia/core)
│   ├── registry/    # @hemia/registry — multi-framework component templates
│   └── cli/         # @hemia/cli — universal framework-aware CLI
```

## Package Names

| Directory | Package Name | Description |
|---|---|---|
| `packages/core/` | `@hemia/core` | Framework-agnostic: `cn()`, `cva`, design tokens |
| `packages/vue/` | `@hemia/vue` | Vue 3 generator utilities; re-exports `@hemia/core` |
| `packages/registry/` | `@hemia/registry` | Component templates for each framework |
| `packages/cli/` | `@hemia/cli` | Universal CLI — framework-aware |

## Registry Structure

Component templates live under `packages/registry/registry/<framework>/<component>/`:

```
packages/registry/registry/
├── vue/
│   └── button/
│       ├── button.vue
│       ├── button.variants.ts
│       └── meta.json
└── react/          # placeholder for future React components
```

## Key Conventions

- `@hemia/core` is framework-agnostic and has no Vue dependency.
- `@hemia/vue` depends on `@hemia/core` and re-exports everything from it, so Vue users only need `@hemia/vue`.
- The CLI reads `hemia.config.json` for the target framework; it can also auto-detect from `package.json`.
- Registry component templates import from `@hemia/vue` (not `@hemia/core` directly).
- `meta.json` files describe component metadata and are excluded when copying components to user projects.
- All packages use `workspace:*` for internal dependencies.
