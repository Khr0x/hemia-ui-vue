import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@/components/ui": resolve(__dirname, "../../packages/registry/registry/vue"),
      "@": resolve(__dirname, "src"),
      "@hemia/lume-vue": resolve(__dirname, "../../packages/vue/src"),
      "@hemia/lume": resolve(__dirname, "../../packages/core/src"),
      "@hemia/lume-registry": resolve(__dirname, "../../packages/registry/src")
    }
  }
})
