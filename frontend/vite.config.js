import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In dev, API calls to /url go to the Express server.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/url": "http://localhost:8001" } },
});
