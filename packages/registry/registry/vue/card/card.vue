<script setup lang="ts">
import { provide } from 'vue'
import { cn } from '@hemia/lume-vue'

const props = defineProps<{
  size?: 'default' | 'sm'
  class?: string
}>()

provide('card-size', props.size || 'default')
</script>

<template>
  <div :class="cn(
    'relative rounded-xl border bg-card text-card-foreground shadow',
    size === 'sm' ? 'p-2 pb-2' : 'p-6',
    props.class
  )">
    <slot />
  </div>
</template>