import { defineConfig } from "vite"
import { resolve } from "path"
import path from "path"
export default defineConfig({
  base: "/multi-page-bundle",
  assetsInclude: [
    "js globals/*.js",
    "ffopen/*.js",
    "nav/*.js",
    "Palindrome Checker Project/*.js",
  ],
  build: {
    outDir: "docs",
    rollupOptions: {
      input: [
        "./js globals/libloader.js",
        "./js globals/allfuncs.js",
        "./js globals/live.js",
        "./js globals/betterlogs.js",
        "./index.html",
        "./vid1 site clone/index.html",
        "./vid1 site clone/secret.html",
        "./bg color changer/index.html",
        "./ffopen/index.html",
        "./ffopen/libloader.js",
        "./ffopen/allfuncs.lib.js",
        "./ffopen/cache.lib.js",
        "./ffopen/condencearraybynumber.lib.js",
        "./ffopen/converter.lib.js",
        "./ffopen/eruda.error.js",
        "./ffopen/eruda.js",
        "./ffopen/ffopener.lib.js",
        "./ffopen/indexeddbls.lib.js",
        "./ffopen/lzstring.lib.js",
        "./ffopen/lzstring.lib.js",
        "./ffopen/menu.lib.js",
        "./ffopen/newelem.lib.js",
        "./ffopen/progress.lib.js",
        "./ffopen/protectedtextapi.lib.js",
        "./ffopen/protectedtextlevelsaver.lib.js",
        "./ffopen/range.lib.js",
        "./ffopen/strict.lib.js",
        "./ffopen/toast.lib.js",
        "./styles/root.css",
        "./styles/mainstyle.css",
        "./nav/nav.js",
        "./nav/nav.css",
        "./imgs/mainlogo.png",
        "./Palindrome Checker Project/index.html",
        "./Palindrome Checker Project/script.js",
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
          console.log(assetInfo.originalFileNames)
          // console.debug({ assetInfo, moduleDir });
          return assetInfo.originalFileName //moduleDir
          // ? moduleDir + "/[name].[ext]"
          // : "[name].[ext]"
        },
      },
    },
  },
})
