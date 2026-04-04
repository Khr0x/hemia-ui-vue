<script setup lang="ts">
import { fieldLegendVariants } from "./field.variants"
import { cn } from "@hemia/lume-vue"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <legend :class="cn(fieldLegendVariants(), props.class)">
    <slot />
  </legend>
</template>