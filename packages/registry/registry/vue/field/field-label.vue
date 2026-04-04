<script setup lang="ts">
import { fieldLabelVariants } from "./field.variants"
import { cn } from "@hemia/lume-vue"

const props = defineProps<{
  for?: string
  class?: string
}>()
</script>

<template>
  <label :for="for" :class="cn(fieldLabelVariants(), props.class)">
    <slot />
  </label>
</template>