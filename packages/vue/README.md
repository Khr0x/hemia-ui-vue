# @hemia/lume-vue

Vue 3 adapter for Lume UI system. Provides runtime utilities and acts as the primary dependency for Vue projects using Lume components.

## Installation

```bash
npm install @hemia/lume-vue
```

## What's included

Re-exports everything from `@hemia/lume-core`:

- **`cn()`** — Smart Tailwind class merger
- **`cva()` & `VariantProps`** — Type-safe component variants
- **Tokens** — Colors, radius, theme values

Plus Vue-specific utilities.

## Usage in Vue components

```vue
<script setup lang="ts">
import { cn, cva, type VariantProps } from "@hemia/lume-vue"

const buttonVariants = cva('rounded px-4 py-2', {
  variants: {
    variant: {
      default: 'bg-primary text-white',
      outline: 'border border-primary'
    }
  },
  defaultVariants: { variant: 'default' }
})

type ButtonVariants = VariantProps<typeof buttonVariants>

const props = defineProps<{
  variant?: ButtonVariants['variant']
  class?: string
}>()
</script>

<template>
  <button :class="cn(buttonVariants({ variant }), props.class)">
    <slot />
  </button>
</template>
```

## Adding components

Use the Lume CLI to add components to your project:

```bash
bunx @hemia/lume@latest init    # Initialize config
bunx @hemia/lume@latest add button card  # Add components
```

Components are copied to your project (not imported from node_modules).

## Note

Always import from `@hemia/lume-vue` in Vue projects, not from `@hemia/lume-core` directly.

## License

MIT
