import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import path from 'path'; // Import the 'path' module


// Get the repository name from environment variable (for GitHub Actions)
const repoName = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/';

// Use a conditional base for local development vs. production (GitHub Pages)
const base = process.env.NODE_ENV === 'production' ? repoName : '/';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
  },
});