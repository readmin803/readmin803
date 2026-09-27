<script setup lang="ts">
import TheNavbar from '~/components/layout/TheNavbar.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
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
            jobTitle: 'Sistemas · Automatización & Desarrollo Web',
            description: 'Administración ERP Navision, Windows Server, soporte técnico y desarrollo de software a medida con PHP, MySQL, JavaScript, Node.js y Nuxt 3.',
            url: 'https://readmin.dev',
            sameAs: [
              'https://github.com/readmin803'
            ],
            knowsAbout: [
              'Microsoft Dynamics NAV (Navision)',
              'Zebra ZPL',
              'Windows Server (RDP)',
              'Soporte Técnico y Helpdesk',
              'Vue 3 & Nuxt 3',
              'PHP & MySQL',
              'JavaScript (ES6+) & Node.js',
              'n8n & Automatizaciones',
              'Redes & Virtualización (VMware / Proxmox)'
            ]
          },
          {
            '@type': 'WebSite',
            '@id': 'https://readmin.dev/#website',
            url: 'https://readmin.dev',
            name: 'Raúl E. (readmin) - Stack Técnico & Portafolio',
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
  <div class="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-[#3465a4]/30 selection:text-[#204a87]">
    <!-- Main Header -->
    <TheNavbar />

    <!-- Main Content -->
<main class="flex-grow">
      <HeroSection />
      <ProjectsSection />
      <ContactSection />
    </main>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>
