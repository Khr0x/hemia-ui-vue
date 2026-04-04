<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const components = [
  {
    name: 'Button',
    description: 'Displays a button or a component that looks like a button.',
    badge: 'Component',
    route: '/button',
  },
]
</script>

<template>
  <div class="space-y-8">
    <!-- Page header -->
    <div>
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Lume</h1>
        <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Component System</span>
      </div>
      <p class="text-muted-foreground mt-1 text-sm">
        A multi-framework component library for Vue, React, Svelte & Astro.
      </p>
    </div>

    <!-- Getting Started -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Getting Started</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <button
          class="group relative flex flex-col items-start rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent"
          @click="router.push('/')"
        >
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Installation</span>
          </div>
          <p class="mt-1 text-xs text-muted-foreground">
            Learn how to install and set up Lume in your project.
          </p>
        </button>
        <button
          class="group relative flex flex-col items-start rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent"
        >
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Usage</span>
          </div>
          <p class="mt-1 text-xs text-muted-foreground">
            Basic usage patterns and best practices.
          </p>
        </button>
      </div>
    </section>

    <!-- Components -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Components</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <button
          v-for="component in components"
          :key="component.name"
          class="group relative flex flex-col items-start rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent"
          @click="router.push(component.route)"
        >
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">{{ component.name }}</span>
            <span class="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
              {{ component.badge }}
            </span>
          </div>
          <p class="mt-1 text-xs text-muted-foreground">
            {{ component.description }}
          </p>
        </button>
      </div>

      <!-- Coming soon -->
      <div class="rounded-lg border border-dashed p-4 text-center">
        <p class="text-sm text-muted-foreground">More components coming soon</p>
      </div>
    </section>

    <!-- Foundation preview -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Foundation</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-lg border bg-card p-4 opacity-60">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Design Tokens</span>
          </div>
          <p class="mt-1 text-xs text-muted-foreground">
            Colors, spacing, typography and more.
          </p>
        </div>
        <div class="rounded-lg border bg-card p-4 opacity-60">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Usage</span>
          </div>
          <p class="mt-1 text-xs text-muted-foreground">
            How to use tokens in your project.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>