// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://annclinic.ro",
  base: "/",
  trailingSlash: "ignore",

  // Performance optimizations
  build: {
    inlineStylesheets: "auto",
  },

  vite: {
    // CSS optimization
    css: {
      devSourcemap: true,
    },
    build: {
      // Optimize CSS for production
      cssCodeSplit: true,
      // Reduce bundle size
      minify: "esbuild",
      // Target modern browsers for smaller bundles
      target: "es2020",
      // Split vendor libraries for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "framer-motion": ["framer-motion"],
          },
        },
      },
    },
    // Optimize development
    optimizeDeps: {
      include: ["react", "react-dom", "framer-motion"],
    },
    plugins: [tailwindcss()],
  },

  // Performance and SEO optimizations

  // Prefetch settings for better navigation
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "viewport",
  },

  integrations: [
    // React for interactive components
    react(),
  ],

  // Output configuration for performance
  output: "static",
});
