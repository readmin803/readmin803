<script setup lang="ts">
import {
  User,
  Workflow,
  Code2,
  Database
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
            Detrás de <span class="font-mono text-cyan-400">[re]admin</span>: Raúl E.
          </h2>

          <div class="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              El alias <strong class="text-white font-mono font-semibold">readmin</strong> combina mi nombre (<span class="text-cyan-400 font-semibold font-mono">re</span>: Raúl E.) con la administración técnica de sistemas y procesos (<span class="text-indigo-400 font-semibold font-mono">admin</span>).
            </p>
            <p>
              Trabajo en la intersección entre negocio e ingeniería: el código se justifica por el resultado que produce, no por la tecnología que usa.
            </p>
            <p>
              Detecto tareas manuales que cuestan horas y las convierto en flujos automatizados con n8n; desarrollo aplicaciones web completas y administro bases de datos y servidores.
            </p>
          </div>

          <!-- Key Principles -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div class="p-4 rounded-xl bg-dark-900/80 border border-slate-800">
              <div class="flex items-center gap-2.5 mb-2">
                <Workflow class="w-4 h-4 text-emerald-400" />
                <h4 class="text-sm font-bold text-white">Automatización</h4>
              </div>
              <p class="text-xs text-slate-400">
                Flujos n8n con reintentos y tolerancia a fallos que eliminan tareas manuales.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-dark-900/80 border border-slate-800">
              <div class="flex items-center gap-2.5 mb-2">
                <Code2 class="w-4 h-4 text-cyan-400" />
                <h4 class="text-sm font-bold text-white">Fullstack</h4>
              </div>
              <p class="text-xs text-slate-400">
                Aplicaciones completas con Vue 3, Nuxt 3 y JavaScript, de la interfaz al servidor.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-dark-900/80 border border-slate-800">
              <div class="flex items-center gap-2.5 mb-2">
                <Database class="w-4 h-4 text-indigo-400" />
                <h4 class="text-sm font-bold text-white">Sistemas</h4>
              </div>
              <p class="text-xs text-slate-400">
                Bases de datos, contenedores Docker y mantenimiento de programas técnicos.
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
                <h3 class="text-xl font-bold text-white">Raúl E.</h3>
                <p class="text-xs font-mono text-cyan-400">@readmin803 · Fullstack · Automatización & Sistemas</p>
                <p class="text-xs text-slate-400">Valencia / Remoto (Disponibilidad internacional)</p>
              </div>
            </div>

            <div class="space-y-4 text-xs font-mono border-t border-slate-800 pt-5">
              <div class="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span class="text-slate-400">Enfoque</span>
                <span class="text-white font-semibold">Automatización · Web · Sistemas</span>
              </div>
              <div class="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span class="text-slate-400">Stack principal</span>
                <span class="text-white font-semibold">n8n · Vue 3 · Nuxt 3 · Docker</span>
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
