import { resolve, isAbsolute } from "path";
import { defineConfig } from "vite";

function isExternal(id: string) {
  return !id.startsWith(".") && !isAbsolute(id) && !id.startsWith("~/");
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/app.ts"),
      fileName: "sub-tv",
      formats: ["cjs"]
    },
    rollupOptions: {
      external: isExternal
    }
  }
});
