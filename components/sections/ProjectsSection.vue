<script setup lang="ts">
import { ref, computed } from 'vue'
import { PROJECTS, CATEGORIES } from '~/data/projects'
import ProjectCard from '~/components/ui/ProjectCard.vue'
import {
  Workflow,
  Sparkles,
  Cpu,
  FolderGit2,
  Filter
} from 'lucide-vue-next'

const selectedCategory = ref<string>('all')

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return PROJECTS
  }
  return PROJECTS.filter(project => project.category === selectedCategory.value)
})

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'n8n':
      return Workflow
    case 'nextjs-seo':
      return Sparkles
    case 'php':
      return Cpu
    default:
      return Filter
  }
}
</script>

<template>
  <section id="proyectos" class="py-24 relative">
    <!-- Section background glow -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-950/20 blur-[150px] rounded-full"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium">
          <FolderGit2 class="w-3.5 h-3.5" />
          <span>Casos de Estudio & Proyectos</span>
        </div>

        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Proyectos técnicos preparados para aportar valor desde el día uno
        </h2>

        <p class="text-slate-400 text-base sm:text-lg leading-relaxed">
          Explora los proyectos divididos en mis tres pilares de especialización: automatizaciones autónomas con <strong class="text-slate-200 font-semibold">n8n</strong>, desarrollo frontend en <strong class="text-slate-200 font-semibold">Next.js</strong> optimizado para SEO e IA, y aplicaciones web empresariales en <strong class="text-slate-200 font-semibold">PHP</strong>.
        </p>

        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-2 pt-6">
          <button
            v-for="cat in CATEGORIES"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            :class="[
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border',
              selectedCategory === cat.id
                ? 'bg-cyan-500 text-dark-950 border-cyan-400 shadow-md shadow-cyan-500/20 font-semibold'
                : 'bg-dark-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            ]"
          >
            <component :is="getCategoryIcon(cat.id)" class="w-4 h-4" />
            <span>{{ cat.label }}</span>
            <span
              :class="[
                'text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold',
                selectedCategory === cat.id ? 'bg-dark-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
              ]"
            >
              {{ cat.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>

      <!-- Bottom Note for Recruiters / Companies -->
      <div class="mt-16 p-6 rounded-2xl bg-dark-900/60 border border-slate-800/80 text-center max-w-2xl mx-auto">
        <p class="text-sm text-slate-300 mb-3">
          ¿Buscas una solución a medida o deseas revisar el código fuente completo y los flujos exportados?
        </p>
        <div class="flex items-center justify-center gap-4">
          <a
            href="https://github.com/readmin803"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
          >
            Explorar repositorio en GitHub (@readmin803) →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
