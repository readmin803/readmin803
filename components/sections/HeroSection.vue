<script setup lang="ts">
import { ref, computed } from 'vue'
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
  Check
} from 'lucide-vue-next'

const activeTab = ref<'esquema' | 'competencias'>('esquema')
const isMinimized = ref(false)
const isMaximized = ref(false)
const statusMessage = ref('FullStack.txt [UTF-8]  •  Solo lectura')
const isCopied = ref(false)

const fileContents = {
  esquema: [
    '=============================================================================',
    '  ESQUEMA TÉCNICO INTEGRAL: LENGUAJES, HERRAMIENTAS Y SERVICIOS (Readmin)',
    '===============================================================================',
    '',
    '',
    '1. LENGUAJES DE PROGRAMACIÓN, SCRIPTING Y DOMINIO',
    '├── HTML5 / CSS3',
    '├── PHP',
    '├── JavaScript (ES6+)',
    '├── TypeScript',
    '├── Python',
    '├── SQL',
    '├── C/AL (Microsoft Dynamics NAV)',
    '├── ZPL (Zebra Programming Language)',
    '├── Bash / PowerShell',
    '',
    '',
    '2. DESARROLLO WEB, FRAMEWORKS Y LÓGICA BACKEND',
    '├── Vue 3 (Composition API)',
    '├── Nuxt 3',
    '├── Tailwind CSS',
    '├── Node.js',
    '├── Nitro Engine',
    '└── Phaser.js',
    '',
    '',
    '3. BASES DE DATOS, ALMACENAMIENTO Y PERSISTENCIA',
    '├── Relacionales y BaaS:',
    '│   ├── MySQL',
    '│   ├── MariaDB',
    '│   ├── PostgreSQL',
    '│   └── Supabase',
    '│   └── NocoDB',
    '',
    '',
    '└── Sistemas de Almacenamiento y Backup:',
    '    ├── ZFS',
    '    ├── Configuración RAID / Sys RAID',
    '    ├── Servidores NAS',
    '    └── Synology Active Backup',
    '',
    '',
    '4. AUTOMATIZACIÓN, INTEGRACIÓN Y WORKFLOWS',
    '├── n8n',
    '└── make',
    '',
    '',
    '5. ERP Y SOFTWARE ESPECIALIZADO DE PLANTA',
    '└── Microsoft Dynamics NAV (Navision)',
    '    ├── Desarrollo de reportes, certificados, códigos y formularios',
    '    └── Integración directa de impresión de etiquetas térmicas Zebra (ZPL)',
    '',
    '',
    '6. SISTEMAS OPERATIVOS Y VIRTUALIZACIÓN',
    '├── Servidores y S.O.:',
    '│   └── Windows Server (Servicios RDP / SMB)',
    '└── Virtualización:',
    '    ├── VMware ESXi',
    '    └── Proxmox',
    '',
    '',
    '7. REDES, INFRAESTRUCTURA, VPN Y CIBERSEGURIDAD',
    '├── Infraestructura Física y Comunicaciones:',
    '│   ├── Montaje y cableado de Racks (Redes LAN)',
    '│   ├── Instalación y configuración de Routers, Switches y Firewalls',
    '│   ├── Despliegue de redes de Fibra Óptica',
    '│   ├── Videovigilancia IP',
    '│   └── Despliegue y soporte de Redes WiFi (WLAN)',
    '├── Fabricantes y Equipamiento de Red:',
    '│   ├── Fortinet',
    '│   ├── Ubiquiti',
    '│   ├── MikroTik',
    '│   ├── Grandstream',
    '│   ├── Ruijie',
    '│   ├── Cambium',
    '│   └── Cisco',
    '├── Protocolos, VPN y Acceso Remoto:',
    '│   ├── OpenVPN',
    '│   ├── WireGuard',
    '│   ├── Tailscale',
    '│   ├── Cloudflare WARP',
    '│   ├── RDP (Escritorio Remoto)',
    '│   ├── SSH',
    '│   ├── Termius',
    '│   └── RealVNC',
    '└── Administración Cloud, Identidad y EdTech:',
    '    ├── Microsoft Intune',
    '    ├── AAD (Azure Active Directory / Entra ID)',
    '    └── Linewize / Classwise',
    '',
    '',
    '8. HARDWARE, HELPDESK Y SOPORTE TÉCNICO',
    '├── Mantenimiento preventivo y correctivo hardware/software',
    '├── Reparación y sustitución de componentes (placas base, pantallas, módulos)',
    '├── Montaje y configuración de estaciones de trabajo y PCs',
    '└── Mantenimiento y resolución de incidencias en impresoras (tóner, averías)',
    '',
    '',
    '9. SOFTWARE DE PUNTO DE VENTA (TPV / POS)',
    '├── Micros / Oracle',
    '└── AgoraPOS',
    '',
    '',
    '10. DESPLIEGUE, CONTROL DE VERSIONES Y ENTORNO DEV / AI',
    '├── Vercel',
    '├── Git / GitHub',
    '├── Ollama',
    '├── Antigravity CLI',
    '└── OpenCode',
    '',
    '',
    '11. HERRAMIENTAS CORPORATIVAS Y PRODUCTIVIDAD',
    '└── Microsoft Office Suite / Outlook',
  ],
  competencias: [
    '============================================================================',
    'COMPETENCIAS · RAÚL E. ([re]admin)',
    'Contacto: readmin803@gmail.com  |  GitHub: github.com/readmin803',
    '============================================================================',
    '',
    '[ADMINISTRACIÓN ERP & ENTORNO EMPRESARIAL]',
    '• Microsoft Dynamics NAV (Navision):',
    '  - Personalización de formularios, reportes y lógica de negocio.',
    '  - Integración de etiquetas térmicas industriales Zebra (lenguaje ZPL).',
    '• Suite Corporativa:',
    '  - Gestión integral de entorno de trabajo Microsoft Office y Outlook.',
    '',
    '[PROGRAMACIÓN & DESARROLLO A MEDIDA]',
    '• Desarrollo Fullstack Punta a Punta:',
    '  - Backend & APIs: PHP, Node.js, Python, Nitro Engine y APIs REST agregadas.',
    '  - Bases de Datos: MySQL, SQL Server, PostgreSQL y diseño relacional.',
    '  - Frontend Web Reactivo: JavaScript (ES6+), Vue 3, Nuxt 3 y Tailwind CSS.',
    '• Automatizaciones & Flujos de Datos:',
    '  - n8n (workflows complejos, webhooks y conectores entre plataformas).',
    '',
    '[SISTEMAS, INFRAESTRUCTURA & REDES]',
    '• Servidores & Acceso Remoto:',
    '  - Gestión y administración de Windows Server y Escritorio Remoto (RDP).',
    '  - Administración de entornos Linux.',
    '• Virtualización & Almacenamiento:',
    '  - VMware ESXi, Proxmox VE, pools ZFS y sistemas RAID.',
    '  - Políticas de copias de seguridad (Synology Active Backup / NAS).',
    '• Redes & Conectividad:',
    '  - Switches gestionables L2/L3, routers, VLANs y cableado estructurado.',
    '  - WiFi empresarial (MikroTik, Ubiquiti, Cisco) y auditorías de cobertura.',
    '  - Conexiones seguras: VPNs WireGuard y OpenVPN.',
    '',
    '[SOPORTE TÉCNICO & HELPDESK]',
    '• Mantenimiento preventivo y correctivo integral de hardware y software.',
    '• Diagnóstico de averías, sustitución de componentes y soporte técnico.',
    '• Resolución de incidencias y atención a usuarios finales.'
  ]
}

const currentLines = computed(() => fileContents[activeTab.value])

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(currentLines.value.join('\n'))
    statusMessage.value = '✓ Texto copiado al portapapeles'
    isCopied.value = true
    setTimeout(() => {
      statusMessage.value = `${activeTab.value === 'esquema' ? 'FullStack.txt' : 'competencias.txt'} [UTF-8]  •  Solo lectura`
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
          <div class="rounded-[3px] border border-[#2b2d2f] shadow-2xl bg-[#dcdad5] overflow-hidden select-none transition-all duration-200">
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
                  {{ activeTab === 'esquema' ? 'FullStack.txt' : 'competencias.txt' }} - gedit
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
                @click="activeTab = 'esquema'"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0"
                title="Ver FullStack.txt"
              >
                <div class="w-4 h-4 bg-white border border-[#555] relative shrink-0">
                  <div class="absolute top-0 right-0 w-1.5 h-1.5 bg-[#dcdad5] border-b border-l border-[#555]"></div>
                </div>
                <span class="text-[10px] font-sans mt-0.5 text-black">New</span>
              </button>

              <!-- Open -->
              <button
                type="button"
                @click="activeTab = activeTab === 'esquema' ? 'competencias' : 'esquema'"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0"
                title="Cambiar documento"
              >
                <FolderOpen class="w-4 h-4 text-[#b28214]" />
                <span class="text-[10px] font-sans mt-0.5 text-black">Open</span>
              </button>

              <!-- Save -->
              <button
                type="button"
                @click="copyContent"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0"
                title="Guardar / Copiar texto"
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
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] opacity-40 cursor-default shrink-0"
                disabled
              >
                <Undo2 class="w-4 h-4 text-slate-600" />
                <span class="text-[10px] font-sans mt-0.5 text-slate-500">Undo</span>
              </button>

              <!-- Redo -->
              <button
                type="button"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] opacity-40 cursor-default shrink-0"
                disabled
              >
                <Redo2 class="w-4 h-4 text-slate-600" />
                <span class="text-[10px] font-sans mt-0.5 text-slate-500">Redo</span>
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
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0"
                title="Buscar"
              >
                <Search class="w-4 h-4 text-[#444]" />
                <span class="text-[10px] font-sans mt-0.5 text-black">Find</span>
              </button>

              <!-- Replace -->
              <button
                type="button"
                class="flex flex-col items-center justify-center px-1.5 py-1 min-w-[38px] rounded-[2px] border border-transparent hover:border-[#8e8a82] hover:bg-[#f6f4ee] active:bg-[#c8c4bc] text-[#1c1d1e] focus:outline-none shrink-0"
                title="Reemplazar"
              >
                <Replace class="w-4 h-4 text-[#444]" />
                <span class="text-[10px] font-sans mt-0.5 text-black">Replace</span>
              </button>
            </div>

            <!-- 4. Tab Bar (GtkNotebook) -->
            <div class="bg-[#dcdad5] pt-1.5 px-2 flex items-end gap-1 border-b border-[#88847c]">
              <!-- Tab 1: FullStack.txt -->
              <button
                type="button"
                @click="activeTab = 'esquema'"
                class="px-2.5 py-1 text-[11px] sm:text-[12px] font-sans flex items-center gap-1.5 rounded-t-[2px] focus:outline-none transition-none cursor-pointer"
                :class="activeTab === 'esquema'
                  ? 'bg-white border-t border-l border-r border-[#88847c] -mb-[1px] pb-[5px] text-black font-medium'
                  : 'bg-[#ccc8be] border border-[#a29e92] text-slate-700 hover:bg-[#e2ded2]'"
              >
                <FileText class="w-3.5 h-3.5 text-slate-600" />
                <span>FullStack.txt</span>
                <span
                  class="ml-1 w-3.5 h-3.5 flex items-center justify-center font-bold text-slate-600 hover:text-black"
                  title="Cerrar pestaña"
                >
                  ×
                </span>
              </button>

              <!-- Tab 2: competencias.txt -->
              <button
                type="button"
                @click="activeTab = 'competencias'"
                class="px-2.5 py-1 text-[11px] sm:text-[12px] font-sans flex items-center gap-1.5 rounded-t-[2px] focus:outline-none transition-none cursor-pointer"
                :class="activeTab === 'competencias'
                  ? 'bg-white border-t border-l border-r border-[#88847c] -mb-[1px] pb-[5px] text-black font-medium'
                  : 'bg-[#ccc8be] border border-[#a29e92] text-slate-700 hover:bg-[#e2ded2]'"
              >
                <FileText class="w-3.5 h-3.5 text-slate-600" />
                <span>competencias.txt</span>
                <span
                  class="ml-1 w-3.5 h-3.5 flex items-center justify-center font-bold text-slate-600 hover:text-black"
                  title="Cerrar pestaña"
                >
                  ×
                </span>
              </button>
            </div>

            <!-- 5. Main Document Canvas (GtkTextView with 2px sunken border) -->
            <div
              v-show="!isMinimized"
              class="border-t-2 border-l-2 border-[#76736d] border-r-2 border-b-2 border-white bg-white shadow-[inset_1px_1px_2px_rgba(0,0,0,0.25)] flex overflow-hidden"
              :class="isMaximized ? 'h-[500px]' : 'h-[360px] sm:h-[390px]'"
            >
              <!-- Line Numbers Gutter -->
              <div class="bg-[#f3f2ee] border-r border-[#dedad2] py-2.5 px-2 text-right font-mono text-[11px] sm:text-[12px] leading-relaxed text-[#8f8c85] select-none shrink-0 min-w-[34px]">
                <div v-for="(_, index) in currentLines" :key="index">
                  {{ index + 1 }}
                </div>
              </div>

              <!-- Text Content Viewport -->
              <div class="p-2.5 sm:p-3 font-mono text-[11px] sm:text-[12px] leading-relaxed text-[#1a1a1a] select-text overflow-y-auto w-full">
                <div
                  v-for="(line, idx) in currentLines"
                  :key="idx"
                  class="whitespace-pre font-mono"
                  :class="{
                    'text-slate-500 italic': line.startsWith('/*') || line.startsWith(' *') || line.startsWith('#'),
                    'text-[#204a87] font-bold bg-[#3465a4]/10 px-1 rounded-sm': line.startsWith('['),
                    'text-slate-400': line.startsWith('---') || line.startsWith('==='),
                    'text-slate-900 font-semibold': line.startsWith('• ') && !line.startsWith('• Alias') && !line.startsWith('• Filosofía'),
                    'text-emerald-700 font-medium': line.startsWith('+ '),
                    'text-amber-800 font-medium': line.startsWith('> ')
                  }"
                >
                  {{ line }}
                </div>
              </div>
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
                  INS
                </div>
                <!-- Diagonal Resize Grip -->
                <div class="w-3.5 h-3.5 flex flex-col justify-end items-end gap-[1.5px] p-0.5 opacity-60 cursor-se-resize">
                  <div class="w-1 h-[1px] bg-black"></div>
                  <div class="w-2 h-[1px] bg-black"></div>
                  <div class="w-3 h-[1px] bg-black"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
