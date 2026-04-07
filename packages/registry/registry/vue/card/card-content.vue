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
    isSm ? 'pt-3 pb-3' : 'pt-6 pb-6',
    props.class
  )">
    <slot />
  </div>
</template>