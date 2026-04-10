<script setup lang="ts">
import { cva } from "class-variance-authority"
import { cn } from "@hemia/lume-vue"

const fieldDescriptionVariants = cva("text-[0.8rem] text-lume-muted-foreground")

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <p :class="cn(fieldDescriptionVariants(), props.class)">
    <slot />
  </p>
</template>