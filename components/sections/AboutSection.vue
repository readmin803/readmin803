<script setup lang="ts">
import {
  User,
  ShieldCheck,
  Zap,
  Bot,
  Gauge,
  Layers
} from 'lucide-vue-next'
</script>

<template>
  <section id="sobre-mi" class="py-24 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Left: Profile and Philosophy -->
        <div class="lg:col-span-6 space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <User class="w-3.5 h-3.5" />
            <span>Perfil Profesional</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Detrás de <span class="font-mono text-cyan-400">[re]admin</span>: Raúl Engracia
          </h2>

          <div class="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              El alias <strong class="text-white font-mono font-semibold">readmin</strong> nace de la combinación de mi nombre (<span class="text-cyan-400 font-semibold font-mono">re</span>: Raúl Engracia) con la mentalidad de administración técnica de sistemas, arquitectura y control de procesos (<span class="text-indigo-400 font-semibold font-mono">admin</span>).
            </p>
            <p>
              Mi propósito profesional es actuar como un puente entre la lógica de negocio y la ingeniería técnica: no se trata solo de escribir código, sino de <strong>construir activos digitales que generen rentabilidad y eficiencia</strong>.
            </p>
            <p>
              Me especializo en identificar cuellos de botella manuales en empresas y convertirlos en <strong>flujos automatizados autónomos con n8n</strong>; al mismo tiempo que desarrollo portales web en <strong>Next.js</strong> que no solo deslumbran a los usuarios por su velocidad, sino que se posicionan orgánicamente tanto en los motores de búsqueda convencionales como en la nueva era de la IA generativa (GEO).
            </p>
          </div>

          <!-- Key Principles -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-xl bg-dark-900/80 border border-slate-800">
              <div class="flex items-center gap-2.5 mb-2">
                <Zap class="w-4 h-4 text-amber-400" />
                <h4 class="text-sm font-bold text-white">Rendimiento Primero</h4>
              </div>
              <p class="text-xs text-slate-400">
                Cada milisegundo de carga cuenta. Priorización de recursos y Core Web Vitals al máximo nivel.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-dark-900/80 border border-slate-800">
              <div class="flex items-center gap-2.5 mb-2">
                <Bot class="w-4 h-4 text-emerald-400" />
                <h4 class="text-sm font-bold text-white">Automatización Pragmática</h4>
              </div>
              <p class="text-xs text-slate-400">
                Si una tarea se repite dos veces, es candidata a ser automatizada con n8n y webhooks.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-dark-900/80 border border-slate-800">
              <div class="flex items-center gap-2.5 mb-2">
                <Gauge class="w-4 h-4 text-cyan-400" />
                <h4 class="text-sm font-bold text-white">SEO & GEO de Vanguardia</h4>
              </div>
              <p class="text-xs text-slate-400">
                Estructuración de datos para que tu web sea citada por ChatGPT, Perplexity y Google.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-dark-900/80 border border-slate-800">
              <div class="flex items-center gap-2.5 mb-2">
                <Layers class="w-4 h-4 text-indigo-400" />
                <h4 class="text-sm font-bold text-white">Código Limpio y Mantenible</h4>
              </div>
              <p class="text-xs text-slate-400">
                Arquitectura escalable en PHP y TypeScript pensada para evolucionar a largo plazo.
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Developer Snapshot Card -->
        <div class="lg:col-span-6">
          <div class="rounded-2xl bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-slate-800 p-7 sm:p-8 shadow-2xl relative">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-mono font-bold text-2xl text-white shadow-lg shadow-cyan-500/20">
                RE
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Raúl Engracia</h3>
                <p class="text-xs font-mono text-cyan-400">@readmin803 · Lead Frontend & Technical SEO Engineer</p>
                <p class="text-xs text-slate-400">Valencia / Remoto (Disponibilidad internacional)</p>
              </div>
            </div>

            <div class="space-y-4 text-xs font-mono border-t border-slate-800 pt-5">
              <div class="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span class="text-slate-400">Especialidad Principal</span>
                <span class="text-white font-semibold">Next.js 16, Sanity, n8n & PHP</span>
              </div>
              <div class="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span class="text-slate-400">Control de Versiones</span>
                <a href="https://github.com/readmin803" target="_blank" class="text-cyan-400 hover:underline">github.com/readmin803</a>
              </div>
              <div class="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span class="text-slate-400">Despliegue & Hosting</span>
                <span class="text-white font-semibold">Vercel / Docker / Cloud</span>
              </div>
              <div class="flex items-center justify-between py-1">
                <span class="text-slate-400">Disponibilidad</span>
                <span class="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  Inmediata / Contratación
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
