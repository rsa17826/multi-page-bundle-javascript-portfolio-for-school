import { defineConfig } from "vite"
import { resolve } from "path"
import path from "path"
export default defineConfig({
  // base: "multi-page-bundle",
  assetsInclude: ["js globals/*"],
  build: {
    outDir: "docs",
    rollupOptions: {
      input: [
        // Single instance shared with every tab
        "./js globals/libloader.js",
        "./js globals/allfuncs.js",
        "./js globals/live.js",
        "./index.html",
        "./vid1 site clone/index.html",
        "./vid1 site clone/secret.html",
        "./bg color changer/index.html",
      ],
      output: {
        // If you find yourself fighting JS files appearing in assets, the following lines were things that didn't work.
        // format: "cjs",
        // inlineDynamicImports: true,
        // manualChunks: {},
        // preserveModules: false,
        // manualChunks: (chunkInfo) => {
        // 	return "*";
        // },

        entryFileNames: (entryInfo) => {
          const relPath = path.relative(
            __dirname,
            entryInfo.facadeModuleId
          )
          const moduleDir = path.dirname(relPath)
          const outPath = path.join(moduleDir, "[name].js")
          // console.debug({ entryInfo, relPath, moduleDir, outPath });
          return outPath
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.originalFileName) {
            // Vite-internally calls this with nil sometimes, ignore it as per docs
            // console.debug({ assetInfo });
            return "[name].[ext]"
          }
          const moduleDir = path.dirname(assetInfo.originalFileName)
          // console.debug({ assetInfo, moduleDir });
          return moduleDir + "/[name].[ext]"
        },
      },
    },
  },
})
