import { isAbsolute, resolve } from "path";
import { defineConfig } from "vite";

function isExternal(id: string): boolean {
  return !id.startsWith(".") && !isAbsolute(id) && !id.startsWith("~/");
}

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: isExternal
    }
  }
});
