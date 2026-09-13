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
            name: 'Raúl E.',
            alternateName: ['readmin', 'readmin803'],
            jobTitle: 'Fullstack · Automatización & Sistemas',
            description: 'Automatización de procesos con n8n, desarrollo web fullstack con Vue 3 y Nuxt 3, y administración de sistemas y bases de datos.',
            url: 'https://readmin.dev',
            sameAs: [
              'https://github.com/readmin803'
            ],
            knowsAbout: [
              'n8n & Automatizaciones',
              'Vue 3 (Composition API)',
              'Nuxt 3 (SSR, SSG, Nitro Engine)',
              'JavaScript (ES6+)',
              'Tailwind CSS',
              'REST APIs',
              'Docker',
              'Bases de datos (PostgreSQL / MySQL)',
              'Phaser.js & PixiJS (2D Games)'
            ]
          },
          {
            '@type': 'WebSite',
            '@id': 'https://readmin.dev/#website',
            url: 'https://readmin.dev',
            name: 'Raúl E. (readmin) - Portafolio Profesional',
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
