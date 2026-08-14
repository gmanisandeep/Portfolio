import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/union-bank/",
  plugins: [react()],
  build: {
    outDir: "../../public/union-bank",
    emptyOutDir: true,
  },
});
