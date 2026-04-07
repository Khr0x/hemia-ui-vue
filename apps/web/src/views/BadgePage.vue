<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BadgeShowcase from '@/components/playground/sections/BadgeShowcase.vue'

const route = useRoute()

function handleHashChange() {
  const hash = route.hash
  if (hash) {
    const id = hash.replace('#', '')
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }
}

onMounted(() => {
  handleHashChange()
})

watch(() => route.hash, handleHashChange)
</script>

<template>
  <BadgeShowcase />
</template>