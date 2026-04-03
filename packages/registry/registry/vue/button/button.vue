<script setup lang="ts">
import { buttonVariants, type ButtonVariants } from "./button.variants"
import { cn } from "@hemia/vue"

const props = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: string
}>()
</script>

<template>
  <button :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </button>
</template>
