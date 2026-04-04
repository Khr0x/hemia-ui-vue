<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/ui/button"
import ShowcaseCard from "../ShowcaseCard.vue"

const email = ref("")
const password = ref("")
const isSubmitting = ref(false)

const handleSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    alert(`Email: ${email.value}`)
    isSubmitting.value = false
  }, 1500)
}
</script>

<template>
  <div class="space-y-8">
    <!-- Page header -->
    <div>
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Button</h1>
        <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Component</span>
      </div>
      <p class="text-muted-foreground mt-1 text-sm">
        Displays a button or a component that looks like a button. Supports multiple variants, sizes, and states.
      </p>
    </div>

    <!-- Quick preview -->
    <ShowcaseCard title="Preview" description="Default button rendering">
      <div class="flex items-center justify-center py-8">
        <Button>Button</Button>
      </div>
    </ShowcaseCard>

    <!-- Variants section -->
    <div id="section-variants">
      <ShowcaseCard title="Variants" description="All available style variants">
        <div class="space-y-4">
          <div class="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <p class="text-xs font-mono text-muted-foreground">
              &lt;Button variant="default | destructive | outline | secondary | ghost | link" /&gt;
            </p>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Sizes section -->
    <div id="section-sizes">
      <ShowcaseCard title="Sizes" description="Small, medium, and large size options">
        <div class="space-y-4">
          <div class="flex flex-wrap items-end gap-3">
            <div class="flex flex-col items-center gap-2">
              <Button size="sm">Small</Button>
              <span class="text-[10px] text-muted-foreground font-mono">sm</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Button size="default">Default</Button>
              <span class="text-[10px] text-muted-foreground font-mono">default</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Button size="lg">Large</Button>
              <span class="text-[10px] text-muted-foreground font-mono">lg</span>
            </div>
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <p class="text-xs font-mono text-muted-foreground">
              &lt;Button size="sm | md | lg" /&gt;
            </p>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Variant × Size matrix -->
    <div id="section-matrix">
      <ShowcaseCard title="Variant × Size Matrix" description="Complete combination grid">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="pb-2 pr-4 text-left font-medium text-muted-foreground text-xs">Variant / Size</th>
                <th class="pb-2 px-4 text-center font-medium text-muted-foreground text-xs">sm</th>
                <th class="pb-2 px-4 text-center font-medium text-muted-foreground text-xs">default</th>
                <th class="pb-2 px-4 text-center font-medium text-muted-foreground text-xs">lg</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="variant in (['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const)" :key="variant">
                <td class="py-3 pr-4 font-mono text-xs text-muted-foreground">{{ variant }}</td>
                <td class="py-3 px-4 text-center">
                  <Button :variant="variant" size="sm">Button</Button>
                </td>
                <td class="py-3 px-4 text-center">
                  <Button :variant="variant" size="default">Button</Button>
                </td>
                <td class="py-3 px-4 text-center">
                  <Button :variant="variant" size="lg">Button</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseCard>
    </div>

    <!-- States section -->
    <div id="section-states">
      <ShowcaseCard title="States" description="Disabled and loading states">
        <div class="space-y-6">
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-3">Disabled</p>
            <div class="flex flex-wrap gap-3">
              <Button disabled>Default Disabled</Button>
              <Button variant="destructive" disabled>Destructive Disabled</Button>
              <Button variant="outline" disabled>Outline Disabled</Button>
              <Button variant="ghost" disabled>Ghost Disabled</Button>
            </div>
          </div>
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-3">Loading</p>
            <div class="flex flex-wrap gap-3">
              <Button disabled class="gap-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading...
              </Button>
              <Button variant="outline" disabled class="gap-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading...
              </Button>
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- With Icons -->
    <div id="section-icons">
      <ShowcaseCard title="With Icons" description="Buttons with leading and trailing icons">
        <div class="space-y-4">
          <div class="flex flex-wrap gap-3">
            <Button class="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              Continue
            </Button>
            <Button variant="outline" class="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download
            </Button>
            <Button variant="ghost" class="gap-2">
              Settings
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </Button>
            <Button variant="destructive" class="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              Delete
            </Button>
          </div>

          <!-- Icon-only buttons -->
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-3">Icon only</p>
            <div class="flex gap-2">
              <Button size="sm" class="h-8 w-8 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </Button>
              <Button variant="outline" size="sm" class="h-8 w-8 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
              </Button>
              <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </Button>
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Form section -->
    <div id="section-form">
      <ShowcaseCard title="Form Integration" description="Buttons inside a login form example">
        <div class="max-w-sm mx-auto">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-1.5">
              <label for="email" class="text-sm font-medium">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="you@example.com"
              />
            </div>
            <div class="space-y-1.5">
              <label for="password" class="text-sm font-medium">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="********"
              />
            </div>
            <div class="flex gap-2 pt-1">
              <Button type="submit" :disabled="isSubmitting" class="flex-1 gap-2">
                <svg v-if="isSubmitting" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ isSubmitting ? "Signing in..." : "Sign In" }}
              </Button>
              <Button type="button" variant="outline" @click="email = ''; password = ''">
                Clear
              </Button>
            </div>
          </form>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Action Groups -->
    <div id="section-actions">
      <ShowcaseCard title="Action Groups" description="Common button composition patterns">
        <div class="space-y-6">
          <!-- Confirmation -->
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-3">Confirmation dialog</p>
            <div class="rounded-lg border p-4 max-w-sm">
              <p class="text-sm font-medium">Are you sure?</p>
              <p class="text-xs text-muted-foreground mt-1">This action cannot be undone. This will permanently delete your account.</p>
              <div class="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </div>
          </div>

          <!-- Toolbar -->
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-3">Toolbar</p>
            <div class="inline-flex rounded-lg border divide-x">
              <Button variant="ghost" size="sm" class="rounded-none rounded-l-lg px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8"/></svg>
              </Button>
              <Button variant="ghost" size="sm" class="rounded-none px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
              </Button>
              <Button variant="ghost" size="sm" class="rounded-none rounded-r-lg px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>
              </Button>
            </div>
          </div>

          <!-- Navigation bar -->
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-3">Navigation</p>
            <div class="flex items-center gap-1 rounded-lg bg-muted p-1">
              <Button variant="ghost" size="sm" class="bg-background shadow-sm">Home</Button>
              <Button variant="ghost" size="sm">Products</Button>
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>

          <!-- CTA group -->
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-3">Call to action</p>
            <div class="rounded-lg border p-6 text-center max-w-md">
              <h4 class="font-semibold">Ready to get started?</h4>
              <p class="text-sm text-muted-foreground mt-1">Start building beautiful UIs with Lume components.</p>
              <div class="flex justify-center gap-3 mt-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Code Example -->
    <div id="section-usage">
      <ShowcaseCard title="Usage" description="How to use the Button component">
        <div class="rounded-lg bg-zinc-950 p-4 text-sm">
          <pre class="text-green-400 overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import { Button } from "@/components/ui/button"
&lt;/script&gt;

&lt;template&gt;
  &lt;Button variant="default" size="default"&gt;
    Click me
  &lt;/Button&gt;
&lt;/template&gt;</code></pre>
        </div>
      </ShowcaseCard>
    </div>
  </div>
</template>
