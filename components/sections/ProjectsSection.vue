<script setup lang="ts">
import { ref, computed } from 'vue'
import { PROJECTS } from '~/data/projects'
import {
  Workflow,
  Sparkles,
  Cpu,
  ChevronLeft,
  ChevronRight,
  FolderGit2,
  CheckCircle2,
  ExternalLink,
  Github,
  BookOpen,
  LayoutGrid
} from 'lucide-vue-next'

const currentIndex = ref(0)
const showAll = ref(false)

const currentProject = computed(() => PROJECTS[currentIndex.value])

const goPrev = () => {
  currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : PROJECTS.length - 1
}

const goNext = () => {
  currentIndex.value = currentIndex.value < PROJECTS.length - 1 ? currentIndex.value + 1 : 0
}

const goToProject = (index: number) => {
  currentIndex.value = index
  showAll.value = false
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'n8n': return Workflow
    case 'fullstack': return Sparkles
    case '2d-games': return Cpu
    default: return Workflow
  }
}

const getCategoryColor = (id: string) => {
  switch (id) {
    case 'n8n': return { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500/30', light: 'bg-emerald-500/10' }
    case 'fullstack': return { bg: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-500/30', light: 'bg-cyan-500/10' }
    case '2d-games': return { bg: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-500/30', light: 'bg-indigo-500/10' }
    default: return { bg: 'bg-slate-500', text: 'text-slate-600', border: 'border-slate-500/30', light: 'bg-slate-500/10' }
  }
}
</script>

<template>
  <section id="proyectos" class="py-24 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 text-xs font-mono font-medium">
          <FolderGit2 class="w-3.5 h-3.5" />
          <span>Casos de Estudio & Proyectos</span>
        </div>

        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Problemas reales, arquitectura clara y resultados medibles
        </h2>

        <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
          Cada proyecto detalla el problema, las decisiones de arquitectura y las métricas obtenidas.
        </p>
      </div>

      <!-- Main Layout: Dock Left + Content Right -->
      <div class="flex flex-col lg:flex-row gap-6">

        <!-- LEFT: Vertical Dock -->
        <div class="lg:w-20 xl:w-24 shrink-0">
          <div class="lg:flex lg:flex-col items-center gap-2 lg:py-4 px-2 lg:px-0 bg-slate-50/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl overflow-x-auto lg:overflow-x-visible">
            <!-- Mobile: horizontal scroll / Desktop: vertical column -->
            <div class="flex lg:flex-col items-center gap-2 p-2">
              <div
                v-for="(project, idx) in PROJECTS"
                :key="project.id"
                @click="goToProject(idx)"
                :class="[
                  'group relative flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 shrink-0',
                  idx === currentIndex ? 'scale-105' : 'scale-100 opacity-70 hover:opacity-100'
                ]"
              >
                <!-- Dock Icon -->
                <div
                  class="w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-200"
                  :class="[
                    idx === currentIndex
                      ? getCategoryColor(project.category).border + ' shadow-md'
                      : 'border-transparent bg-white/60',
                    'group-hover:shadow-md'
                  ]"
                  :style="idx === currentIndex ? { backgroundColor: getCategoryColor(project.category).bg + '20' } : {}"
                >
                  <component
                    :is="getCategoryIcon(project.category)"
                    class="w-5 h-5 lg:w-6 lg:h-6 transition-colors duration-200"
                    :class="idx === currentIndex ? getCategoryColor(project.category).text : 'text-slate-400'"
                  />
                </div>

                <!-- Label: hidden on mobile, visible on desktop -->
                <span
                  class="hidden lg:block text-[9px] font-mono font-medium text-center max-w-[70px] leading-tight transition-colors duration-200"
                  :class="idx === currentIndex ? 'text-slate-900 font-bold' : 'text-slate-500'"
                >
                  {{ project.title.split(' ').slice(0, 2).join(' ') }}
                </span>

                <!-- Color indicator bar -->
                <div
                  class="w-6 h-1 rounded-full transition-all duration-200"
                  :class="idx === currentIndex ? getCategoryColor(project.category).bg + ' opacity-100' : getCategoryColor(project.category).bg + ' opacity-30'"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: TV Window / All Projects -->
        <div class="flex-1 min-w-0">

          <!-- TV Window (single project view) -->
          <div v-if="!showAll" class="relative rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-xl">
            <!-- TV Category Strip -->
            <div class="flex items-center justify-between px-4 py-2 bg-white/80 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <component :is="getCategoryIcon(currentProject.category)" class="w-4 h-4" />
                <span class="text-xs font-mono font-medium text-slate-700">
                  {{ currentProject.categoryLabel }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-[11px] font-mono text-slate-500">
                  {{ currentIndex + 1 }} / {{ PROJECTS.length }}
                </span>
                <button
                  @click="showAll = true"
                  class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  title="Ver todos los proyectos"
                >
                  <LayoutGrid class="w-3.5 h-3.5" />
                  <span class="hidden sm:inline">Ver todos</span>
                </button>
              </div>
            </div>

            <!-- TV Content -->
            <div class="p-4 sm:p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <!-- Left: Project Info -->
                <div class="space-y-4">
                  <!-- Category badge with color -->
                  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border" :class="getCategoryColor(currentProject.category).light + ' ' + getCategoryColor(currentProject.category).border">
                    <span class="w-2 h-2 rounded-full" :class="getCategoryColor(currentProject.category).bg"></span>
                    <span class="text-xs font-mono font-semibold" :class="getCategoryColor(currentProject.category).text">
                      {{ currentProject.categoryLabel }}
                    </span>
                  </div>

                  <h3 class="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                    {{ currentProject.title }}
                  </h3>

                  <p class="text-slate-700 text-sm leading-relaxed">
                    {{ currentProject.fullDescription }}
                  </p>

                  <!-- Metrics -->
                  <div class="grid grid-cols-3 gap-2">
                    <div
                      v-for="metric in currentProject.metrics"
                      :key="metric.label"
                      class="p-2.5 rounded-xl bg-white border border-slate-200"
                    >
                      <span class="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider">{{ metric.label }}</span>
                      <p class="text-sm font-bold text-slate-900 mt-0.5">{{ metric.value }}</p>
                    </div>
                  </div>

                  <!-- Highlights -->
                  <ul class="space-y-1.5">
                    <li
                      v-for="(hl, idx) in currentProject.highlights"
                      :key="idx"
                      class="flex items-start gap-2 text-xs text-slate-700"
                    >
                      <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {{ hl }}
                    </li>
                  </ul>
                </div>

                <!-- Right: Image + Actions -->
                <div class="space-y-4">
                  <!-- Project Image -->
                  <img
                    v-if="currentProject.image"
                    :src="currentProject.image"
                    :alt="currentProject.title"
                    class="w-full h-40 sm:h-44 object-cover object-top rounded-xl border border-slate-200"
                  />
                  <div v-else class="w-full h-40 sm:h-44 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 border border-slate-200 flex items-center justify-center">
                    <component :is="getCategoryIcon(currentProject.category)" class="w-10 h-10 text-slate-400" />
                  </div>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in currentProject.tags"
                      :key="tag"
                      class="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200"
                    >
                      #{{ tag }}
                    </span>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex items-center gap-2 flex-wrap">
                    <a
                      v-if="currentProject.githubUrl"
                      :href="currentProject.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                      title="Ver código en GitHub"
                    >
                      <Github class="w-3.5 h-3.5" />
                      Código
                    </a>
                    <a
                      v-if="currentProject.readmeUrl"
                      :href="currentProject.readmeUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                      title="Leer documentación (README)"
                    >
                      <BookOpen class="w-3.5 h-3.5" />
                      README
                    </a>
                    <a
                      v-if="currentProject.demoUrl"
                      :href="currentProject.demoUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white transition-all"
                      title="Ver demo en vivo"
                    >
                      <ExternalLink class="w-3.5 h-3.5" />
                      Probar
                    </a>
                  </div>
                </div>
              </div>

              <!-- TV Navigation -->
              <div class="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                <button
                  @click="goPrev"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  <ChevronLeft class="w-4 h-4" />
                  Anterior
                </button>
                <button
                  @click="showAll = true"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all lg:hidden"
                >
                  <LayoutGrid class="w-4 h-4" />
                  Ver todos
                </button>
                <button
                  @click="goNext"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-white transition-all"
                >
                  Siguiente
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- All Projects Grid -->
          <div v-else class="relative rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-xl">
            <div class="flex items-center justify-between px-4 py-2 bg-white/80 border-b border-slate-200">
              <span class="text-xs font-mono font-medium text-slate-700">Todos los proyectos</span>
              <button
                @click="showAll = false"
                class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft class="w-3.5 h-3.5" />
                Volver
              </button>
            </div>

            <div class="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="(project, idx) in PROJECTS"
                :key="project.id"
                @click="goToProject(idx)"
                class="group cursor-pointer rounded-xl bg-white border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                :class="'hover:' + getCategoryColor(project.category).border.replace('border-', 'border-')"
              >
                <!-- Category color strip -->
                <div class="h-1.5" :class="getCategoryColor(project.category).bg"></div>

                <div class="p-4 space-y-3">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-lg flex items-center justify-center border"
                      :class="getCategoryColor(project.category).light + ' ' + getCategoryColor(project.category).border"
                    >
                      <component :is="getCategoryIcon(project.category)" class="w-4 h-4" :class="getCategoryColor(project.category).text" />
                    </div>
                    <span class="text-[10px] font-mono font-semibold" :class="getCategoryColor(project.category).text">
                      {{ project.categoryLabel }}
                    </span>
                  </div>

                  <h4 class="text-sm font-bold text-slate-900 leading-snug group-hover:text-cyan-600 transition-colors">
                    {{ project.title }}
                  </h4>

                  <p class="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {{ project.shortDescription }}
                  </p>

                  <div class="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                    <span
                      v-for="tag in project.tags.slice(0, 3)"
                      :key="tag"
                      class="px-1.5 py-0.5 rounded bg-slate-100"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Note -->
      <div class="mt-10 p-6 rounded-2xl bg-white border border-slate-200 text-center max-w-2xl mx-auto">
        <p class="text-sm text-slate-700 mb-3">
          ¿Buscas una solución a medida o quieres revisar el código fuente?
        </p>
        <a
          href="https://github.com/readmin803"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs sm:text-sm font-semibold text-cyan-700 hover:text-cyan-600 underline underline-offset-4"
        >
          Explorar repositorio en GitHub (@readmin803) →
        </a>
      </div>
    </div>
  </section>
</template>
