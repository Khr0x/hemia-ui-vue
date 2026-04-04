<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="rounded-xl border bg-card shadow-sm">
    <div class="flex items-center justify-between border-b px-5 py-3">
      <div>
        <h3 class="text-sm font-semibold">{{ title }}</h3>
        <p v-if="description" class="text-xs text-muted-foreground mt-0.5">{{ description }}</p>
      </div>
      <slot name="actions" />
    </div>
    <div class="p-5">
      <slot />
    </div>
  </div>
</template>
