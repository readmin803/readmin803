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
      title: 'Raúl Engracia (readmin) · Desarrollador Full-Stack, Automatizaciones n8n & SEO/GEO',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Portafolio profesional de Raúl Engracia (readmin / readmin803). Automatización de flujos con n8n, desarrollo web Next.js ultra-optimizado para SEO y motores de IA (GEO), y aplicaciones web en PHP.'
        },
        { name: 'author', content: 'Raúl Engracia (readmin)' },
        { property: 'og:title', content: 'Raúl Engracia (readmin) · Portafolio Profesional' },
        {
          property: 'og:description',
          content: 'Soluciones técnicas de alto impacto: Automatizaciones n8n, Next.js con SEO técnico e IA, y aplicaciones web robustas en PHP.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'readmin - Raúl Engracia' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Raúl Engracia (readmin) · Portafolio Profesional' },
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
