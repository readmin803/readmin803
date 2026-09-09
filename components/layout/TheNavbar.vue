<script setup lang="ts">
import { ref } from 'vue'
import {
  Github,
  Menu,
  X,
  Code2
} from 'lucide-vue-next'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const navLinks = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Stack Técnico', href: '#skills' }
]
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-md border-b border-slate-800/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Brand Logo -->
        <a href="#" class="flex items-center gap-3 group focus:outline-none">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <Code2 class="w-5 h-5 text-white" />
          </div>
          <div class="flex flex-col">
            <span class="text-lg font-bold text-white tracking-tight flex items-center font-mono">
              <span class="text-cyan-400 font-extrabold">[re]</span>admin
            </span>
            <span class="text-[11px] font-mono text-slate-400">
              @readmin803
            </span>
          </div>
        </a>

        <!-- Desktop Navigation: only Proyectos and Stack Técnico -->
        <nav class="hidden md:flex items-center gap-2">
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60 rounded-lg transition-colors"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- Right CTAs: GitHub profile only -->
        <div class="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/readmin803"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 rounded-lg border border-slate-800 hover:border-slate-700 transition-all"
            title="Ver GitHub @readmin803"
          >
            <Github class="w-4 h-4" />
            <span class="font-mono text-xs">github.com/readmin803</span>
          </a>
        </div>

        <!-- Mobile Hamburger Button -->
        <div class="flex md:hidden items-center gap-2">
          <a
            href="https://github.com/readmin803"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 text-slate-300 hover:text-white"
          >
            <Github class="w-5 h-5" />
          </a>
          <button
            @click="toggleMobileMenu"
            class="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Abrir menú"
          >
            <component :is="isMobileMenuOpen ? X : Menu" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-dark-900/95 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2 backdrop-blur-xl"
      >
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          @click="closeMobileMenu"
          class="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800/60"
        >
          {{ link.label }}
        </a>
        <div class="pt-2 border-t border-slate-800">
          <a
            href="https://github.com/readmin803"
            target="_blank"
            rel="noopener noreferrer"
            @click="closeMobileMenu"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700"
          >
            <Github class="w-4 h-4" />
            <span>@readmin803</span>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
