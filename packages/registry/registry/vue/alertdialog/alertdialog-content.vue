<script setup lang="ts">
import { inject, type Ref, computed, provide } from 'vue'
import { cn } from '@hemia/lume-vue'

const dialog = inject<{
  open: Ref<boolean>
  onOpenChange: (value: boolean) => void
}>('alert-dialog')

const props = defineProps<{
  class?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  persistent?: boolean
}>()

// Provide size to child components
provide('alert-dialog-size', props.size || 'md')

function close() {
  dialog?.onOpenChange(false)
}

const isOpen = computed(() => dialog?.open.value ?? false)

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]'
  }
  return sizes[props.size || 'md']
})

const isCentered = computed(() => props.size === 'sm')
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/80"
        :class="{ 'cursor-not-allowed pointer-events-none': props.persistent }"
        @click="!props.persistent && close()"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="isOpen"
        class="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-0 border bg-background shadow-lg duration-200 sm:rounded-lg"
        :class="cn(sizeClasses, isCentered && 'text-center', props.class)"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>