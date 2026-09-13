<script setup lang="ts">
import { ref } from 'vue'
import {
  Github,
  Send,
  CheckCircle2
} from 'lucide-vue-next'

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const formState = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    const subject = encodeURIComponent(formState.value.subject || 'Oportunidad / Consulta técnica desde el Portafolio')
    const body = encodeURIComponent(`Hola,\n\nNombre: ${formState.value.name}\nEmail: ${formState.value.email}\n\nMensaje:\n${formState.value.message}`)
    window.location.href = `mailto:${body}`
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
            <span>Contacto Directo</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¿Hablamos sobre un proyecto o vacante?
          </h2>

          <p class="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Estoy disponible para contrataciones, colaboraciones y retos técnicos.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 items-start">
          <!-- Right: Interactive Contact Form -->
          <div class="md:col-span-8 mx-auto">
            <div class="p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-slate-800 shadow-xl backdrop-blur-sm">
              <h3 class="text-lg font-bold text-white mb-2">Enviar un mensaje</h3>
              <p class="text-xs sm:text-sm text-slate-400 mb-6">
                Completa el formulario y se preparará tu consulta.
              </p>

              <div v-if="isSubmitted" class="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 class="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 class="text-sm font-bold text-white">¡Mensaje preparado!</h4>
                <p class="text-xs text-slate-300">
                  Se abrirá tu cliente de correo.
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
                    Tu nombre *
                  </label>
                  <input
                    id="name"
                    v-model="formState.name"
                    type="text"
                    required
                    placeholder="Tu nombre o empresa"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label for="email" class="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Correo electrónico *
                  </label>
                  <input
                    id="email"
                    v-model="formState.email"
                    type="email"
                    required
                    placeholder="Tu email"
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
                    placeholder="Ej. Proyecto de desarrollo / Automatización"
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
                    placeholder="Cuéntame sobre tu proyecto o las integraciones necesarias"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 transition-all shadow-md shadow-cyan-600/20 disabled:opacity-50"
                >
                  <Send class="w-4 h-4" />
                  <span>{{ isSubmitting ? 'Preparando...' : 'Enviar Consulta' }}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
