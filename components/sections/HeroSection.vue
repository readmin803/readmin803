<script setup lang="ts">
import {
  ArrowDown,
  Sparkles,
  Github,
  Cpu,
  Workflow,
  Search
} from 'lucide-vue-next'
</script>

<template>
  <section class="relative min-h-[80vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
    <!-- Background atmospheric glow effects -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-cyan-500/15 blur-[130px] rounded-full"></div>
      <div class="absolute top-1/3 -left-32 w-[450px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full"></div>
      <div class="absolute top-1/2 -right-32 w-[450px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full"></div>
      <!-- Subtle grid background overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <!-- Left: Hero Copy -->
        <div class="lg:col-span-7 text-center lg:text-left space-y-6">
          <!-- Status pill -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900 border border-slate-700/70 shadow-inner">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span class="text-xs font-mono font-medium text-slate-300">
              <span class="text-cyan-400 font-semibold">[re]admin</span> · @readmin803
            </span>
          </div>

          <!-- Main headline -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Automatizaciones con <span class="gradient-text-cyan">n8n</span>, páginas web con <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">SEO & IA</span> y backend en <span class="gradient-text-purple">PHP</span>.
          </h1>

          <!-- Subtitle / Bio -->
          <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Portafolio técnico de <strong class="text-white font-mono">[re]admin</strong>. Una muestra directa de proyectos enfocados en flujos de trabajo autónomos, arquitecturas web de alto rendimiento con optimización para motores de IA (GEO) y desarrollo backend estructurado.
          </p>

          <!-- Core Value Badges -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300">
              <Workflow class="w-4 h-4 text-emerald-400" />
              <span>Flujos n8n</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300">
              <Search class="w-4 h-4 text-cyan-400" />
              <span>Next.js · SEO & GEO</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300">
              <Cpu class="w-4 h-4 text-indigo-400" />
              <span>Backend PHP</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <a
              href="#proyectos"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-dark-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explorar Proyectos</span>
              <ArrowDown class="w-4 h-4" />
            </a>

            <a
              href="https://github.com/readmin803"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all hover:scale-[1.02]"
            >
              <Github class="w-4 h-4 text-cyan-400" />
              <span>github.com/readmin803</span>
            </a>
          </div>
        </div>

        <!-- Right: Terminal Snapshot -->
        <div class="lg:col-span-5">
          <div class="relative rounded-2xl bg-dark-900/90 border border-slate-800 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
            <!-- Terminal Header -->
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 font-mono text-xs text-slate-400">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                <span class="ml-2 text-slate-400">readmin@portfolio:~</span>
              </div>
              <span class="text-[11px] text-cyan-400/80 font-mono">readmin803</span>
            </div>

            <!-- Terminal Body -->
            <div class="space-y-4 font-mono text-xs sm:text-sm">
              <div class="space-y-1">
                <p class="text-slate-400">
                  <span class="text-emerald-400 font-semibold">$</span> whoami
                </p>
                <p class="text-slate-200">
                  <span class="text-cyan-400 font-bold">readmin</span> · @readmin803
                </p>
                <p class="text-slate-400 text-xs">
                  Repo: <a href="https://github.com/readmin803" target="_blank" class="text-indigo-400 underline hover:text-indigo-300">github.com/readmin803</a>
                </p>
              </div>

              <!-- Live KPI Highlights -->
              <div class="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800/80 space-y-2.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-400 flex items-center gap-1.5">
                    <Workflow class="w-3.5 h-3.5 text-emerald-400" />
                    n8n Automatizaciones
                  </span>
                  <span class="text-emerald-400 font-semibold font-mono">Workflows & APIs</span>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-400 flex items-center gap-1.5">
                    <Sparkles class="w-3.5 h-3.5 text-cyan-400" />
                    Next.js & Sanity.io
                  </span>
                  <span class="text-cyan-400 font-semibold font-mono">App Router / Headless</span>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-400 flex items-center gap-1.5">
                    <Search class="w-3.5 h-3.5 text-amber-400" />
                    SEO Técnico & GEO
                  </span>
                  <span class="text-amber-400 font-semibold font-mono">Schema JSON-LD & IA</span>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-400 flex items-center gap-1.5">
                    <Cpu class="w-3.5 h-3.5 text-indigo-400" />
                    PHP Backend
                  </span>
                  <span class="text-indigo-400 font-semibold font-mono">OOP / MVC / APIs</span>
                </div>
              </div>

              <div class="space-y-1">
                <p class="text-slate-400">
                  <span class="text-emerald-400 font-semibold">$</span> cat stack.txt
                </p>
                <p class="text-slate-300 text-xs leading-relaxed bg-dark-950/60 p-2.5 rounded-lg border border-slate-800/50">
                  Next.js 16 · n8n · Sanity.io · TypeScript · PHP · Tailwind CSS · Vercel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
