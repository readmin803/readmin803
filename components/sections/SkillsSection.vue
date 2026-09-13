<script setup lang="ts">
import { SKILL_GROUPS } from '~/data/skills'
import { Layout, Server, Workflow } from 'lucide-vue-next'

const getGroupIcon = (icon: string) => {
  switch (icon) {
    case 'layout':
      return Layout
    case 'server':
      return Server
    case 'workflow':
      return Workflow
    default:
      return Layout
  }
}
</script>

<template>
  <section id="skills" class="py-24 bg-dark-900/40 border-y border-slate-800/60 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
          <Layout class="w-3.5 h-3.5" />
          <span>Stack &amp; Capacidades</span>
        </div>

        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Desarrollo Full Stack de punta a punta
        </h2>

        <p class="text-slate-400 text-base sm:text-lg">
          De la interfaz al backend, pasando por datos e integraciones. Versatilidad técnica para proyectos reales de empresa.
        </p>
      </div>

      <!-- Groups Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="group in SKILL_GROUPS"
          :key="group.title"
          class="rounded-2xl bg-dark-900/80 border border-slate-800/80 p-6 sm:p-7 hover:border-slate-700 transition-all duration-300 backdrop-blur-sm flex flex-col"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <component :is="getGroupIcon(group.icon)" class="w-5 h-5 text-cyan-400" />
            </div>
            <h3 class="text-lg font-bold text-white leading-tight">{{ group.title }}</h3>
          </div>

          <p class="text-slate-400 text-sm leading-relaxed mb-5">{{ group.description }}</p>

          <div class="mt-auto pt-4 border-t border-slate-800/70">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in group.items"
                :key="item"
                class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-dark-950/70 text-slate-300 border border-slate-800/80"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
