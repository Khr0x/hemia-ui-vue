<script setup lang="ts">
import { buttonVariants, type ButtonVariants } from "./button.variants"
import { cn } from "@hemia/lume-vue"

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
