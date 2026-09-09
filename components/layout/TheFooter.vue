<script setup lang="ts">
import { Github, Mail, ArrowUpRight, Heart } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-dark-950 border-t border-slate-800/80 pt-16 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800/70">
        <!-- Brand identity -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-xl font-bold font-mono text-white">
              <span class="text-cyan-400 font-extrabold">[re]</span>admin
            </span>
            <span class="text-xs text-slate-500 font-mono">/ readmin803</span>
          </div>
          <p class="text-sm text-slate-400 max-w-sm leading-relaxed">
            Raúl Engracia. Portafolio técnico orientado a impacto: automatizaciones con n8n, frontend Next.js de máximo rendimiento (SEO & GEO), y aplicaciones empresariales en PHP.
          </p>
          <div class="flex items-center gap-2 pt-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Vercel Ready
            </span>
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Nuxt 3 + Tailwind
            </span>
          </div>
        </div>

        <!-- Navigation shortcuts -->
        <div class="space-y-3">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">Apartados</h4>
          <ul class="space-y-2 text-sm text-slate-400">
            <li>
              <a href="#proyectos" class="hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                Automatizaciones n8n
              </a>
            </li>
            <li>
              <a href="#proyectos" class="hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                Next.js & Optimización SEO / GEO
              </a>
            </li>
            <li>
              <a href="#proyectos" class="hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                Desarrollo Backend PHP
              </a>
            </li>
            <li>
              <a href="#skills" class="hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                Stack Tecnológico
              </a>
            </li>
            <li>
              <a href="#sobre-mi" class="hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                Sobre Raúl Engracia
              </a>
            </li>
          </ul>
        </div>

        <!-- Social and contact -->
        <div class="space-y-3">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">Conectar</h4>
          <p class="text-sm text-slate-400">
            Abierto a conversar sobre oportunidades laborales, consultoría técnica y desarrollo de proyectos.
          </p>
          <div class="flex flex-col gap-2 pt-1">
            <a
              href="https://github.com/readmin803"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors group"
            >
              <Github class="w-4 h-4 text-slate-400 group-hover:text-white" />
              <span>github.com/readmin803</span>
              <ArrowUpRight class="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
            </a>
            <a
              href="mailto:raulengracia@example.com"
              class="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors group"
            >
              <Mail class="w-4 h-4 text-slate-400 group-hover:text-white" />
              <span>Contacto por email</span>
              <ArrowUpRight class="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom footer -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {{ currentYear }} Raúl Engracia (readmin). Todos los derechos reservados.</p>
        <p class="flex items-center gap-1">
          Construido con enfoque en rendimiento, arquitectura limpia y código escalable.
        </p>
      </div>
    </div>
  </footer>
</template>
