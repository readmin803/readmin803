export interface SkillGroup {
  title: string
  description: string
  icon: 'layout' | 'server' | 'workflow'
  items: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend Core',
    description: 'Interfaces modernas con renderizado híbrido (SSR/SSG), componentes reutilizables y maquetación sólida.',
    icon: 'layout',
    items: [
      'Vue 3 (Composition API)',
      'Nuxt 3',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'HTML5 / CSS3'
    ]
  },
  {
    title: 'Backend & Datos',
    description: 'Lógica de servidor, scripts y persistencia con bases de datos relacionales y Supabase.',
    icon: 'server',
    items: [
      'Node.js / Nitro Engine',
      'PHP',
      'Python',
      'SQL (PostgreSQL, MySQL, MariaDB)',
      'Supabase'
    ]
  },
  {
    title: 'Integración & Automatización',
    description: 'Conexión de sistemas mediante APIs, automatización de procesos y optimización del rendimiento.',
    icon: 'workflow',
    items: [
      'APIs REST',
      'n8n',
      'Automatización de procesos',
      'Optimización de rendimiento'
    ]
  }
]
