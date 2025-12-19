import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  // GitHub Pages deployment configuration
  // Set base to your repository name if deploying to GitHub Pages
  // For root domain deployment, use '/'
  // For subdirectory deployment, use '/repository-name/'
  base: process.env.GITHUB_PAGES === 'true' ? '/Habit-Forge/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
