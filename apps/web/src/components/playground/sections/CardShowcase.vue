<script setup lang="ts">
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ShowcaseCard from "../ShowcaseCard.vue"
</script>

<template>
  <div class="space-y-8">
    <!-- Page header -->
    <div>
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Card</h1>
        <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Component</span>
      </div>
      <p class="text-muted-foreground mt-1 text-sm">
        A flexible container for grouping related content with headers, descriptions, and actions.
      </p>
    </div>

    <!-- Quick preview -->
    <ShowcaseCard title="Preview" description="Default card with all sections">
      <div class="py-4">
        <Card class="w-[350px]">
          <CardHeader>
            <CardTitle>Project Alpha</CardTitle>
            <CardDescription>Manage your AI-powered automation workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Create and manage complex automation workflows with our intuitive builder.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Get Started</Button>
          </CardFooter>
        </Card>
      </div>
    </ShowcaseCard>

    <!-- Sizes -->
    <div id="section-sizes">
      <ShowcaseCard title="Sizes" description="Different card sizes">
        <div class="flex flex-wrap gap-4 py-4">
          <div>
            <p class="mb-2 text-sm text-muted-foreground">Small</p>
            <Card size="sm" class="w-[280px]">
              <CardHeader>
                <CardTitle>Quick Action</CardTitle>
                <CardDescription>Short description here</CardDescription>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">Content goes here</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" class="w-full">Action</Button>
              </CardFooter>
            </Card>
          </div>
          <div>
            <p class="mb-2 text-sm text-muted-foreground">Default</p>
            <Card class="w-[350px]">
              <CardHeader>
                <CardTitle>Full Card</CardTitle>
                <CardDescription>With all the details</CardDescription>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">More detailed content here</p>
              </CardContent>
              <CardFooter>
                <Button>Confirm</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div class="rounded-lg bg-muted/50 p-3">
          <p class="text-xs font-mono text-muted-foreground">
            &lt;Card size="default | sm" /&gt;
          </p>
        </div>
      </ShowcaseCard>
    </div>

    <!-- With Action -->
    <div id="section-action">
      <ShowcaseCard title="With Action" description="Card with action buttons in top-right">
        <div class="flex flex-wrap gap-4 py-4">
          <Card class="w-[300px]">
            <CardAction>
              <Button size="sm" variant="ghost">...</Button>
            </CardAction>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Adjust your account settings and preferences.
              </p>
            </CardContent>
          </Card>

          <Card class="w-[300px]">
            <CardAction>
              <Button size="sm" variant="ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </Button>
            </CardAction>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Receive alerts about important events.
              </p>
            </CardContent>
          </Card>
        </div>
        <div class="rounded-lg bg-muted/50 p-3">
          <p class="text-xs font-mono text-muted-foreground">
            &lt;Card&gt;&lt;CardAction&gt;...&lt;/CardAction&gt;...&lt;/Card&gt;
          </p>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Simple Card -->
    <div id="section-simple">
      <ShowcaseCard title="Simple Card" description="Just header and content">
        <div class="py-4">
          <Card class="w-[300px]">
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                This is a simple card with just a title and content.
              </p>
            </CardContent>
          </Card>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Card as Form -->
    <div id="section-form">
      <ShowcaseCard title="Card as Form" description="Using Card for form layouts">
        <div class="py-4">
          <Card class="w-[400px]">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your contact details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form class="space-y-4">
                <div class="grid gap-2">
                  <label for="name" class="text-sm font-medium">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div class="grid gap-2">
                  <label for="email" class="text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div class="grid gap-2">
                  <label for="message" class="text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    placeholder="Your message..."
                    rows="3"
                    class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
              </form>
            </CardContent>
            <CardFooter class="justify-end">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Card with Footer Actions -->
    <div id="section-footer">
      <ShowcaseCard title="Footer Actions" description="Card with multiple actions in footer">
        <div class="py-4">
          <Card class="w-[350px]">
            <CardHeader>
              <CardTitle>Confirm Action</CardTitle>
              <CardDescription>Are you sure you want to proceed?</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                This action cannot be undone once confirmed.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Confirm</Button>
            </CardFooter>
          </Card>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Small Card with Full Width Button -->
    <div id="section-small-footer">
      <ShowcaseCard title="Small Card with Full Width" description="Buttons occupy full width in small cards">
        <div class="py-4">
          <div class="flex flex-wrap gap-4">
            <Card size="sm" class="w-[250px]">
              <CardHeader>
                <CardTitle>Quick Save</CardTitle>
                <CardDescription>Save your progress</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button size="sm" class="w-full">Save Now</Button>
              </CardFooter>
            </Card>

            <Card size="sm" class="w-[250px]">
              <CardHeader>
                <CardTitle>Delete Item</CardTitle>
                <CardDescription>Remove permanently</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button size="sm" variant="destructive" class="w-full">Delete</Button>
              </CardFooter>
            </Card>

            <Card size="sm" class="w-[250px]">
              <CardHeader>
                <CardTitle>View Details</CardTitle>
                <CardDescription>See more information</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button size="sm" variant="outline" class="w-full">View</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Custom Class -->
    <div id="section-class">
      <ShowcaseCard title="Custom Class" description="Add custom classes for additional styling">
        <div class="flex flex-wrap gap-4 py-4">
          <Card class="w-[280px] border-primary">
            <CardHeader>
              <CardTitle>Custom Border</CardTitle>
              <CardDescription>Using border-primary</CardDescription>
            </CardHeader>
          </Card>

          <Card class="w-[280px] shadow-lg">
            <CardHeader>
              <CardTitle>Large Shadow</CardTitle>
              <CardDescription>Using shadow-lg</CardDescription>
            </CardHeader>
          </Card>

          <Card class="w-[280px] bg-primary/5">
            <CardHeader>
              <CardTitle>Custom Background</CardTitle>
              <CardDescription>Using bg-primary/5</CardDescription>
            </CardHeader>
          </Card>
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
                  <td class="py-2 font-mono text-xs">Card</td>
                  <td class="py-2 text-muted-foreground">Root container with size prop</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">CardHeader</td>
                  <td class="py-2 text-muted-foreground">Container for title and description</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">CardTitle</td>
                  <td class="py-2 text-muted-foreground">Bold title text</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">CardDescription</td>
                  <td class="py-2 text-muted-foreground">Muted description text</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">CardContent</td>
                  <td class="py-2 text-muted-foreground">Main content area</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">CardFooter</td>
                  <td class="py-2 text-muted-foreground">Container for action buttons</td>
                </tr>
                <tr>
                  <td class="py-2 font-mono text-xs">CardAction</td>
                  <td class="py-2 text-muted-foreground">Action buttons positioned in top-right</td>
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
                  <td class="py-2 font-mono text-xs">Card</td>
                  <td class="py-2 text-muted-foreground">size?: 'default' | 'sm', class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">CardHeader</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">CardTitle</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">CardDescription</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">CardContent</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2 font-mono text-xs">CardFooter</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
                <tr>
                  <td class="py-2 font-mono text-xs">CardAction</td>
                  <td class="py-2 text-muted-foreground">class?: string</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Usage -->
    <div id="section-usage">
      <ShowcaseCard title="Usage" description="How to use the Card component">
        <div class="rounded-lg bg-zinc-950 p-4 text-sm">
          <pre class="text-green-400 overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
&lt;/script&gt;

&lt;template&gt;
  &lt;Card&gt;
    &lt;CardAction&gt;
      &lt;Button size="sm" variant="ghost"&gt;...&lt;/Button&gt;
    &lt;/CardAction&gt;
    &lt;CardHeader&gt;
      &lt;CardTitle&gt;Title&lt;/CardTitle&gt;
      &lt;CardDescription&gt;Description&lt;/CardDescription&gt;
    &lt;/CardHeader&gt;
    &lt;CardContent&gt;
      Content goes here.
    &lt;/CardContent&gt;
    &lt;CardFooter&gt;
      &lt;Button&gt;Action&lt;/Button&gt;
    &lt;/CardFooter&gt;
  &lt;/Card&gt;
&lt;/template&gt;</code></pre>
        </div>
      </ShowcaseCard>
    </div>
  </div>
</template>