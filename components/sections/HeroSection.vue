<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import {
  ArrowDown,
  Github,
  Workflow,
  Code2,
  Server,
  FileText,
  FolderOpen,
  Save,
  Printer,
  Undo2,
  Redo2,
  Scissors,
  Copy,
  Clipboard,
  Search,
  Replace,
  X,
  Check,
  ChevronUp,
  ChevronDown,
  Pencil
} from 'lucide-vue-next'

const isMinimized = ref(false)
const isMaximized = ref(false)
const isCopied = ref(false)
const isModified = ref(false)

const fileName = ref('stack.txt')
const statusMessage = ref('')

const toLines = (text: string) => text.replace(/\r\n/g, '\n').split('\n')

// Contenido vivo desde el repo (data/stack.txt) via servidor
const { data: stackData } = await useFetch<{ content: string }>('/api/stack', { server: true })

const initialContent = typeof stackData.value?.content === 'string' && stackData.value.content
  ? stackData.value.content
  : 'No se pudo cargar data/stack.txt'

const lines = ref<string[]>(toLines(initialContent))

const history = ref<string[][]>([])
const future = ref<string[][]>([])

const currentLines = computed(() => lines.value)

const findOpen = ref(false)
const replaceOpen = ref(false)
const findQuery = ref('')
const replaceQuery = ref('')
const matchIndex = ref(0)
const findInput = ref<HTMLInputElement | null>(null)

type Hit = { line: number; start: number; end: number }

const matches = computed<Hit[]>(() => {
  const q = findQuery.value
  if (!findOpen.value || !q) return []
  const needle = q.toLowerCase()
  const res: Hit[] = []
  lines.value.forEach((line, i) => {
    const hay = line.toLowerCase()
    let from = hay.indexOf(needle)
    while (from !== -1) {
      res.push({ line: i, start: from, end: from + q.length })
      from = hay.indexOf(needle, from + q.length)
    }
  })
  return res
})

const totalMatches = computed(() => matches.value.length)
const currentHit = computed<Hit | null>(() => matches.value[matchIndex.value] ?? null)
const matchLabel = computed(() =>
  totalMatches.value ? `${Math.min(matchIndex.value + 1, totalMatches.value)}/${totalMatches.value}` : '0/0'
)

watch(matches, () => {
  matchIndex.value = 0
})

const refreshStatus = () => {
  statusMessage.value = `${fileName.value} [UTF-8]  •  ${isModified.value ? 'Modificado' : 'Solo lectura'}`
}
refreshStatus()

const flashStatus = (msg: string) => {
  statusMessage.value = msg
  setTimeout(refreshStatus, 2500)
}

const markModified = () => {
  isModified.value = true
  refreshStatus()
}

const pushHistory = () => {
  history.value.push([...lines.value])
  if (history.value.length > 50) history.value.shift()
  future.value = []
}

const undo = () => {
  if (!history.value.length) return
  future.value.push([...lines.value])
  lines.value = history.value.pop() as string[]
  markModified()
}

const redo = () => {
  if (!future.value.length) return
  history.value.push([...lines.value])
  lines.value = future.value.pop() as string[]
  markModified()
}

const scrollToHit = () => {
  nextTick(() => {
    const hit = currentHit.value
    if (!hit) return
    document.getElementById('gedit-line-' + hit.line)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  })
}

const stepMatch = (dir: 1 | -1) => {
  if (!totalMatches.value) return
  matchIndex.value = (matchIndex.value + dir + totalMatches.value) % totalMatches.value
  scrollToHit()
}

const focusFind = () => {
  nextTick(() => findInput.value?.focus())
}

const toggleFind = () => {
  findOpen.value = true
  replaceOpen.value = false
  focusFind()
}

const toggleReplace = () => {
  findOpen.value = true
  replaceOpen.value = true
  focusFind()
}

const closeFind = () => {
  findOpen.value = false
  replaceOpen.value = false
  findQuery.value = ''
}

const doReplace = () => {
  const hit = currentHit.value
  if (!hit) return
  pushHistory()
  const line = lines.value[hit.line]
  lines.value.splice(hit.line, 1, line.slice(0, hit.start) + replaceQuery.value + line.slice(hit.end))
  markModified()
}

const doReplaceAll = () => {
  const hits = matches.value
  if (!hits.length) return
  pushHistory()
  const byLine = new Map<number, Hit[]>()
  hits.forEach(hit => {
    const bucket = byLine.get(hit.line) ?? []
    bucket.push(hit)
    byLine.set(hit.line, bucket)
  })
  byLine.forEach((bucket, lineIdx) => {
    let out = lines.value[lineIdx]
    for (let i = bucket.length - 1; i >= 0; i--) {
      out = out.slice(0, bucket[i].start) + replaceQuery.value + out.slice(bucket[i].end)
    }
    lines.value[lineIdx] = out
  })
  markModified()
}

const segments = (line: string, idx: number): { text: string; cls: string }[] => {
  if (!line) return [{ text: ' ', cls: '' }]
  const hits = matches.value.filter(hit => hit.line === idx)
  if (!hits.length) return [{ text: line, cls: '' }]
  const cur = currentHit.value
  const segs: { text: string; cls: string }[] = []
  let cursor = 0
  hits.forEach(hit => {
    if (hit.start > cursor) segs.push({ text: line.slice(cursor, hit.start), cls: '' })
    const isCurrent = !!cur && cur.line === hit.line && cur.start === hit.start
    segs.push({
      text: line.slice(hit.start, hit.end),
      cls: isCurrent ? 'bg-amber-300 text-black font-bold' : 'bg-cyan-200 text-black'
    })
    cursor = hit.end
  })
  if (cursor < line.length) segs.push({ text: line.slice(cursor), cls: '' })
  return segs
}

const lineClass = (line: string) => {
  if (/^\d+\./.test(line)) return 'font-bold text-slate-900'
  if (/^[\u2502 ]+\S/.test(line)) return 'italic text-slate-600'
  if (/^[\u251c\u2514]\u2500\u2500/.test(line)) return 'font-semibold text-slate-800'
  if (line.startsWith('#') || line.startsWith('/*')) return 'italic text-slate-500'
  return 'text-[#1a1a1a]'
}

const newDocument = async () => {
  pushHistory()
  try {
    const res = await $fetch<{ content: string }>('/api/stack')
    lines.value = toLines(res.content)
    fileName.value = 'stack.txt'
    isModified.value = false
    flashStatus('✓ Restaurado desde el repositorio')
  } catch {
    statusMessage.value = 'No se pudo restaurar desde el repositorio'
  }
}

const fileInput = ref<HTMLInputElement | null>(null)

const openDocument = () => fileInput.value?.click()

const onFilePicked = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const text = await file.text()
  pushHistory()
  lines.value = text.replace(/\r\n/g, '\n').split('\n')
  fileName.value = file.name
  isModified.value = true
  refreshStatus()
  flashStatus(`Abierto: ${file.name}`)
  input.value = ''
}

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(currentLines.value.join('\n'))
    isCopied.value = true
    flashStatus('✓ Texto copiado al portapapeles')
    setTimeout(() => {
      isCopied.value = false
    }, 2500)
  } catch {
    statusMessage.value = 'Error al copiar'
  }
}

const printDocument = () => {
  window.print()
}

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
}

const toggleMaximize = () => {
  isMaximized.value = !isMaximized.value
}

/* ---------- Modo edición: la contraseña se valida en el servidor (.env) ---------- */
const TOKEN_KEY = 'readmin803:edit-token'

const editable = ref(false)
const editText = ref('')
const showPasswordDialog = ref(false)
const passwordInput = ref('')
const passwordError = ref('')
const authBusy = ref(false)
const passwordField = ref<HTMLInputElement | null>(null)

const applyEditText = () => {
  lines.value = editText.value.replace(/\r\n/g, '\n').split('\n')
}

const startEdit = () => {
  if (editable.value) return
  editText.value = lines.value.join('\n')
  editable.value = true
  closeFind()
  statusMessage.value = `${fileName.value} [UTF-8]  •  Editando…`
}

const stopEdit = () => {
  if (!editable.value) return
  applyEditText()
  editable.value = false
  isModified.value = true
  refreshStatus()
}

const verifyToken = async (token: string) => {
  try {
    const res = await $fetch<{ valid: boolean }>('/api/edit-session', {
      method: 'GET',
      query: { token }
    })
    return !!res.valid
  } catch {
    return false
  }
}

const requestEdit = async () => {
  if (editable.value) {
    stopEdit()
    return
  }
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (token && (await verifyToken(token))) {
    startEdit()
    return
  }
  passwordInput.value = ''
  passwordError.value = ''
  showPasswordDialog.value = true
  nextTick(() => passwordField.value?.focus())
}

const cancelPassword = () => {
  showPasswordDialog.value = false
  passwordInput.value = ''
  passwordError.value = ''
}

const submitPassword = async () => {
  if (authBusy.value || !passwordInput.value) return
  authBusy.value = true
  passwordError.value = ''
  try {
    const res = await $fetch<{ token: string }>('/api/edit-session', {
      method: 'POST',
      body: { password: passwordInput.value }
    })
    sessionStorage.setItem(TOKEN_KEY, res.token)
    cancelPassword()
    startEdit()
  } catch (error: any) {
    passwordError.value = error?.data?.message || error?.data?.statusMessage || 'No se pudo validar la contraseña'
  } finally {
    authBusy.value = false
  }
}

const saveDocument = async () => {
  if (!editable.value) {
    await copyContent()
    return
  }
  applyEditText()

  const token = sessionStorage.getItem(TOKEN_KEY)
  try {
    const res = await $fetch<{ ok: boolean; scope: string; commitUrl?: string }>('/api/save-stack', {
      method: 'POST',
      body: { token, content: lines.value.join('\n') }
    })
    isModified.value = false
    statusMessage.value = res.scope === 'github'
      ? '✓ Guardado en GitHub (commit)'
      : '✓ Guardado en data/stack.txt'
    setTimeout(refreshStatus, 3000)
  } catch (error: any) {
    if (error?.statusCode === 401 || error?.data?.statusCode === 401) {
      sessionStorage.removeItem(TOKEN_KEY)
      showPasswordDialog.value = true
      passwordError.value = 'La sesión expiró: vuelve a introducir la contraseña'
      nextTick(() => passwordField.value?.focus())
      return
    }
    statusMessage.value = error?.data?.message || 'Error al guardar'
  }
}

</script>

<template>
  <section class="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
    <!-- Atmospheric glow effects -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-[#3465a4]/15 blur-[130px] rounded-full"></div>
      <div class="absolute top-1/3 -left-32 w-[450px] h-[350px] bg-slate-400/15 blur-[120px] rounded-full"></div>
      <div class="absolute top-1/2 -right-32 w-[450px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <!-- Left: Hero Copy & Value Proposition -->
        <div class="lg:col-span-5 text-center lg:text-left space-y-6">
          <!-- Status pill -->
<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border-2 border-cyan-500/30 backdrop-blur-sm shadow-sm">
             <span class="relative flex h-2.5 w-2.5">
               <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
             </span>
             <span class="text-xs font-mono font-medium text-slate-700">
               Raúl E. · <span class="text-[#204a87] font-semibold">[re]admin</span> · Sistemas & Desarrollo Web
             </span>
           </div>

          <!-- Main headline -->
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
            Administración de sistemas, soporte y desarrollo web.
          </h1>

          <!-- Subtitle / Bio -->
          <p class="text-base text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Administración de <strong class="text-slate-900 font-semibold">ERP Navision</strong> y <strong class="text-slate-900 font-semibold">Windows Server</strong>, programación de aplicaciones con <strong class="text-slate-900 font-semibold">PHP</strong>, <strong class="text-slate-900 font-semibold">MySQL</strong>, <strong class="text-slate-900 font-semibold">JavaScript</strong> y <strong class="text-slate-900 font-semibold">Node.js</strong>, e integración de etiquetas térmicas <strong class="text-slate-900 font-semibold">Zebra (ZPL)</strong>.
          </p>

          <!-- Tech Badges: dock-style -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-orange-500/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-orange-500 hover:bg-orange-500/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>HTML</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-purple-500/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-purple-500 hover:bg-purple-500/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>PHP</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-blue-500/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-blue-500 hover:bg-blue-500/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>CSS</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-cyan-500/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-cyan-500 hover:bg-cyan-500/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-cyan-500"></span>
              <span>SQL</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-yellow-500/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-yellow-500 hover:bg-yellow-500/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span>JAVASCRIPT</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-emerald-500/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-emerald-500 hover:bg-emerald-500/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>PYTHON</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-slate-500/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-slate-500 hover:bg-slate-500/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-slate-500"></span>
              <span>BASH / POWERSHELL</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-amber-600/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-amber-600 hover:bg-amber-600/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>ZPL</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-indigo-500/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-indigo-500 hover:bg-indigo-500/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span>VUE 3 · NUXT 3</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-rose-500/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-rose-500 hover:bg-rose-500/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>NAVISION / C-AL</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border-2 border-teal-500/30 text-xs font-medium text-slate-700 backdrop-blur-sm hover:border-teal-500 hover:bg-teal-500/10 transition-all hover:scale-[1.02]">
              <span class="w-2 h-2 rounded-full bg-teal-500"></span>
              <span>N8N · MAKE</span>
            </div>
          </div>

          <!-- Action Buttons with dock-style styling -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <!-- Primary Action: Dock-style CTA -->
            <a
              href="#proyectos"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-white/70 border-2 border-cyan-500/40 shadow-md text-cyan-700 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all backdrop-blur-sm"
            >
              <ArrowDown class="w-4 h-4" />
              <span>Ver Proyectos</span>
            </a>

            <!-- Secondary Action: Dock-style -->
            <a
              href="#contacto"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-white/70 border-2 border-indigo-500/30 text-indigo-700 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all backdrop-blur-sm"
            >
              <span>Contactar</span>
            </a>

            <!-- GitHub Button: Dock-style -->
            <a
              href="https://github.com/readmin803"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm bg-white/70 border-2 border-slate-300/50 text-slate-700 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all backdrop-blur-sm"
            >
              <Github class="w-4 h-4" />
              <span>@readmin803</span>
            </a>
          </div>
        </div>

        <!-- Right: Interactive Terminal & System Metrics Card -->
        <div class="lg:col-span-7 w-full">
          <!-- GNOME 2.0 Window (gedit) -->
          <div class="relative rounded-[3px] border border-[#2b2d2f] shadow-2xl bg-[#dcdad5] overflow-hidden select-none transition-all duration-200">
            <!-- 1. Metacity Titlebar (GNOME 2.0 style) -->
            <div class="h-6 sm:h-7 bg-gradient-to-b from-[#565b5e] to-[#43474a] border-b border-[#2b2d2f] px-2 flex items-center justify-between text-white">
              <!-- Left: Document icon & Title -->
              <div class="flex items-center gap-2 min-w-0">
                <!-- Retro folded page icon -->
                <div class="w-3.5 h-3.5 bg-white border border-[#2b2d2f] relative shrink-0">
                  <div class="absolute top-0 right-0 w-1.5 h-1.5 bg-[#43474a] border-b border-l border-[#2b2d2f]"></div>
                  <div class="w-2 h-[1px] bg-slate-400 mt-1 ml-0.5"></div>
                  <div class="w-2 h-[1px] bg-slate-400 mt-[2px] ml-0.5"></div>
                </div>
                <span class="font-sans font-semibold text-[11px] sm:text-[12px] tracking-wide truncate text-white drop-shadow-sm">
                  {{ fileName }} - gedit
                </span>
              </div>

              <!-- Right: Metacity 3D Window Buttons -->
              <div class="flex items-center gap-1 shrink-0 ml-2">
                <!-- Minimize Button -->
                <button
                  type="button"
                  @click="toggleMinimize"
                  class="w-[17px] h-[17px] flex items-center justify-center bg-[#d6d4ce] border-t border-l border-white border-r border-b border-[#403e3a] hover:bg-[#e4e2dc] active:border-t-[#403e3a] active:border-l-[#403e3a] active:border-r-white active:border-b-white transition-none focus:outline-none"
                  title="Minimizar / Restaurar"
                >
                  <span class="w-2 h-[2px] bg-black translate-y-1"></span>
                </button>

                <!-- Maximize Button -->
                <button
                  type="button"
                  @click="toggleMaximize"
                  class="w-[17px] h-[17px] flex items-center justify-center bg-[#d6d4ce] border-t border-l border-white border-r border-b border-[#403e3a] hover:bg-[#e4e2dc] active:border-t-[#403e3a] active:border-l-[#403e3a] active:border-r-white active:border-b-white transition-none focus:outline-none"
                  title="Maximizar"
                >
                  <span class="w-2 h-2 border-[1.5px] border-black"></span>
                </button>

                <!-- Close Button -->
                <button
                  type="button"
                  @click="toggleMinimize"
                  class="w-[17px] h-[17px] flex items-center justify-center bg-[#d6d4ce] border-t border-l border-white border-r border-b border-[#403e3a] hover:bg-[#e4e2dc] active:border-t-[#403e3a] active:border-l-[#403e3a] active:border-r-white active:border-b-white transition-none focus:outline-none"
                  title="Cerrar"
                >
                  <X class="w-2.5 h-2.5 text-black stroke-[2.5]" />
                </button>
              </div>
            </div>

            <!-- 2. GNOME Menu Bar -->
            <div class="bg-[#dcdad5] border-b border-[#c2bfb8] px-1.5 py-0.5 flex items-center text-[11px] sm:text-[12px] font-sans text-black">
              <span class="px-2 py-0.5 hover:bg-[#3465a4] hover:text-white cursor-pointer select-none rounded-[1px]"><span class="underline">F</span>ile</span>
              <span class="px-2 py-0.5 hover:bg-[#3465a4] hover:text-white cursor-pointer select-none rounded-[1px]"><span class="underline">E</span>dit</span>
              <span class="px-2 py-0.5 hover:bg-[#3465a4] hover:text-white cursor-pointer select-none rounded-[1px]"><span class="underline">V</span>iew</span>
              <span class="px-2 py-0.5 hover:bg-[#3465a4] hover:text-white cursor-pointer select-none rounded-[1px]"><span class="underline">S</span>earch</span>
              <span class="px-2 py-0.5 hover:bg-[#3465a4] hover:text-white cursor-pointer select-none rounded-[1px]"><span class="underline">T</span>ools</span>
              <span class="px-2 py-0.5 hover:bg-[#3465a4] hover:text-white cursor-pointer select-none rounded-[1px]"><span class="underline">D</span>ocuments</span>
              <span class="px-2 py-0.5 hover:bg-[#3465a4] hover:text-white cursor-pointer select-none rounded-[1px]"><span class="underline">H</span>elp</span>
            </div>

            <!-- 3. GNOME 2.0 Toolbar (Icons with labels below) -->
            <div class="bg-[#dcdad5] border-t border-white/60 border-b border-[#aba79e] px-1 py-1 flex items-center gap-0.5 overflow-x-auto">
              <!-- New -->
              <button
                type="button"
                @click="newDocument"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0"
                title="Restaurar documento original"
              >
                <div class="w-4 h-4 bg-white border border-[#555] relative shrink-0">
                  <div class="absolute top-0 right-0 w-1.5 h-1.5 bg-[#dcdad5] border-b border-l border-[#555]"></div>
                </div>
                <span class="text-[10px] font-sans mt-0.5 text-black">New</span>
              </button>

              <!-- Open -->
              <button
                type="button"
                @click="openDocument"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0"
                title="Abrir un .txt del equipo"
              >
                <FolderOpen class="w-4 h-4 text-[#b28214]" />
                <span class="text-[10px] font-sans mt-0.5 text-black">Open</span>
              </button>

              <!-- Edit -->
              <button
                type="button"
                @click="requestEdit"
                :class="editable
                  ? 'flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-[#3465a4] bg-[#3465a4]/15 shrink-0'
                  : 'flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0'"
                :title="editable ? 'Terminar de editar' : 'Editar documento (requiere contraseña)'"
              >
                <Pencil class="w-4 h-4" :class="editable ? 'text-[#204a87]' : 'text-[#204a87]'" />
                <span class="text-[10px] font-sans mt-0.5 text-black">{{ editable ? 'Done' : 'Edit' }}</span>
              </button>

              <!-- Save -->
              <button
                type="button"
                @click="saveDocument"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0"
                :title="editable ? 'Guardar cambios en este navegador' : 'Copiar texto del documento'"
              >
                <Save class="w-4 h-4 text-[#204a87]" />
                <span class="text-[10px] font-sans mt-0.5 text-black">Save</span>
              </button>

              <!-- Print -->
              <button
                type="button"
                @click="printDocument"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0"
                title="Imprimir"
              >
                <Printer class="w-4 h-4 text-[#444]" />
                <span class="text-[10px] font-sans mt-0.5 text-black">Print</span>
              </button>

              <!-- Separator -->
              <div class="h-7 w-[2px] bg-[#aba79e] border-r border-white/80 mx-1 shrink-0"></div>

              <!-- Undo -->
              <button
                type="button"
                @click="undo"
                :disabled="!history.length"
                :class="history.length
                  ? 'flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0'
                  : 'flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] opacity-40 cursor-default shrink-0'"
                title="Deshacer"
              >
                <Undo2 class="w-4 h-4" :class="history.length ? 'text-slate-700' : 'text-slate-600'" />
                <span class="text-[10px] font-sans mt-0.5" :class="history.length ? 'text-black' : 'text-slate-500'">Undo</span>
              </button>

              <!-- Redo -->
              <button
                type="button"
                @click="redo"
                :disabled="!future.length"
                :class="future.length
                  ? 'flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0'
                  : 'flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] opacity-40 cursor-default shrink-0'"
                title="Rehacer"
              >
                <Redo2 class="w-4 h-4" :class="future.length ? 'text-slate-700' : 'text-slate-600'" />
                <span class="text-[10px] font-sans mt-0.5" :class="future.length ? 'text-black' : 'text-slate-500'">Redo</span>
              </button>

              <!-- Separator -->
              <div class="h-7 w-[2px] bg-[#aba79e] border-r border-white/80 mx-1 shrink-0"></div>

              <!-- Cut -->
              <button
                type="button"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] opacity-40 cursor-default shrink-0"
                disabled
              >
                <Scissors class="w-4 h-4 text-slate-600" />
                <span class="text-[10px] font-sans mt-0.5 text-slate-500">Cut</span>
              </button>

              <!-- Copy -->
              <button
                type="button"
                @click="copyContent"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0"
                title="Copiar texto del documento"
              >
                <Copy class="w-4 h-4 text-[#444]" />
                <span class="text-[10px] font-sans mt-0.5 text-black">Copy</span>
              </button>

              <!-- Paste -->
              <button
                type="button"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] opacity-40 cursor-default shrink-0"
                disabled
              >
                <Clipboard class="w-4 h-4 text-slate-600" />
                <span class="text-[10px] font-sans mt-0.5 text-slate-500">Paste</span>
              </button>

              <!-- Separator -->
              <div class="h-7 w-[2px] bg-[#aba79e] border-r border-white/80 mx-1 shrink-0"></div>

              <!-- Find -->
              <button
                type="button"
                @click="toggleFind"
                :class="findOpen && !replaceOpen
                  ? 'flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-[#3465a4] bg-[#3465a4]/15 shrink-0'
                  : 'flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0'"
                title="Buscar en el documento"
              >
                <Search class="w-4 h-4 text-[#444]" />
                <span class="text-[10px] font-sans mt-0.5 text-black">Find</span>
              </button>

              <!-- Replace -->
              <button
                type="button"
                @click="toggleReplace"
                :class="replaceOpen
                  ? 'flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-[#3465a4] bg-[#3465a4]/15 shrink-0'
                  : 'flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0'"
                title="Reemplazar en el documento"
              >
                <Replace class="w-4 h-4 text-[#444]" />
                <span class="text-[10px] font-sans mt-0.5 text-black">Replace</span>
              </button>
            </div>

            <!-- 3.5 Find / Replace Bar (GtkRecentChooser style) -->
            <div v-if="findOpen" class="bg-[#e8e6e1] border-b border-[#aba79e] px-2 py-1.5 flex flex-col gap-1.5">
              <div class="flex items-center gap-1.5 flex-wrap">
                <label class="text-[11px] font-sans text-black shrink-0">Buscar:</label>
                <input
                  ref="findInput"
                  v-model="findQuery"
                  type="text"
                  placeholder="texto a buscar"
                  class="min-w-[140px] flex-1 px-2 py-1 text-[12px] font-mono text-black bg-white border border-[#8b877f] border-t-[#403e3a] border-l-[#403e3a] rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[#3465a4]"
                  @keydown.enter.prevent="stepMatch(1)"
                  @keydown.esc="closeFind"
                />
                <span class="text-[11px] font-mono text-slate-700 min-w-[44px] text-center tabular-nums">{{ matchLabel }}</span>
                <button
                  type="button"
                  @click="stepMatch(-1)"
                  class="w-6 h-6 flex items-center justify-center border border-[#8b877f] border-t-white border-l-white bg-[#dcdad5] hover:bg-[#f6f4ee] rounded-[2px] focus:outline-none disabled:opacity-40"
                  :disabled="!totalMatches"
                  title="Coincidencia anterior"
                >
                  <ChevronUp class="w-3.5 h-3.5 text-black" />
                </button>
                <button
                  type="button"
                  @click="stepMatch(1)"
                  class="w-6 h-6 flex items-center justify-center border border-[#8b877f] border-t-white border-l-white bg-[#dcdad5] hover:bg-[#f6f4ee] rounded-[2px] focus:outline-none disabled:opacity-40"
                  :disabled="!totalMatches"
                  title="Coincidencia siguiente"
                >
                  <ChevronDown class="w-3.5 h-3.5 text-black" />
                </button>
                <button
                  type="button"
                  @click="closeFind"
                  class="w-6 h-6 flex items-center justify-center border border-[#8b877f] border-t-white border-l-white bg-[#dcdad5] hover:bg-red-100 rounded-[2px] focus:outline-none"
                  title="Cerrar búsqueda"
                >
                  <X class="w-3.5 h-3.5 text-black" />
                </button>
              </div>

              <div v-if="replaceOpen" class="flex items-center gap-1.5 flex-wrap">
                <label class="text-[11px] font-sans text-black shrink-0">Reemplazar:</label>
                <input
                  v-model="replaceQuery"
                  type="text"
                  placeholder="reemplazo"
                  class="min-w-[140px] flex-1 px-2 py-1 text-[12px] font-mono text-black bg-white border border-[#8b877f] border-t-[#403e3a] border-l-[#403e3a] rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[#3465a4]"
                  @keydown.enter.prevent="doReplace"
                  @keydown.esc="closeFind"
                />
                <button
                  type="button"
                  @click="doReplace"
                  :disabled="!totalMatches"
                  class="px-2 py-1 text-[11px] font-sans text-black bg-[#dcdad5] border border-[#8b877f] border-t-white border-l-white rounded-[2px] hover:bg-[#f6f4ee] focus:outline-none disabled:opacity-40"
                >
                  Reemplazar
                </button>
                <button
                  type="button"
                  @click="doReplaceAll"
                  :disabled="!totalMatches"
                  class="px-2 py-1 text-[11px] font-sans text-black bg-[#dcdad5] border border-[#8b877f] border-t-white border-l-white rounded-[2px] hover:bg-[#f6f4ee] focus:outline-none disabled:opacity-40"
                >
                  Todos
                </button>
              </div>
            </div>

            <!-- Hidden file input for Open -->
            <input
              ref="fileInput"
              type="file"
              accept=".txt,.md,.log,text/plain"
              class="hidden"
              @change="onFilePicked"
            />

            <!-- 4. Tab Bar (GtkNotebook) -->
            <div class="bg-[#dcdad5] pt-1.5 px-2 flex items-end gap-1 border-b border-[#88847c]">
              <!-- Tab: stack.txt -->
              <button
                type="button"
                class="px-2.5 py-1 text-[11px] sm:text-[12px] font-sans flex items-center gap-1.5 rounded-t-[2px] focus:outline-none transition-none cursor-pointer bg-white border-t border-l border-r border-[#88847c] -mb-[1px] pb-[5px] text-black font-medium"
              >
                <FileText class="w-3.5 h-3.5 text-slate-600" />
                <span>{{ fileName }}</span>
              </button>
            </div>

            <!-- 5. Main Document Canvas (GtkTextView with 2px sunken border) -->
            <div
              v-show="!isMinimized"
              class="border-t-2 border-l-2 border-[#76736d] border-r-2 border-b-2 border-white bg-white shadow-[inset_1px_1px_2px_rgba(0,0,0,0.25)] flex overflow-hidden"
              :class="isMaximized ? 'h-[500px]' : 'h-[360px] sm:h-[390px]'"
            >
              <!-- Modo edición -->
              <textarea
                v-if="editable"
                v-model="editText"
                spellcheck="false"
                class="w-full h-full resize-none p-2.5 sm:p-3 font-mono text-[11px] sm:text-[12px] leading-relaxed text-[#1a1a1a] bg-white select-text focus:outline-none"
                @keydown.ctrl.s.prevent="saveDocument"
                @keydown.meta.s.prevent="saveDocument"
                @keydown.esc="stopEdit"
              ></textarea>

              <template v-else>
                <!-- Line Numbers Gutter -->
                <div class="bg-[#f3f2ee] border-r border-[#dedad2] py-2.5 px-2 text-right font-mono text-[11px] sm:text-[12px] leading-relaxed text-[#8f8c85] select-none shrink-0 min-w-[34px]">
                  <div v-for="(_, index) in currentLines" :key="index">
                    {{ index + 1 }}
                  </div>
                </div>

                <!-- Text Content Viewport -->
                <div class="p-2.5 sm:p-3 font-mono text-[11px] sm:text-[12px] leading-relaxed select-text overflow-y-auto w-full">
                  <div
                    v-for="(line, idx) in currentLines"
                    :key="idx"
                    :id="'gedit-line-' + idx"
                    class="whitespace-pre font-mono"
                    :class="lineClass(line)"
                  >
                    <span
                      v-for="(seg, sIdx) in segments(line, idx)"
                      :key="sIdx"
                      :class="seg.cls"
                    >{{ seg.text }}</span>
                  </div>
                </div>
              </template>
            </div>

            <!-- 6. GNOME Status Bar (Sunken panels) -->
            <div class="bg-[#dcdad5] border-t border-[#b8b4ad] p-1 flex items-center justify-between text-[11px] font-sans text-black">
              <!-- Left: File / Notification status -->
              <div class="border-t border-l border-[#8b877f] border-r border-b border-white bg-[#dcdad5] px-2 py-0.5 truncate max-w-[240px] sm:max-w-none text-slate-800 flex items-center gap-1.5">
                <Check v-if="isCopied" class="w-3 h-3 text-emerald-600 inline" />
                <span>{{ statusMessage }}</span>
              </div>

              <!-- Right: Line/Col, Mode and Resize Grip -->
              <div class="flex items-center gap-1 shrink-0 ml-1">
                <div class="border-t border-l border-[#8b877f] border-r border-b border-white bg-[#dcdad5] px-2 py-0.5 text-slate-800 text-[10px] sm:text-[11px]">
                  Ln 1, Col. 1
                </div>
                <div class="border-t border-l border-[#8b877f] border-r border-b border-white bg-[#dcdad5] px-2 py-0.5 text-slate-800 text-[10px] sm:text-[11px]">
                  {{ editable ? 'EDIT' : 'INS' }}
                </div>
                <!-- Diagonal Resize Grip -->
                <div class="w-3.5 h-3.5 flex flex-col justify-end items-end gap-[1.5px] p-0.5 opacity-60 cursor-se-resize">
                  <div class="w-1 h-[1px] bg-black"></div>
                  <div class="w-2 h-[1px] bg-black"></div>
                  <div class="w-3 h-[1px] bg-black"></div>
                </div>
              </div>
            </div>

            <!-- 7. Diálogo de contraseña (validada en /api/edit-session) -->
            <div
              v-if="showPasswordDialog"
              class="absolute inset-0 z-20 bg-black/35 flex items-center justify-center p-4 backdrop-blur-[1px]"
            >
              <div class="w-full max-w-[320px] bg-[#dcdad5] border border-[#2b2d2f] shadow-2xl rounded-[3px] overflow-hidden">
                <div class="h-6 bg-gradient-to-b from-[#565b5e] to-[#43474a] border-b border-[#2b2d2f] px-2 flex items-center justify-between">
                  <span class="text-white text-[11px] font-sans font-semibold drop-shadow-sm">Editar documento</span>
                  <button
                    type="button"
                    @click="cancelPassword"
                    class="w-[17px] h-[17px] flex items-center justify-center bg-[#d6d4ce] border-t border-l border-white border-r border-b border-[#403e3a] hover:bg-[#e4e2dc] focus:outline-none"
                    title="Cerrar"
                  >
                    <X class="w-2.5 h-2.5 text-black stroke-[2.5]" />
                  </button>
                </div>

                <div class="p-4 space-y-3">
                  <p class="text-[12px] font-sans text-slate-800 leading-snug">
                    Introduce la contraseña de edición para modificar este archivo:
                  </p>
                  <input
                    ref="passwordField"
                    v-model="passwordInput"
                    type="password"
                    placeholder="••••••••"
                    autocomplete="current-password"
                    class="w-full px-2 py-1.5 text-[13px] font-mono text-black bg-white border border-[#8b877f] border-t-[#403e3a] border-l-[#403e3a] rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[#3465a4]"
                    @keydown.enter.prevent="submitPassword"
                    @keydown.esc="cancelPassword"
                  />
                  <p v-if="passwordError" class="text-[11px] font-sans text-red-600">
                    {{ passwordError }}
                  </p>
                  <div class="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      @click="cancelPassword"
                      class="px-3 py-1 text-[12px] font-sans text-black bg-[#dcdad5] border border-[#8b877f] border-t-white border-l-white rounded-[2px] hover:bg-[#f6f4ee] focus:outline-none"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      @click="submitPassword"
                      :disabled="authBusy || !passwordInput"
                      class="px-3 py-1 text-[12px] font-sans font-medium text-white bg-[#3465a4] border border-[#204a87] rounded-[2px] hover:bg-[#2a5a9e] focus:outline-none disabled:opacity-50"
                    >
                      {{ authBusy ? 'Validando…' : 'Aceptar' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
