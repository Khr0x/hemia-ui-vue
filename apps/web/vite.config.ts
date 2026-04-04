import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/components/ui": resolve(__dirname, "../../packages/registry/registry/vue"),
      "@": resolve(__dirname, "src")
    }
  }
})
