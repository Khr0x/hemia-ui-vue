<script setup lang="ts">
import ShowcaseCard from "@/components/playground/ShowcaseCard.vue"
</script>

<template>
  <div class="space-y-8">
    <!-- Page header -->
    <div>
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Design Tokens</h1>
        <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Foundation</span>
      </div>
      <p class="text-muted-foreground mt-1 text-sm">
        Color palette and design tokens from CSS variables. These tokens power the entire component system.
      </p>
    </div>

    <!-- Color Tokens -->
    <div id="section-colors">
      <ShowcaseCard title="Color Tokens" description="Color palette from CSS variables">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div v-for="token in [
            { name: 'Background', class: 'bg-background border', text: '--background' },
            { name: 'Foreground', class: 'bg-foreground', text: '--foreground' },
            { name: 'Primary', class: 'bg-primary', text: '--primary' },
            { name: 'Secondary', class: 'bg-secondary', text: '--secondary' },
            { name: 'Destructive', class: 'bg-destructive', text: '--destructive' },
            { name: 'Muted', class: 'bg-muted', text: '--muted' },
            { name: 'Accent', class: 'bg-accent', text: '--accent' },
            { name: 'Card', class: 'bg-card border', text: '--card' },
          ]" :key="token.name" class="space-y-1.5">
            <div :class="['h-16 rounded-lg', token.class]" />
            <div>
              <p class="text-xs font-medium">{{ token.name }}</p>
              <p class="text-[10px] font-mono text-muted-foreground">{{ token.text }}</p>
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Border Radius -->
    <div id="section-radius">
      <ShowcaseCard title="Border Radius" description="Radius scale for consistent rounded corners">
        <div class="flex gap-4">
          <div v-for="r in [
            { name: 'sm', class: 'rounded-sm' },
            { name: 'md', class: 'rounded-md' },
            { name: 'lg', class: 'rounded-lg' },
          ]" :key="r.name" class="flex flex-col items-center gap-1.5">
            <div :class="['h-12 w-12 border-2 border-primary bg-primary/10', r.class]" />
            <span class="text-[10px] font-mono text-muted-foreground">{{ r.name }}</span>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Semantic Colors -->
    <div id="section-semantic">
      <ShowcaseCard title="Semantic Colors" description="Colors for specific UI contexts">
        <div class="space-y-4">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div class="space-y-1.5">
              <div class="h-12 rounded-lg bg-border border" />
              <p class="text-xs font-medium">Border</p>
              <p class="text-[10px] font-mono text-muted-foreground">--border</p>
            </div>
            <div class="space-y-1.5">
              <div class="h-12 rounded-lg bg-input" />
              <p class="text-xs font-medium">Input</p>
              <p class="text-[10px] font-mono text-muted-foreground">--input</p>
            </div>
            <div class="space-y-1.5">
              <div class="h-12 rounded-lg bg-ring" />
              <p class="text-xs font-medium">Ring</p>
              <p class="text-[10px] font-mono text-muted-foreground">--ring</p>
            </div>
            <div class="space-y-1.5">
              <div class="h-12 rounded-lg bg-popover border" />
              <p class="text-xs font-medium">Popover</p>
              <p class="text-[10px] font-mono text-muted-foreground">--popover</p>
            </div>
            <div class="space-y-1.5">
              <div class="h-12 rounded-lg bg-card-foreground" />
              <p class="text-xs font-medium">Card Foreground</p>
              <p class="text-[10px] font-mono text-muted-foreground">--card-foreground</p>
            </div>
            <div class="space-y-1.5">
              <div class="h-12 rounded-lg bg-primary-foreground" />
              <p class="text-xs font-medium">Primary Foreground</p>
              <p class="text-[10px] font-mono text-muted-foreground">--primary-foreground</p>
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Usage -->
    <div id="section-usage">
      <ShowcaseCard title="Usage" description="How to use design tokens in your components">
        <div class="rounded-lg bg-zinc-950 p-4 text-sm">
          <pre class="text-green-400 overflow-x-auto"><code>.my-component {
  background-color: var(--background);
  color: var(--foreground);
  border-radius: var(--radius);
}

&lt;!-- Or with Tailwind --&gt;
&lt;div class="bg-background text-foreground rounded-md"&gt;
  Content
&lt;/div&gt;</code></pre>
        </div>
      </ShowcaseCard>
    </div>
  </div>
</template>