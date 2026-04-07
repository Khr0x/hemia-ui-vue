<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import ShowcaseCard from "../ShowcaseCard.vue"
</script>

<template>
  <div class="space-y-8">
    <!-- Page header -->
    <div>
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Badge</h1>
        <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Component</span>
      </div>
      <p class="text-muted-foreground mt-1 text-sm">
        Small status indicators for labels, counts, and other UI elements.
      </p>
    </div>

    <!-- Quick preview -->
    <ShowcaseCard title="Preview" description="Default badge">
      <div class="flex flex-wrap items-center gap-3 py-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    </ShowcaseCard>

    <!-- Variants -->
    <div id="section-variants">
      <ShowcaseCard title="Variants" description="Different badge style variants">
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-3 py-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <p class="text-xs font-mono text-muted-foreground">
              &lt;Badge variant="default | secondary | destructive | outline | ghost | link" /&gt;
            </p>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- With Button -->
    <div id="section-button">
      <ShowcaseCard title="With Button" description="Badge inside a button">
        <div class="flex flex-wrap items-center gap-3 py-4">
          <button class="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm">
            Updates
            <Badge variant="secondary">2</Badge>
          </button>
          <button class="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm">
            Alerts
            <Badge variant="destructive">5</Badge>
          </button>
          <button class="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm">
            Status
            <Badge variant="outline">Active</Badge>
          </button>
        </div>
      </ShowcaseCard>
    </div>

    <!-- With Card -->
    <div id="section-card">
      <ShowcaseCard title="With Card" description="Badge inside a card header">
        <div class="space-y-4">
          <div class="rounded-lg border p-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold">Project Alpha</h3>
                <p class="text-sm text-muted-foreground">Active project</p>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
          </div>
          <div class="rounded-lg border p-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold">Project Beta</h3>
                <p class="text-sm text-muted-foreground">Pending review</p>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Custom Class -->
    <div id="section-class">
      <ShowcaseCard title="Custom Class" description="Add custom classes for additional styling">
        <div class="flex flex-wrap items-center gap-3 py-4">
          <Badge class="rounded-full">Rounded Full</Badge>
          <Badge class="rounded-none">No Rounded</Badge>
          <Badge class="border-primary text-primary">Custom Border</Badge>
          <Badge class="bg-blue-500 text-white border-transparent">Custom Colors</Badge>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Props -->
    <div id="section-props">
      <ShowcaseCard title="Props" description="Component props and types">
        <div class="space-y-4">
          <div class="rounded-md bg-muted/50 p-4 text-sm">
            <table class="w-full">
              <thead>
                <tr class="border-b text-left">
                  <th class="pb-2 font-medium">Prop</th>
                  <th class="pb-2 font-medium">Type</th>
                  <th class="pb-2 font-medium">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">variant</td>
                  <td class="py-2 text-muted-foreground">'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'</td>
                  <td class="py-2 text-muted-foreground">'default'</td>
                </tr>
                <tr>
                  <td class="py-2 font-mono text-xs">class</td>
                  <td class="py-2 text-muted-foreground">string</td>
                  <td class="py-2 text-muted-foreground">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Usage -->
    <div id="section-usage">
      <ShowcaseCard title="Usage" description="How to use the Badge component">
        <div class="rounded-lg bg-zinc-950 p-4 text-sm">
          <pre class="text-green-400 overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import { Badge } from "@/components/ui/badge"
&lt;/script&gt;

&lt;template&gt;
  &lt;Badge&gt;Default&lt;/Badge&gt;
  &lt;Badge variant="secondary"&gt;Secondary&lt;/Badge&gt;
  &lt;Badge variant="destructive"&gt;Destructive&lt;/Badge&gt;
  &lt;Badge variant="outline"&gt;Outline&lt;/Badge&gt;
  &lt;Badge variant="ghost"&gt;Ghost&lt;/Badge&gt;
  &lt;Badge variant="link"&gt;Link&lt;/Badge&gt;
&lt;/template&gt;</code></pre>
        </div>
      </ShowcaseCard>
    </div>
  </div>
</template>