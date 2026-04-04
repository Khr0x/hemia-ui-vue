<script setup lang="ts">
import { fieldVariants, type FieldVariants } from "./field.variants"
import { cn } from "@hemia/lume-vue"

const props = defineProps<{
  orientation?: FieldVariants["orientation"]
  class?: string
}>()
</script>

<template>
  <div :class="cn(fieldVariants({ orientation }), props.class)">
    <slot />
  </div>
</template>