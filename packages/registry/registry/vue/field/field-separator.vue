<script setup lang="ts">
import { fieldSeparatorVariants } from "./field.variants"
import { cn } from "@hemia/lume-vue"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn(fieldSeparatorVariants(), props.class)" />
</template>