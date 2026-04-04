<script setup lang="ts">
import { fieldGroupVariants, type FieldGroupVariants } from "./field.variants"
import { cn } from "@hemia/lume-vue"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn(fieldGroupVariants(), props.class)">
    <slot />
  </div>
</template>