import { defineConfig } from "vitepress"

export default defineConfig({
  title: "@hemia/ui",
  description: "A shadcn-inspired, multi-framework component system for Vue, React, Svelte, and Astro",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/introduction" },
      { text: "Components", link: "/components/button" }
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/guide/introduction" },
          { text: "Installation", link: "/guide/installation" }
        ]
      },
      {
        text: "Frameworks",
        items: [
          { text: "Vue", link: "/frameworks/vue" },
          { text: "React (coming soon)", link: "/frameworks/react" },
          { text: "Svelte (coming soon)", link: "/frameworks/svelte" },
          { text: "Astro (coming soon)", link: "/frameworks/astro" }
        ]
      },
      {
        text: "Components",
        items: [
          { text: "Button", link: "/components/button" }
        ]
      }
    ]
  }
})
