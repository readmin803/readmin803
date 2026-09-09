// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  nitro: {
    preset: 'vercel'
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'es',
        class: 'dark scroll-smooth'
      },
      title: 'readmin (@readmin803) · Portafolio Técnico',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Portafolio técnico de readmin (@readmin803). Automatizaciones n8n, desarrollo Next.js (SEO & GEO) y aplicaciones web en PHP.'
        },
        { name: 'author', content: 'readmin (@readmin803)' },
        { property: 'og:title', content: 'readmin (@readmin803) · Portafolio Técnico' },
        {
          property: 'og:description',
          content: 'Proyectos de ingeniería: Automatizaciones n8n, Next.js con SEO técnico e IA (GEO), y backend en PHP.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'readmin' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'readmin (@readmin803) · Portafolio Técnico' },
        { name: 'theme-color', content: '#090d16' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap'
        }
      ]
    }
  }
})
