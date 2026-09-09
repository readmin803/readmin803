<script setup lang="ts">
import { Github, ArrowUpRight } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-dark-950 border-t border-slate-800/80 pt-12 pb-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/70">
        <!-- Brand identity -->
        <div class="space-y-2 text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start gap-2">
            <span class="text-xl font-bold font-mono text-white">
              <span class="text-cyan-400 font-extrabold">[re]</span>admin
            </span>
            <span class="text-xs text-slate-500 font-mono">/ readmin803</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 max-w-md">
            Portafolio técnico personal: automatizaciones n8n, frontend Next.js (SEO & GEO) y backend en PHP.
          </p>
        </div>

        <!-- Navigation shortcuts -->
        <div class="flex items-center gap-6 text-sm text-slate-400">
          <a href="#proyectos" class="hover:text-cyan-400 transition-colors">
            Proyectos
          </a>
          <a href="#skills" class="hover:text-cyan-400 transition-colors">
            Stack Tecnológico
          </a>
          <a
            href="https://github.com/readmin803"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 font-mono text-xs"
          >
            <Github class="w-4 h-4" />
            <span>GitHub</span>
            <ArrowUpRight class="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>
      </div>

      <!-- Bottom footer -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {{ currentYear }} readmin (@readmin803).</p>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Nuxt 3 + Tailwind CSS
          </span>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Vercel Ready
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
