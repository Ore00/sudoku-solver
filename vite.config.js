import { defineConfig } from 'vite';

export default defineConfig({
    root: 'views',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true
    },
    server: {
        port: 3011,
        proxy: { '/api': 'http://localhost:3010' }
    }
});
