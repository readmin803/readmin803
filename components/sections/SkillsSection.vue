<script setup lang="ts">
import { SKILL_CATEGORIES } from '~/data/skills'
import {
  Workflow,
  Layout,
  Server,
  Terminal,
  Cpu,
  CheckCircle,
  Code
} from 'lucide-vue-next'

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Workflow':
      return Workflow
    case 'Layout':
      return Layout
    case 'Server':
      return Server
    case 'Terminal':
      return Terminal
    default:
      return Cpu
  }
}
</script>

<template>
  <section id="skills" class="py-24 bg-dark-900/40 border-y border-slate-800/60 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
          <Code class="w-3.5 h-3.5" />
          <span>Competencias & Tecnologías</span>
        </div>

        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Stack Tecnológico y Capacidades Clave
        </h2>

        <p class="text-slate-400 text-base sm:text-lg">
          Un enfoque técnico versátil que cubre el ciclo completo: desde la concepción del frontend hasta la infraestructura, pasando por la orquestación inteligente de procesos.
        </p>
      </div>

      <!-- Skills Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="category in SKILL_CATEGORIES"
          :key="category.title"
          class="rounded-2xl bg-dark-900/80 border border-slate-800/80 p-6 sm:p-7 hover:border-slate-700 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
        >
          <div>
            <!-- Category Header -->
            <div class="flex items-center gap-3 mb-3">
              <div
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center border',
                  category.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : '',
                  category.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : '',
                  category.color === 'indigo' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : '',
                  category.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : ''
                ]"
              >
                <component :is="getCategoryIcon(category.icon)" class="w-5 h-5" />
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-white">
                {{ category.title }}
              </h3>
            </div>

            <p class="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
              {{ category.description }}
            </p>

            <!-- Skills List -->
            <div class="flex flex-wrap gap-2">
              <div
                v-for="skill in category.skills"
                :key="skill.name"
                :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all',
                  skill.highlight
                    ? 'bg-slate-800 text-slate-100 border border-slate-600/80 shadow-sm'
                    : 'bg-dark-950/70 text-slate-300 border border-slate-800/80'
                ]"
              >
                <CheckCircle v-if="skill.highlight" class="w-3.5 h-3.5 text-cyan-400" />
                <span class="font-medium">{{ skill.name }}</span>
                <span class="text-[10px] text-slate-400 font-sans">({{ skill.level }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
