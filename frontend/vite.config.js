import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
 plugins: [react()],
 test: {
   environment: 'jsdom',
   globals: true,
   coverage: {
     provider: 'v8',
     reporter: ['text', 'lcov'],
     include: ['src/**/*.{js,jsx}'],
     exclude: ['src/main.jsx'],
     thresholds: {
       lines: 80,
       functions: 80,
       branches: 70,
       statements: 80
     }
   }
 }
});
