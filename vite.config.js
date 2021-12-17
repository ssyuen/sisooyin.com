const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    minify: 'esbuild',
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        work: resolve(__dirname, 'work/index.html')
      }
    }
  }
})