<script setup lang="ts">
import TheNavbar from '~/components/layout/TheNavbar.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import SkillsSection from '~/components/sections/SkillsSection.vue'

// Schema.org Structured Data for Search Engines & Generative AI Engines (GEO)
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://readmin803.vercel.app/#person',
            name: 'readmin',
            alternateName: ['readmin803'],
            description: 'Portafolio técnico: Automatizaciones n8n, Next.js (SEO & GEO) y aplicaciones web en PHP.',
            url: 'https://readmin803.vercel.app',
            sameAs: [
              'https://github.com/readmin803'
            ],
            knowsAbout: [
              'Next.js 16 (App Router, SSR, SSG)',
              'Sanity.io Headless CMS & Live Content API',
              'Generative Engine Optimization (GEO)',
              'Technical SEO & Core Web Vitals',
              'JSON-LD Schema.org',
              'n8n Workflows and Automations',
              'Nuxt.js',
              'PHP Modern Development',
              'REST APIs',
              'Vercel Deployment'
            ]
          },
          {
            '@type': 'WebSite',
            '@id': 'https://readmin803.vercel.app/#website',
            url: 'https://readmin803.vercel.app',
            name: 'readmin (@readmin803) - Portafolio',
            publisher: {
              '@id': 'https://readmin803.vercel.app/#person'
            }
          }
        ]
      })
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
    <!-- Navbar: Proyectos & Stack Técnico -->
    <TheNavbar />

    <!-- Main Content: Hero, Proyectos, Stack Técnico -->
    <main class="flex-grow">
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
    </main>

    <!-- Clean Footer -->
    <TheFooter />
  </div>
</template>
