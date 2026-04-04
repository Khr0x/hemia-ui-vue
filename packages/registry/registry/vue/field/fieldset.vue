<script setup lang="ts">
import { cn } from "@hemia/lume-vue"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <fieldset :class="cn('space-y-2.5', props.class)">
    <slot />
  </fieldset>
</template>