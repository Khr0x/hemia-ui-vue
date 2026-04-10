<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@hemia/lume-vue"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-transparent bg-clip-padding text-sm font-medium transition-all outline-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lume-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-lume-primary text-lume-primary-foreground hover:bg-lume-primary/90",
        destructive:
          "bg-lume-destructive text-lume-destructive-foreground hover:bg-lume-destructive/90",
        outline:
          "border-lume-input bg-lume-background hover:bg-lume-accent hover:text-lume-accent-foreground",
        secondary:
          "bg-lume-secondary text-lume-secondary-foreground hover:bg-lume-secondary/80",
        ghost: "hover:bg-lume-accent hover:text-lume-accent-foreground",
        link: "text-lume-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-4 py-2",
        xs: "h-6 rounded-sm px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 rounded-lg px-3",
        lg: "h-9 rounded-xl px-8",
        icon: "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

const props = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  type?: "button" | "submit" | "reset"
  class?: string
}>()
</script>

<template>
  <button :type="props.type" :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </button>
</template>
