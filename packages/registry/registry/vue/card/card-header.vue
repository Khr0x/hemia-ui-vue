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
    'flex flex-col',
    isSm ? 'space-y-2 pr-6 mb-2' : 'space-y-1.5',
    props.class
  )">
    <slot />
  </div>
</template>