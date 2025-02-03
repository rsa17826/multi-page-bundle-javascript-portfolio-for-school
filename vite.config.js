import { defineConfig } from "vite"
import { resolve } from "path"
export default defineConfig({
  base: resolve(__dirname, "./"),
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        // main: resolve(__dirname, "src/main.js"),
        main: resolve(__dirname, "index.html"),
      },
    },
  },
})
