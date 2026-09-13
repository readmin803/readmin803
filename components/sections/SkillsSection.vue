<script setup lang="ts">
import { SKILL_PILLARS } from '~/data/skills'
import { Workflow, Code2, Database } from 'lucide-vue-next'

const getPillarIcon = (icon: string) => {
  switch (icon) {
    case 'workflow':
      return Workflow
    case 'code':
      return Code2
    case 'database':
      return Database
    default:
      return Code2
  }
}
</script>

<template>
  <section id="skills" class="py-24 bg-dark-900/40 border-y border-slate-800/60 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
          <Code2 class="w-3.5 h-3.5" />
          <span>Capacidades Clave</span>
        </div>

        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tres pilares técnicos
        </h2>

        <p class="text-slate-400 text-base sm:text-lg">
          Automatización, desarrollo web y administración de sistemas.
        </p>
      </div>

      <!-- Pillars Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="pillar in SKILL_PILLARS"
          :key="pillar.title"
          class="rounded-2xl bg-dark-900/80 border border-slate-800/80 p-6 sm:p-7 hover:border-slate-700 transition-all duration-300 backdrop-blur-sm flex flex-col"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <component :is="getPillarIcon(pillar.icon)" class="w-5 h-5 text-cyan-400" />
            </div>
            <h3 class="text-lg font-bold text-white leading-tight">{{ pillar.title }}</h3>
          </div>

          <p class="text-slate-400 text-sm leading-relaxed mb-5">{{ pillar.description }}</p>

          <div class="mt-auto pt-4 border-t border-slate-800/70">
            <span class="text-xs text-slate-300 font-mono leading-relaxed">{{ pillar.techs }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
