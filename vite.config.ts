import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Lovable tagger - optional, only used in Lovable environment
let componentTagger: any = () => null;
try {
  const lovableTagger = await import("lovable-tagger");
  componentTagger = lovableTagger.componentTagger;
} catch (e) {
  // lovable-tagger not available, skipping
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
