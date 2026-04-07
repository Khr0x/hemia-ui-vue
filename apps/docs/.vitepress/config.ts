import { defineConfig } from "vitepress"

export default defineConfig({
  title: "@hemia/lume",
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
          { text: "Alert", link: "/components/alert" },
          { text: "Alert Dialog", link: "/components/alert-dialog" },
          { text: "Badge", link: "/components/badge" },
          { text: "Button", link: "/components/button" },
          { text: "Card", link: "/components/card" },
          { text: "Field", link: "/components/field" },
          { text: "TextField", link: "/components/textfield" },
          { text: "Icon", link: "/components/icon" }
        ]
      }
    ]
  }
})
