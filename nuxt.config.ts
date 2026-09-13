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
      title: 'Raúl E. (readmin) · Automatización, Fullstack & Sistemas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Portafolio profesional de Raúl E. (readmin / readmin803). Automatización de procesos con n8n, desarrollo web fullstack con Vue 3 y Nuxt 3, y administración de sistemas y bases de datos.',
        },
        { name: 'author', content: 'Raúl E. (readmin)' },
        { property: 'og:title', content: 'Raúl E. (readmin) · Portafolio Profesional' },
        {
          property: 'og:description',
          content: 'Automatización de procesos, desarrollo web fullstack y administración de sistemas.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'readmin - Raúl E.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Raúl E. (readmin) · Portafolio Profesional' },
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
