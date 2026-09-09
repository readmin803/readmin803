<script setup lang="ts">
import TheNavbar from '~/components/layout/TheNavbar.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import SkillsSection from '~/components/sections/SkillsSection.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'

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
            '@id': 'https://readmin.dev/#person',
            name: 'Raúl Engracia',
            alternateName: ['readmin', 'readmin803'],
            jobTitle: 'Lead Frontend & Technical SEO Engineer',
            description: 'Lead Frontend & Technical SEO Engineer, Ingeniero de Automatizaciones con n8n y Especialista en Arquitecturas Headless (Next.js 16, Sanity.io) y Generative Engine Optimization (GEO).',
            url: 'https://readmin.dev',
            sameAs: [
              'https://github.com/readmin803'
            ],
            knowsAbout: [
              'Next.js 16 (App Router, SSR, SSG)',
              'Sanity.io Headless CMS & Live Content API',
              'Generative Engine Optimization (GEO)',
              'Technical SEO & Core Web Vitals',
              'JSON-LD Schema.org & Knowledge Graph',
              'n8n Workflows and Automations',
              'Nuxt.js',
              'PHP Modern Development',
              'REST APIs & Google OAuth',
              'Vercel Deployment'
            ]
          },
          {
            '@type': 'WebSite',
            '@id': 'https://readmin.dev/#website',
            url: 'https://readmin.dev',
            name: 'Raúl Engracia (readmin) - Portafolio Profesional',
            publisher: {
              '@id': 'https://readmin.dev/#person'
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
    <!-- Main Header -->
    <TheNavbar />

    <!-- Main Content -->
    <main class="flex-grow">
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>
