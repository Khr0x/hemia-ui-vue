import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import { resolve } from "path"

export default defineConfig({
  plugins: [
    vue(),
    dts({ insertTypesEntry: true })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`
    },
    rollupOptions: {
      external: ["vue", "@hemia/lume", "fs-extra", "path", "module"],
      output: {
        globals: { vue: "Vue" }
      }
    }
  }
})
