<script setup lang="ts">
import { ref } from 'vue'
import {
  Mail,
  FileDown,
  Github,
  Send,
  CheckCircle2,
  Copy,
  MessageSquareCode
} from 'lucide-vue-next'

const copiedEmail = ref(false)
const contactEmail = 'raulengracia@example.com' // Placeholder para que Raúl lo personalice

const formState = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(contactEmail)
    copiedEmail.value = true
    setTimeout(() => {
      copiedEmail.value = false
    }, 2500)
  } catch (err) {
    console.error('Error al copiar', err)
  }
}

const handleSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    // Crear enlace mailto directo con los datos completados
    const subject = encodeURIComponent(formState.value.subject || 'Oportunidad / Consulta técnica desde el Portafolio')
    const body = encodeURIComponent(`Hola Raúl,\n\nNombre: ${formState.value.name}\nEmail: ${formState.value.email}\n\nMensaje:\n${formState.value.message}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
  }, 600)
}
</script>

<template>
  <section id="contacto" class="py-24 bg-dark-900/50 border-t border-slate-800/80 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Section Header -->
        <div class="text-center space-y-4 mb-14">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium">
            <MessageSquareCode class="w-3.5 h-3.5" />
            <span>Contacto Directo & CV</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¿Hablamos sobre un proyecto o vacante técnica?
          </h2>

          <p class="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Estoy disponible para contrataciones, colaboraciones y retos técnicos en automatizaciones n8n, desarrollo web Next.js y aplicaciones PHP.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <!-- Left: Direct Info & CV Download -->
          <div class="md:col-span-5 space-y-4">
            <!-- CV Card -->
            <div class="p-6 rounded-2xl bg-gradient-to-br from-dark-900 to-dark-850 border border-slate-800 shadow-xl space-y-4">
              <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FileDown class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">Currículum Vitae</h3>
                <p class="text-xs text-slate-400 mt-1">
                  Descarga mi trayectoria profesional completa, experiencia previa y detalles técnicos en formato PDF.
                </p>
              </div>

              <!-- Button download CV -->
              <a
                href="/cv-placeholder.pdf"
                download="CV_Raul_Engracia_readmin.pdf"
                class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-dark-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-md shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileDown class="w-4 h-4" />
                <span>Descargar CV en PDF</span>
              </a>

              <p class="text-[11px] text-slate-500 text-center font-mono">
                Actualizado para 2025/2026
              </p>
            </div>

            <!-- GitHub Profile Card -->
            <div class="p-5 rounded-2xl bg-dark-900/90 border border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2.5 rounded-xl bg-slate-800 text-slate-200">
                  <Github class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white">GitHub Oficial</h4>
                  <p class="text-xs text-slate-400 font-mono">@readmin803</p>
                </div>
              </div>
              <a
                href="https://github.com/readmin803"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors"
              >
                Visitar
              </a>
            </div>

            <!-- Email Quick Copy -->
            <div class="p-5 rounded-2xl bg-dark-900/90 border border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-3 truncate mr-2">
                <div class="p-2.5 rounded-xl bg-slate-800 text-slate-200 shrink-0">
                  <Mail class="w-5 h-5" />
                </div>
                <div class="truncate">
                  <h4 class="text-sm font-bold text-white">Email</h4>
                  <p class="text-xs text-slate-400 truncate">{{ contactEmail }}</p>
                </div>
              </div>
              <button
                @click="copyToClipboard"
                class="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1.5 transition-colors"
                :title="copiedEmail ? '¡Copiado!' : 'Copiar email al portapapeles'"
              >
                <component :is="copiedEmail ? CheckCircle2 : Copy" :class="['w-3.5 h-3.5', copiedEmail ? 'text-emerald-400' : '']" />
                <span>{{ copiedEmail ? 'Copiado' : 'Copiar' }}</span>
              </button>
            </div>
          </div>

          <!-- Right: Interactive Contact Form -->
          <div class="md:col-span-7">
            <div class="p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-slate-800 shadow-xl backdrop-blur-sm">
              <h3 class="text-lg font-bold text-white mb-2">Enviar un mensaje directo</h3>
              <p class="text-xs sm:text-sm text-slate-400 mb-6">
                Completa el formulario y se preparará tu consulta técnica directamente en tu gestor de correo preferido.
              </p>

              <div v-if="isSubmitted" class="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 class="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 class="text-sm font-bold text-white">¡Mensaje preparado!</h4>
                <p class="text-xs text-slate-300">
                  Se ha abierto tu cliente de correo para enviar la consulta a Raúl Engracia.
                </p>
                <button
                  @click="isSubmitted = false"
                  class="mt-3 text-xs text-cyan-400 hover:underline font-mono"
                >
                  Enviar otro mensaje
                </button>
              </div>

              <form v-else @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                  <label for="name" class="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Tu nombre o empresa *
                  </label>
                  <input
                    id="name"
                    v-model="formState.name"
                    type="text"
                    required
                    placeholder="Ej. Tech Solutions / Equipo de Selección"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label for="email" class="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Correo electrónico de contacto *
                  </label>
                  <input
                    id="email"
                    v-model="formState.email"
                    type="email"
                    required
                    placeholder="nombre@empresa.com"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label for="subject" class="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Asunto o Tipo de Proyecto
                  </label>
                  <input
                    id="subject"
                    v-model="formState.subject"
                    type="text"
                    placeholder="Ej. Proyecto automatización n8n / Vacante Fullstack"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label for="message" class="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Detalles del mensaje *
                  </label>
                  <textarea
                    id="message"
                    v-model="formState.message"
                    required
                    rows="4"
                    placeholder="Cuéntame brevemente sobre tu proyecto, las integraciones necesarias o los requisitos técnicos..."
                    class="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 transition-all shadow-md shadow-cyan-600/20 disabled:opacity-50"
                >
                  <Send class="w-4 h-4" />
                  <span>{{ isSubmitting ? 'Preparando...' : 'Enviar Consulta a Raúl Engracia' }}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
