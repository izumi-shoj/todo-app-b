import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages（project pages）ならリポジトリ名に合わせる
  base: '/todo-app-b/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
