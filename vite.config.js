import { defineConfig } from "vite"
import { resolve } from "path"
export default defineConfig({
  // base: "multi-page-bundle",
  build: {
    outDir: "ffopen",
    rollupOptions: {
      input: [
        resolve(__dirname, "js globals/allfuncs.js"),
        resolve(__dirname, "js globals/live.js"),
        resolve(__dirname, "index.html"),
      ],
    },
  },
})
