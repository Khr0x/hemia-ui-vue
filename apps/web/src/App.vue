<script setup lang="ts">
import { ref } from "vue"
import { useRouter, useRoute } from 'vue-router'
import PlaygroundHeader from "@/components/playground/PlaygroundHeader.vue"
import PlaygroundSidebar from "@/components/playground/PlaygroundSidebar.vue"
import type { NavSection } from "@/components/playground/PlaygroundSidebar.vue"

const router = useRouter()
const route = useRoute()

const isDark = ref(false)
const sidebarOpen = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle("dark")
}

const navSections: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { id: "overview", label: "Overview" },
      { id: "tokens", label: "Design Tokens" },
    ],
  },
  {
    title: "Components",
    items: [
      { id: "button", label: "Button" },
      { id: "textfield", label: "TextField", badge: "new" },
      { id: "alert", label: "Alert", badge: "new" },
      { id: "alert-dialog", label: "Alert Dialog", badge: "new" },
      { id: "badge", label: "Badge", badge: "new" },
      { id: "card", label: "Card", badge: "new" },
    ],
  },
]

function handleNavigate(id: string) {
  if (id === 'overview') {
    router.push('/')
  } else if (id === 'tokens') {
    router.push('/tokens')
  } else if (id.startsWith('button')) {
    router.push(id)
  } else if (id.startsWith('textfield')) {
    router.push(id)
  } else if (id.startsWith('alert')) {
    router.push(id)
  } else if (id.startsWith('badge')) {
    router.push(id)
  } else if (id.startsWith('card')) {
    router.push(id)
  } else if (id.startsWith('/')) {
    router.push(id)
  }
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <PlaygroundSidebar
        :sections="navSections"
        :active-section="route.fullPath"
        :open="sidebarOpen"
        @navigate="handleNavigate"
        @close="sidebarOpen = false"
      />

      <!-- Main area -->
      <div class="flex-1 flex flex-col min-w-0">
        <PlaygroundHeader
          :is-dark="isDark"
          :sidebar-open="sidebarOpen"
          @toggle-dark="toggleDarkMode"
          @toggle-sidebar="sidebarOpen = !sidebarOpen"
        />

        <main class="flex-1 overflow-y-auto">
          <div class="mx-auto max-w-4xl px-4 py-8 lg:px-8">
            <router-view />
          </div>
        </main>

        <!-- Footer -->
        <footer class="border-t px-4 py-3">
          <p class="text-xs text-muted-foreground text-center">
            @hemia/lume &mdash; Component system for Vue, React, Svelte & Astro
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>