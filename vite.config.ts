import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  resolve:{
    alias:{
      '~' : path.resolve(__dirname, './src')
    },
  },
  plugins: [vue(), svgLoader()]
})
