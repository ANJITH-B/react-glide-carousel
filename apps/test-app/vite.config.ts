import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Point directly at the package source so changes reflect without rebuilding
      "react-glide-carousel": path.resolve(
        __dirname,
        "../../packages/react-glide-carousel/src/index.ts"
      ),
    },
  },
});
