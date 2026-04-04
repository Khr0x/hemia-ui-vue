<script setup lang="ts">
import { ref } from 'vue'

export interface NavSection {
  title: string
  items: NavItem[]
}

export interface NavItem {
  id: string
  label: string
  icon?: string
  badge?: string
}

const props = defineProps<{
  sections: NavSection[]
  activeSection: string
  open: boolean
}>()

const expandedSections = ref<Set<string>>(new Set(props.sections.map(s => s.title)))

function toggleSection(title: string) {
  const newSet = new Set(expandedSections.value)
  if (newSet.has(title)) {
    newSet.delete(title)
  } else {
    newSet.add(title)
  }
  expandedSections.value = newSet
}

function isExpanded(title: string) {
  return expandedSections.value.has(title)
}

function isActive(itemId: string): boolean {
  // Support both exact match and hash-based routes (e.g., "button" matches "button#section-sizes")
  const active = props.activeSection
  return itemId === active || active.startsWith(itemId + '#') || active.startsWith(itemId + '/')
}

const emit = defineEmits<{
  navigate: [id: string]
  close: []
}>()

function handleNav(id: string) {
  emit("navigate", id)
  emit("close")
}
</script>

<template>
  <!-- Mobile overlay -->
  <div
    v-if="open"
    class="fixed inset-0 z-40 bg-black/50 lg:hidden"
    @click="emit('close')"
  />

  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-200 lg:static lg:translate-x-0 lg:z-auto',
      open ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Sidebar header -->
    <div class="flex h-14 items-center gap-2 border-b px-4 lg:px-5">
      <div class="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
        <span class="text-primary-foreground text-xs font-bold">L</span>
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-semibold leading-none">Lume</span>
        <span class="text-[10px] text-muted-foreground leading-none mt-0.5">v0.0.1</span>
      </div>
      <button
        class="ml-auto lg:hidden inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-accent"
        @click="emit('close')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-3 px-3">
      <div v-for="section in sections" :key="section.title" class="mb-2">
        <button
          class="mb-1 w-full flex items-center justify-between rounded-md px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 hover:text-muted-foreground transition-colors"
          @click="toggleSection(section.title)"
        >
          <span>{{ section.title }}</span>
          <svg
            :class="['h-3 w-3 transition-transform', isExpanded(section.title) ? 'rotate-0' : '-rotate-90']"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <ul v-show="isExpanded(section.title)" class="space-y-0.5">
          <li v-for="item in section.items" :key="item.id">
            <button
              :class="[
                'w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                isActive(item.id)
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              ]"
              @click="handleNav(item.id)"
            >
              <span class="flex-1 text-left">{{ item.label }}</span>
              <span v-if="item.badge" class="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                {{ item.badge }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Sidebar footer -->
    <div class="border-t p-3">
      <div class="rounded-lg bg-muted/50 p-3">
        <p class="text-xs font-medium">Need help?</p>
        <p class="text-[11px] text-muted-foreground mt-0.5">Check the docs for guides and API reference.</p>
        <a
          href="#"
          class="mt-2 inline-flex items-center text-xs font-medium text-primary hover:underline"
        >
          View Docs
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </aside>
</template>
