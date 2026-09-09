<script setup lang="ts">
import type { ProjectItem } from '~/data/projects'
import {
  ExternalLink,
  Github,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-vue-next'

const props = defineProps<{
  project: ProjectItem
}>()

const showFullDetails = ref(false)

const toggleDetails = () => {
  showFullDetails.value = !showFullDetails.value
}

// Category visual styles
const borderAccent = computed(() => {
  switch (props.project.category) {
    case 'n8n':
      return 'group-hover:border-emerald-500/50 hover:shadow-emerald-950/40'
    case 'nextjs-seo':
      return 'group-hover:border-cyan-500/50 hover:shadow-cyan-950/40'
    case 'php':
      return 'group-hover:border-indigo-500/50 hover:shadow-indigo-950/40'
    default:
      return 'group-hover:border-slate-500/50 hover:shadow-slate-900/40'
  }
})

const badgeTheme = computed(() => {
  switch (props.project.category) {
    case 'n8n':
      return 'emerald'
    case 'nextjs-seo':
      return 'cyan'
    case 'php':
      return 'indigo'
    default:
      return 'slate'
  }
})
</script>

<template>
  <div
    :class="[
      'group relative flex flex-col justify-between rounded-2xl bg-dark-900/90 border border-slate-800/80 p-6 md:p-7 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1',
      borderAccent
    ]"
  >
    <!-- Top info: category, role & status -->
    <div>
      <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div class="flex items-center gap-2">
          <span
            :class="[
              'px-3 py-1 text-xs font-mono font-semibold rounded-full border',
              badgeTheme === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : '',
              badgeTheme === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : '',
              badgeTheme === 'indigo' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : '',
              badgeTheme === 'slate' ? 'bg-slate-800 text-slate-300 border-slate-700' : ''
            ]"
          >
            {{ project.categoryLabel }}
          </span>

          <span
            v-if="project.featured"
            class="flex items-center gap-1.5 text-xs font-medium text-amber-400/90 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Caso Destacado
          </span>
        </div>

        <!-- Role badge when present -->
        <span
          v-if="project.role"
          class="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/50"
        >
          <Briefcase class="w-3.5 h-3.5 text-cyan-400" />
          <span>{{ project.role }}</span>
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200 mb-3 leading-snug">
        {{ project.title }}
      </h3>

      <!-- Description -->
      <p class="text-slate-300/90 text-sm md:text-base leading-relaxed mb-5">
        {{ project.shortDescription }}
      </p>

      <!-- Key metrics highlight pill -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5 p-3 rounded-xl bg-dark-950/70 border border-slate-800/70">
        <div
          v-for="metric in project.metrics"
          :key="metric.label"
          class="flex flex-col"
        >
          <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{{ metric.label }}</span>
          <span class="text-sm md:text-base font-bold text-white font-mono flex items-center gap-1">
            <TrendingUp class="w-3.5 h-3.5 text-cyan-400 inline" />
            {{ metric.value }}
          </span>
        </div>
      </div>

      <!-- Highlights list -->
      <ul class="space-y-2 mb-5">
        <li
          v-for="(hl, index) in project.highlights"
          :key="index"
          class="flex items-start gap-2 text-xs md:text-sm text-slate-300"
        >
          <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{{ hl }}</span>
        </li>
      </ul>

      <!-- Architecture note -->
      <div v-if="project.architectureNote" class="mb-5">
        <div class="inline-flex items-center gap-2 text-xs text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
          <Cpu class="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span class="truncate">{{ project.architectureNote }}</span>
        </div>
      </div>

      <!-- Extended description / Detailed Sections (collapsible) -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="showFullDetails" class="mb-6 space-y-4">
          <!-- Overview text -->
          <div class="p-4 rounded-xl bg-dark-950/90 border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed">
            <p class="font-semibold text-white mb-1.5 flex items-center gap-1.5">
              <Sparkles class="w-4 h-4 text-cyan-400" />
              <span>Contexto del Proyecto & Reto Técnico:</span>
            </p>
            <p>{{ project.fullDescription }}</p>
          </div>

          <!-- Structured Detailed Sections when available -->
          <div v-if="project.detailedSections && project.detailedSections.length > 0" class="space-y-3">
            <div
              v-for="section in project.detailedSections"
              :key="section.title"
              class="p-4 rounded-xl bg-dark-950/70 border border-slate-800/80"
            >
              <h4 class="text-xs sm:text-sm font-bold text-cyan-300 mb-2.5">
                {{ section.title }}
              </h4>
              <ul class="space-y-2">
                <li
                  v-for="(item, idx) in section.items"
                  :key="idx"
                  class="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                >
                  <span class="text-cyan-400 font-bold mt-0.5">•</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Bottom: Tags and CTAs -->
    <div class="pt-4 border-t border-slate-800/80 mt-auto">
      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mb-5">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center justify-between gap-3">
        <button
          @click="toggleDetails"
          class="text-xs text-slate-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors font-medium"
        >
          <span>{{ showFullDetails ? 'Ocultar desglose' : 'Ver desglose completo' }}</span>
          <component :is="showFullDetails ? ChevronUp : ChevronDown" class="w-3.5 h-3.5" />
        </button>

        <div class="flex items-center gap-2">
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all"
            title="Ver código en GitHub"
          >
            <Github class="w-3.5 h-3.5" />
            <span>Código</span>
          </a>

          <a
            v-if="project.demoUrl"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-dark-950 transition-all shadow-sm shadow-cyan-500/20"
            title="Ver demo en vivo"
          >
            <ExternalLink class="w-3.5 h-3.5" />
            <span>Demo</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
