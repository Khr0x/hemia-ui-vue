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
    'absolute right-4 top-4 flex items-center gap-2',
    isSm ? 'right-2 top-2' : '',
    props.class
  )">
    <slot />
  </div>
</template>