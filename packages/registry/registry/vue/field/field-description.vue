<script setup lang="ts">
import { fieldDescriptionVariants } from "./field.variants"
import { cn } from "@hemia/lume-vue"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <p :class="cn(fieldDescriptionVariants(), props.class)">
    <slot />
  </p>
</template>