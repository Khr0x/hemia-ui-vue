<script setup lang="ts">
import { ref } from "vue"
import { TextField } from "@/components/ui/textfield"
import ShowcaseCard from "../ShowcaseCard.vue"

const email = ref("")
const username = ref("")
const password = ref("")
const search = ref("")
</script>

<template>
  <div class="space-y-8">
    <!-- Page header -->
    <div>
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-bold tracking-tight">TextField</h1>
        <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Component</span>
      </div>
      <p class="text-muted-foreground mt-1 text-sm">
        Input component with built-in label, description, and error states.
      </p>
    </div>

    <!-- Quick preview -->
    <ShowcaseCard title="Preview" description="Default text field">
      <div class="py-6">
        <TextField
          label="Email"
          placeholder="you@example.com"
          description="We'll never share your email with anyone."
        />
      </div>
    </ShowcaseCard>

    <!-- Basic usage -->
    <div id="section-basic">
      <ShowcaseCard title="Basic Usage" description="Simple text field with label">
        <div class="space-y-4">
          <div class="max-w-sm">
            <TextField
              label="Username"
              placeholder="Enter your username"
              v-model="username"
            />
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <pre class="text-xs font-mono text-muted-foreground">&lt;TextField label="Username" placeholder="..." /&gt;</pre>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- With description -->
    <div id="section-description">
      <ShowcaseCard title="With Description" description="Field with help text">
        <div class="space-y-4">
          <div class="max-w-sm">
            <TextField
              label="Email"
              type="email"
              placeholder="you@example.com"
              description="We'll never share your email with anyone."
              v-model="email"
            />
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <pre class="text-xs font-mono text-muted-foreground">description="Help text here"</pre>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Error state -->
    <div id="section-error">
      <ShowcaseCard title="Error State" description="Field with validation error">
        <div class="space-y-4">
          <div class="max-w-sm">
            <TextField
              label="Password"
              type="password"
              placeholder="Enter password"
              error="Password must be at least 8 characters"
              v-model="password"
            />
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <pre class="text-xs font-mono text-muted-foreground">error="Error message"</pre>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Sizes -->
    <div id="section-sizes">
      <ShowcaseCard title="Sizes" description="Small, default, and large variants">
        <div class="space-y-4">
          <div class="space-y-4">
            <div class="max-w-sm">
              <TextField
                label="Small"
                size="sm"
                placeholder="Small input"
              />
            </div>
            <div class="max-w-sm">
              <TextField
                label="Default"
                size="default"
                placeholder="Default input"
              />
            </div>
            <div class="max-w-sm">
              <TextField
                label="Large"
                size="lg"
                placeholder="Large input"
              />
            </div>
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <pre class="text-xs font-mono text-muted-foreground">&lt;TextField size="sm | default | lg" /&gt;</pre>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Input types -->
    <div id="section-types">
      <ShowcaseCard title="Input Types" description="Various input types supported">
        <div class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Email"
              type="email"
              placeholder="you@example.com"
            />
            <TextField
              label="Password"
              type="password"
              placeholder="********"
            />
            <TextField
              label="Search"
              type="search"
              placeholder="Search..."
            />
            <TextField
              label="URL"
              type="url"
              placeholder="https://example.com"
            />
            <TextField
              label="Number"
              type="number"
              placeholder="123"
            />
            <TextField
              label="Tel"
              type="tel"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <pre class="text-xs font-mono text-muted-foreground">&lt;TextField type="text | email | password | ..." /&gt;</pre>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Disabled state -->
    <div id="section-disabled">
      <ShowcaseCard title="Disabled" description="Disabled input field">
        <div class="space-y-4">
          <div class="max-w-sm">
            <TextField
              label="Disabled"
              placeholder="Cannot edit"
              disabled
            />
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <pre class="text-xs font-mono text-muted-foreground">&lt;TextField disabled /&gt;</pre>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- v-model -->
    <div id="section-vmodel">
      <ShowcaseCard title="v-model" description="Two-way binding">
        <div class="space-y-4">
          <div class="max-w-sm">
            <TextField
              label="Search"
              type="search"
              placeholder="Type to search..."
              v-model="search"
            />
          </div>
          <div class="rounded-lg border p-3">
            <p class="text-xs font-medium">Current value: <span class="font-mono text-primary">"{{ search }}"</span></p>
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <pre class="text-xs font-mono text-muted-foreground">v-model="search"</pre>
          </div>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Form example -->
    <div id="section-form">
      <ShowcaseCard title="Form Example" description="Login form with TextField">
        <div class="max-w-sm mx-auto">
          <form @submit.prevent class="space-y-4">
            <TextField
              label="Email"
              type="email"
              placeholder="you@example.com"
              description="We'll never share your email."
            />
            <TextField
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <button
              type="submit"
              class="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9"
            >
              Sign In
            </button>
          </form>
        </div>
      </ShowcaseCard>
    </div>

    <!-- Usage -->
    <div id="section-usage">
      <ShowcaseCard title="Usage" description="How to use TextField component">
        <div class="rounded-lg bg-zinc-950 p-4 text-sm">
          <pre class="text-green-400 overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import { ref } from "vue"
import { TextField } from "@/components/ui/textfield"

const value = ref("")
&lt;/script&gt;

&lt;template&gt;
  &lt;TextField
    label="Email"
    placeholder="you@example.com"
    description="Help text"
    error="Error message"
    v-model="value"
  /&gt;
&lt;/template&gt;</code></pre>
        </div>
      </ShowcaseCard>
    </div>
  </div>
</template>