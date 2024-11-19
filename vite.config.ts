/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/// <reference types="vitest" /> 
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react' // react plugin
// import svgr from 'vite-plugin-svgr' // svgr plugin
import tsconfigPaths from 'vite-tsconfig-paths' // tsconfig paths plugin
import { defineConfig } from 'vite' // vitest config
export default defineConfig({
    base: '/',
  plugins: [react(), tsconfigPaths()],
  server: { 
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './src/testing/setup-tests.ts',
    exclude: ['node_modules', '.dist', '.build','**/e2e/**'],
    //这是测试覆盖率
    coverage: {
        include: ['src/**'],
    },
  },
  // 优化依赖
  optimizeDeps: {
    // include: ['react/jsx-runtime'],
    exclude: ['fsevents'], // 排除fsevents
  },
  // 构建
  build: {
    // 构建选项
   rollupOptions: {
    // input: {
    //   main: './index.html',
    // },
    external: ['fs/promises'],// 外部依赖
    output:{
        experimentalMinChunkSize: 1000, // 最小chunk大小
    }
   },
  },
})
