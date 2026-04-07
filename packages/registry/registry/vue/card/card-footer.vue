<script setup lang="ts">
import { inject, computed } from 'vue'
import { cn } from '@hemia/lume-vue'

const size = inject<string>('card-size', 'default')

const isSm = computed(() => size === 'sm')

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn(
    isSm
      ? 'flex-col-reverse w-[calc(100%+1rem)] -mx-2 -mb-2 px-2'
      : 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 -mx-6 -mb-6 px-6',
    'bg-muted/50 rounded-b-xl dark:bg-muted/30 py-3',
    props.class
  )">
    <slot />
  </div>
</template>