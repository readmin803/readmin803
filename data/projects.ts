export interface ProjectMetric {
  label: string
  value: string
}

export interface DetailedSection {
  title: string
  items: string[]
}

export interface ProjectItem {
  id: string
  title: string
  role?: string
  category: 'n8n' | 'fullstack' | '2d-games'
  categoryLabel: string
  badgeColor: 'emerald' | 'cyan' | 'indigo' | 'amber'
  shortDescription: string
  fullDescription: string
  highlights: string[]
  metrics: ProjectMetric[]
  tags: string[]
  githubUrl?: string
  demoUrl?: string
  readmeUrl?: string
  image?: string
  featured: boolean
  architectureNote?: string
  detailedSections?: DetailedSection[]
}

export const CATEGORIES = [
  { id: 'all', label: 'Todos los proyectos', count: 5 },
  { id: 'fullstack', label: 'Desarrollo Web', count: 2 },
  { id: 'n8n', label: 'Automatizaciones n8n', count: 2 },
  { id: '2d-games', label: 'Juegos 2D', count: 1 }
] as const

export const PROJECTS: ProjectItem[] = [
  // --- WEB FULLSTACK ---
  {
    id: 'nuxt-enterprise-dashboard',
    title: 'Dashboard unificado de datos operativos',
    role: 'Desarrollador Fullstack',
    category: 'fullstack',
    categoryLabel: 'Desarrollo Web',
    badgeColor: 'cyan',
    shortDescription: 'Consolidé varias fuentes de datos externas en un único panel reactivo, eliminando la consulta manual de plataformas separadas.',
    fullDescription: 'El equipo gestionaba datos repartidos entre varias plataformas y consultaba cada una por separado. Construí un dashboard en Nuxt 3 cuyas rutas de servidor (Nitro) agregan las APIs REST en una única respuesta normalizada. El cliente usa Vue 3 Composition API con estado centralizado, de modo que los datos se actualizan sin recargas completas.',
    highlights: [
      'Rutas de servidor que consolidan 5 APIs REST en una respuesta normalizada',
      'Estado centralizado con Composition API y componentes reutilizables',
      'Manejo de errores y caching por fuente para evitar fallos en cascada'
    ],
    metrics: [
      { label: 'Fuentes consolidadas', value: '5 → 1' },
      { label: 'Recargas de página', value: 'Eliminadas' },
      { label: 'Carga inicial', value: '< 1s' }
    ],
    tags: ['Nuxt 3', 'Vue 3', 'JavaScript ES6+', 'Nitro', 'REST APIs', 'Tailwind CSS'],
    githubUrl: 'https://github.com/readmin803',
    demoUrl: '',
    featured: true,
    architectureNote: 'Nuxt 3 + Nitro server routes + estado centralizado en Vue 3',
    detailedSections: [
      {
        title: 'Problema y arquitectura',
        items: [
          'Los datos vivían en cinco servicios distintos y el equipo alternaba entre pestañas para consolidarlos manualmente.',
          'El servidor Nitro agrega y normaliza esas fuentes en un solo endpoint, aislando la complejidad de la integración.',
          'El frontend consume una única API normalizada con estado centralizado en Composition API.'
        ]
      },
      {
        title: 'Decisiones técnicas',
        items: [
          'Caching por fuente con manejo de errores independiente: si una API falla, el resto del panel sigue funcionando.',
          'Componentes reutilizables por dominio para evitar duplicación de lógica de presentación.',
          'Actualización de datos en tiempo real sin recargar la página completa.'
        ]
      }
    ]
  },

  {
    id: 'creative-portfolio-site',
    title: 'Sitio corporativo de alto rendimiento',
    category: 'fullstack',
    categoryLabel: 'Desarrollo Web',
    badgeColor: 'cyan',
    shortDescription: 'Renderizado híbrido por ruta para combinar velocidad de carga con visibilidad orgánica en buscadores.',
    fullDescription: 'El objetivo era una web que cargara en menos de un segundo sin sacrificar posicionamiento. Apliqué renderizado híbrido con Nuxt 3 (SSR para contenido indexable, SSG para páginas estáticas), optimicé imágenes y fuentes, y ajusté los Core Web Vitals hasta métricas en verde.',
    highlights: [
      'Renderizado híbrido SSR/SSG elegido por ruta según el objetivo de cada página',
      'Core Web Vitals en verde (LCP, INP, CLS)',
      'Datos estructurados JSON-LD para buscadores y motores de IA'
    ],
    metrics: [
      { label: 'LCP', value: '< 1s' },
      { label: 'CLS', value: '0' },
      { label: 'SEO', value: '100/100' }
    ],
    tags: ['Nuxt 3', 'SSR/SSG', 'Core Web Vitals', 'JSON-LD', 'JavaScript ES6+', 'Tailwind CSS'],
    githubUrl: 'https://github.com/readmin803',
    demoUrl: '',
    featured: false,
    architectureNote: 'Renderizado híbrido con Nuxt 3 + optimización de Core Web Vitals',
    detailedSections: [
      {
        title: 'Rendimiento y SEO',
        items: [
          'Renderizado híbrido: SSR para páginas que necesitan indexación y SSG para contenido estático.',
          'Optimización de imágenes, fuentes y recursos críticos para Core Web Vitals en verde.',
          'JSON-LD estructurado para que el contenido sea legible por Google y motores de IA.'
        ]
      }
    ]
  },

  // --- AUTOMATIZACIONES N8N ---
  {
    id: 'n8n-automation',
    title: 'Automatización de procesos con n8n',
    role: 'Desarrollador de automatizaciones',
    category: 'n8n',
    categoryLabel: 'Automatizaciones n8n',
    badgeColor: 'emerald',
    shortDescription: 'Flujos que conectan las aplicaciones de un negocio para que trabajen solas, eliminando las tareas manuales de copiar y pegar.',
    fullDescription: 'Con n8n conecto las herramientas que ya usa un negocio para que se comuniquen entre sí sin intervención humana. Un ejemplo típico: cuando llega un formulario web, el flujo recoge los datos, los guarda donde corresponde (base de datos, hoja de cálculo o CRM) y avisa al equipo por correo o Slack. Todo ocurre automáticamente y, si algún servicio falla, el flujo reintenta para no perder nada.',
    highlights: [
      'Conexión entre aplicaciones mediante webhooks y APIs',
      'Notificaciones automáticas al equipo (email, Slack, Telegram)',
      'Reintentos automáticos cuando un servicio falla'
    ],
    metrics: [
      { label: 'Ejecución', value: 'Automática 24/7' },
      { label: 'Tareas manuales', value: 'Eliminadas' },
      { label: 'Fallos', value: 'Reintentos automáticos' }
    ],
    tags: ['n8n', 'Webhooks', 'APIs REST', 'Notificaciones', 'Automatización'],
    githubUrl: 'https://github.com/readmin803',
    demoUrl: '',
    featured: true,
    architectureNote: 'n8n + webhooks + APIs REST + notificaciones',
    detailedSections: [
      {
        title: 'Qué es y cómo funciona',
        items: [
          'Un evento de entrada (formulario, correo o webhook) dispara el flujo automáticamente.',
          'El flujo recoge los datos, los valida y los transforma antes de enviarlos a los servicios de destino.',
          'Cada paso tiene reintentos automáticos: si una API falla, el flujo lo vuelve a intentar sin perder datos.'
        ]
      },
      {
        title: 'Para qué sirve en un negocio',
        items: [
          'Sustituye las tareas manuales de mover datos entre aplicaciones.',
          'Avisa al equipo en tiempo real cuando ocurre algo relevante.',
          'Mantiene sincronizadas varias herramientas sin que nadie tenga que hacerlo a mano.'
        ]
      }
    ]
  },

  {
    id: 'n8n-printer-billing',
    title: 'Sistema Automatizado de Lectura y Facturación de Impresoras (B2B)',
    role: 'Desarrollador de automatizaciones',
    category: 'n8n',
    categoryLabel: 'Automatizaciones n8n',
    badgeColor: 'emerald',
    shortDescription: 'Pipeline que procesa automáticamente los emails de unas 40 impresoras, extrae los contadores de impresión y genera los registros listos para facturar por cliente.',
    fullDescription: 'Las impresoras industriales envían cada mes emails con datos de impresión desestructurados. El pipeline de n8n captura esos correos, extrae el número de serie, la fecha y los contadores de copias (blanco/negro y color) mediante parseo con JavaScript, cruza cada número de serie contra la base de datos de clientes (NocoDB/PostgreSQL) para asociarlo a su tarifa, y consolida las lecturas listas para calcular la facturación.',
    highlights: [
      'Recepción automática de emails de impresoras y extracción de variables con regex',
      'Cruce de números de serie contra NocoDB para asociar cliente y tarifa',
      'Consolidación de lecturas lista para el cálculo de facturación'
    ],
    metrics: [
      { label: 'Trabajo manual', value: '-100%' },
      { label: 'Errores', value: '0' },
      { label: 'Proceso', value: 'Automatizado' }
    ],
    tags: ['n8n', 'NocoDB', 'Node.js', 'REST APIs', 'Email Webhooks', 'PostgreSQL'],
    githubUrl: 'https://github.com/readmin803',
    demoUrl: '',
    image: '/n8n-imp-gestion.jpeg',
    featured: true,
    architectureNote: 'n8n + email trigger + parseo JS + NocoDB/PostgreSQL + consolidación',
    detailedSections: [
      {
        title: 'Problema de negocio',
        items: [
          'Cada mes llegan unos 40 emails de impresoras industriales con lecturas de contadores en texto sin estructura.',
          'El equipo transcribía manualmente cada lectura y calculaba la factura de cada cliente.',
          'El proceso era lento y propenso a errores en la asignación de lecturas al cliente correcto.'
        ]
      },
      {
        title: 'Arquitectura de automatización',
        items: [
          'n8n recibe los emails automáticamente y dispara el flujo.',
          'Un nodo de JavaScript parsea el contenido y extrae número de serie, fecha y contadores (blanco/negro y color).',
          'El flujo cruza el número de serie contra NocoDB (PostgreSQL) para asociar cliente y tarifa.',
          'Las lecturas validadas se consolidan en registros listos para la facturación.'
        ]
      },
      {
        title: 'Impacto',
        items: [
          'Eliminación del 100% del trabajo manual de transcripción.',
          'Cero errores en la asignación de lecturas por cliente.',
          'Facturación calculada directamente a partir de lecturas consolidadas.'
        ]
      }
    ]
  },

  // --- JUEGOS ---
  {
    id: 'play-chibi',
    title: 'Play Chibi — juego 2D top-down surrealista',
    category: '2d-games',
    categoryLabel: 'Juegos 2D',
    badgeColor: 'indigo',
    shortDescription: 'Juego web 2D top-down con Phaser 3: controlas una pluma mística, recoges auras de energía y escapas por el portal esquivando monstruos.',
    fullDescription: 'Juego 2D top-down minimalista y surrealista desarrollado con Phaser 3 sin bundler. El jugador controla una pluma mística cuyo aura crece al recoger "roscos de aura"; la misión es completar la recogida y escapar por un portal esquivando enemigos con movimiento tipo caballo de ajedrez. La dificultad escala por niveles de forma infinita.',
    highlights: [
      'Phaser 3.80 por CDN (import map), JavaScript ES Modules, sin bundler',
      'Físicas Arcade, texturas procedurales y render Canvas/WebGL automático',
      'Controles duales: joystick táctil + teclado (WASD/flechas), con área segura para iPhone',
      'Escenas modulares (Boot → Preload → Game + UI) con bus de eventos',
      'Dificultad progresiva infinita configurada por niveles'
    ],
    metrics: [
      { label: 'Motor', value: 'Phaser 3' },
      { label: 'Controles', value: 'Táctil + teclado' },
      { label: 'Despliegue', value: 'Vercel' }
    ],
    tags: ['Phaser 3', 'JavaScript ES modules', 'Arcade Physics', 'Canvas/WebGL', 'Responsive'],
    githubUrl: 'https://github.com/readmin803/play-chibi',
    demoUrl: 'https://play-chibi.vercel.app',
    readmeUrl: 'https://github.com/readmin803/play-chibi/blob/main/README.md',
    featured: true,
    architectureNote: 'Phaser 3 + físicas Arcade + escenas modulares (sin bundler)',
    detailedSections: [
      {
        title: 'Mecánicas del juego',
        items: [
          'El aura de la pluma crece y brilla con cada rosco recogido (setGlowLevel = recogidas / total).',
          'Al recoger la última aura se abre el portal: el mapa se ilumina y aparece el aviso "¡SALIDA ABIERTA!".',
          'Los enemigos se mueven en "L" tipo caballo de ajedrez, con orientación aleatoria y pausas.',
          'El portal es un vórtice que atrae al jugador; al tocarlo se completa el nivel.',
          'Tres corazones de vida; al morir muestra "GAME OVER!".'
        ]
      },
      {
        title: 'Controles y responsive',
        items: [
          'Joystick virtual abajo a la izquierda, siempre visible, que se recoloca bajo el dedo al arrastrar.',
          'En escritorio funciona con WASD o flechas, y también con el ratón.',
          'Scale.RESIZE adapta el juego a vertical y horizontal, con insets de área segura para el notch de iPhone.'
        ]
      },
      {
        title: 'Arquitectura del código',
        items: [
          'Escenas modulares: BootScene → PreloadScene → GameScene (+ UIScene en paralelo).',
          'Objetos separados por dominio: Player, Enemy, Collectible y Portal.',
          'Bus global de eventos entre escenas y texturas procedurales generadas por código.',
          'Dificultad configurable en config.js con misiones que escalan sin límite.'
        ]
      }
    ]
  }
]
