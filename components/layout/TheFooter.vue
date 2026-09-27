<script setup lang="ts">
import { Github, Mail, ArrowUpRight } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-slate-50 border-t border-slate-200/80 pt-16 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-200/70">
        <!-- Brand identity -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-xl font-bold font-mono text-slate-900">
              <span class="text-cyan-400 font-extrabold">[re]</span>admin
            </span>
            <span class="text-xs text-slate-500 font-mono">/ readmin803</span>
          </div>
<p class="text-sm text-slate-600 max-w-sm leading-relaxed">
             Raúl E. · Automatización, desarrollo web fullstack y administración de sistemas.
           </p>
          <div class="flex flex-wrap items-center gap-1.5 pt-2">
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-orange-500/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span>HTML
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-purple-500/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>PHP
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-blue-500/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>CSS
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-cyan-500/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>SQL
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-yellow-500/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>JAVASCRIPT
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-emerald-500/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>PYTHON
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-slate-500/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span>BASH / POWERSHELL
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-amber-600/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>ZPL
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-indigo-500/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>VUE 3 · NUXT 3
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-rose-500/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>NAVISION / C-AL
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 border border-teal-500/30 text-[11px] font-medium text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span>N8N · MAKE
            </span>
          </div>
        </div>

        <!-- Navigation shortcuts -->
        <div class="space-y-3">
<h4 class="text-sm font-semibold uppercase tracking-wider text-slate-700 font-mono">Secciones</h4>
            <ul class="space-y-2 text-sm text-slate-600">
              <li>
                <a href="#proyectos" class="hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                  Todos los Proyectos
                </a>
              </li>
              
              <li>
                <a href="#contacto" class="hover:text-cyan-600 transition-colors inline-flex items-center gap-1">
                  Contacto
                </a>
              </li>
            </ul>
        </div>

        <!-- Social and contact -->
        <div class="space-y-3">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-slate-700 font-mono">Conectar</h4>
          <p class="text-sm text-slate-600">
            Abierto a conversar sobre oportunidades laborales, consultoría técnica y desarrollo de proyectos.
          </p>
          <div class="flex flex-col gap-2 pt-1">
<a
               href="https://github.com/readmin803"
               target="_blank"
               rel="noopener noreferrer"
               class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/70 border border-transparent text-slate-700 hover:border-emerald-500/40 hover:text-emerald-700 hover:bg-emerald-500/10 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
             >
               <Github class="w-4 h-4" />
               <span>github.com/readmin803</span>
               <ArrowUpRight class="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600" />
             </a>
<a
               href="mailto:readmin803@gmail.com"
               class="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900 transition-colors group"
             >
               <Mail class="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
               <span>Enviar correo</span>
               <ArrowUpRight class="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-900" />
             </a>
          </div>
        </div>
      </div>

      <!-- Bottom footer -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {{ currentYear }} Raúl E. (readmin). Todos los derechos reservados.</p>
        <p class="flex items-center gap-1">
          Construido con enfoque en rendimiento, arquitectura limpia y código escalable.
        </p>
      </div>
    </div>
  </footer>
</template>
