<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alertdialog"
import { Button } from "@/components/ui/button"
import ShowcaseCard from "../ShowcaseCard.vue"
</script>

<template>
  <div class="space-y-8">
    <!-- Page header -->
    <div>
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Alert Dialog</h1>
        <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Component</span>
      </div>
      <p class="text-muted-foreground mt-1 text-sm">
        A modal dialog that requires the user to confirm an action before proceeding. Perfect for destructive actions.
      </p>
    </div>

    <!-- Quick preview -->
    <ShowcaseCard title="Preview" description="Default alert dialog">
      <div class="flex items-center justify-center py-8">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Show Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ShowcaseCard>

    <!-- Sizes -->
    <div id="section-sizes">
      <ShowcaseCard title="Sizes" description="Dialog with different sizes">
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">Small (centered)</Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Small Dialog</AlertDialogTitle>
                  <AlertDialogDescription>
                    Content is centered and buttons are full width.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">Medium</Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Medium Dialog</AlertDialogTitle>
                  <AlertDialogDescription>
                    This is the default medium size dialog.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">Large</Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>Large Dialog</AlertDialogTitle>
                  <AlertDialogDescription>
                    This is a large dialog for more content. You can include more details here.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">Extra Large</Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Extra Large Dialog</AlertDialogTitle>
                  <AlertDialogDescription>
                    This is an extra large dialog for complex content.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <p class="text-xs font-mono text-muted-foreground">
              &lt;AlertDialogContent size="sm | md | lg | xl | full" /&gt;
            </p>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Persistent -->
    <div id="section-persistent">
      <ShowcaseCard title="Persistent" description="Dialog that cannot be closed by clicking outside">
        <div class="space-y-4">
          <div class="flex items-center justify-center py-8">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Open Persistent Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent persistent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Permanent Dialog</AlertDialogTitle>
                  <AlertDialogDescription>
                    This dialog will not close when you click outside. Use the buttons below to close it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <p class="text-xs font-mono text-muted-foreground">
              &lt;AlertDialogContent persistent /&gt;
            </p>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- With Media -->
    <div id="section-media">
      <ShowcaseCard title="With Media" description="Dialog with icon/media using #media slot">
        <div class="space-y-4">
          <div class="flex items-center justify-center py-8">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <template #media>
                    <AlertDialogMedia class="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </AlertDialogMedia>
                  </template>
                  <AlertDialogTitle>Delete account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your account. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <p class="text-xs font-mono text-muted-foreground">
              Use &lt;template #media&gt; slot in AlertDialogHeader to center media
            </p>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Sub-components -->
    <div id="section-components">
      <ShowcaseCard title="Sub-components" description="Available components and their purposes">
        <div class="space-y-4">
          <div class="rounded-md bg-muted/50 p-4 text-sm">
            <table class="w-full">
              <thead>
                <tr class="border-b text-left">
                  <th class="pb-2 font-medium">Component</th>
                  <th class="pb-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialog</td>
                  <td class="py-2 text-muted-foreground">Main container that manages state</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogTrigger</td>
                  <td class="py-2 text-muted-foreground">Button that opens the dialog</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogContent</td>
                  <td class="py-2 text-muted-foreground">Modal content with overlay and animations</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogHeader</td>
                  <td class="py-2 text-muted-foreground">Container for title and description</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogFooter</td>
                  <td class="py-2 text-muted-foreground">Container for action buttons</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogTitle</td>
                  <td class="py-2 text-muted-foreground">Bold title text</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogDescription</td>
                  <td class="py-2 text-muted-foreground">Muted description text</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogAction</td>
                  <td class="py-2 text-muted-foreground">Confirm button (primary style, optional destructive)</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogCancel</td>
                  <td class="py-2 text-muted-foreground">Cancel button (default style)</td>
                </tr>
                <tr>
                  <td class="py-2 font-mono text-xs">AlertDialogMedia</td>
                  <td class="py-2 text-muted-foreground">Container for icons/media</td>
                </tr>
              </tbody>
            </table>
          </div>
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
                  <th class="pb-2 font-medium">Component</th>
                  <th class="pb-2 font-medium">Props</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialog</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogTrigger</td>
                  <td class="py-2 text-muted-foreground">asChild?: boolean, class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogContent</td>
                  <td class="py-2 text-muted-foreground">size?: 'sm' | 'md' | 'lg' | 'xl' | 'full', persistent?: boolean, class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogHeader</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogFooter</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogTitle</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogDescription</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">AlertDialogAction</td>
                  <td class="py-2 text-muted-foreground">variant?: 'default' | 'destructive', class?: string, @click event</td>
                </tr>
                <tr>
                  <td class="py-2 font-mono text-xs">AlertDialogCancel</td>
                  <td class="py-2 text-muted-foreground">class?: string, @click event</td>
                </tr>
                <tr>
                  <td class="py-2 font-mono text-xs">AlertDialogMedia</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Basic Usage -->
    <div id="section-usage">
      <ShowcaseCard title="Usage" description="How to use the AlertDialog component">
        <div class="rounded-lg bg-zinc-950 p-4 text-sm">
          <pre class="text-green-400 overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alertdialog"
&lt;/script&gt;

&lt;template&gt;
  &lt;AlertDialog&gt;
    &lt;AlertDialogTrigger asChild&gt;
      &lt;Button&gt;Open Dialog&lt;/Button&gt;
    &lt;/AlertDialogTrigger&gt;
    &lt;AlertDialogContent&gt;
      &lt;AlertDialogHeader&gt;
        &lt;AlertDialogTitle&gt;Title&lt;/AlertDialogTitle&gt;
        &lt;AlertDialogDescription&gt;
          Description text here.
        &lt;/AlertDialogDescription&gt;
      &lt;/AlertDialogHeader&gt;
      &lt;AlertDialogFooter&gt;
        &lt;AlertDialogCancel&gt;Cancel&lt;/AlertDialogCancel&gt;
        &lt;AlertDialogAction&gt;Continue&lt;/AlertDialogAction&gt;
      &lt;/AlertDialogFooter&gt;
    &lt;/AlertDialogContent&gt;
  &lt;/AlertDialog&gt;
&lt;/template&gt;</code></pre>
        </div>
      </ShowcaseCard>
    </div>
  </div>
</template>