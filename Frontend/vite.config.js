import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://gobrightglobal.com',
      dynamicRoutes: [
        '/',
        '/about',
        '/contact',
        '/services/branding-&-brand-identity',
        '/services/digital-marketing',
        '/services/tech-solutions',
        '/services/photography-&-videography',
        '/services/other-services',
        '/industries',
        '/terms-and-conditions',
        '/privacy-policy',
        '/refund-policy',
      ],
    }),
  ],
})
