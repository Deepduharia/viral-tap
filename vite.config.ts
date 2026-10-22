import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages base path. Set to '/' for default domain,
// or '/REPO_NAME/' for user/organization pages.
const base = process.env.GITHUB_PAGES_BASE || '/'

export default defineConfig({
  plugins: [react()],
  base,
})