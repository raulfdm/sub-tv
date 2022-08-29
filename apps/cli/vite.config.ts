import { resolve, isAbsolute } from "path";
import { defineConfig } from "vite";

function isExternal(id: string) {
  return !id.startsWith(".") && !isAbsolute(id) && !id.startsWith("~/");
}

export default defineConfig({
  define: {
    __SERVER_URL__: process.env.SERVER_URL || "http://localhost:5001"
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/app.ts"),
      fileName: "sub-tv",
      formats: ["es"]
    },
    rollupOptions: {
      external: isExternal
    }
  }
});
