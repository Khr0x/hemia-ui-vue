# @hemia/lume-registry

Component templates registry for the Lume UI system. Contains source code for all Lume components organized by framework.

## What is this?

This package stores the component templates that the Lume CLI copies into user projects. **Users don't install this directly** — it's consumed by the `@hemia/lume` CLI.

## Structure

```
registry/
├── vue/
│   ├── button/
│   │   ├── button.vue
│   │   └── meta.json
│   └── card/
│       ├── card.vue
│       └── meta.json
└── react/  (coming soon)
```

## How it works

When a user runs:

```bash
bunx @hemia/lume@latest add button
```

The CLI:
1. Reads the framework from `lume.config.json`
2. Resolves `@hemia/lume-registry` package location
3. Copies files from `registry/{framework}/{component}/` to the user's project
4. Installs dependencies listed in `meta.json`

## Usage

This package is dependency of `@hemia/lume` CLI. It's not meant to be imported in user code.

## License

MIT
