export interface SkillCategory {
  title: string
  description: string
  icon: string
  color: 'cyan' | 'emerald' | 'indigo' | 'amber'
  skills: {
    name: string
    level: string
    highlight?: boolean
  }[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Moderno & Headless CMS',
    description: 'Arquitecturas reactivas de alta velocidad, migración de ecosistemas y gestión de contenido desacoplado en tiempo real.',
    icon: 'Layout',
    color: 'cyan',
    skills: [
      { name: 'Next.js 16 (App Router, SSR & SSG)', level: 'Avanzado', highlight: true },
      { name: 'Sanity.io (Esquemas & Live Content API)', level: 'Avanzado', highlight: true },
      { name: 'TypeScript & JavaScript Moderno', level: 'Avanzado', highlight: true },
      { name: 'Tailwind CSS & Componentes UI', level: 'Experto', highlight: true },
      { name: 'Internacionalización (i18n Multi-idioma)', level: 'Avanzado', highlight: true },
      { name: 'Google OAuth & Google Maps API', level: 'Avanzado' },
      { name: 'Nuxt 3 & Vue 3', level: 'Avanzado' }
    ]
  },
  {
    title: 'GEO (IA Search) & SEO Técnico',
    description: 'Estrategias de posicionamiento híbrido: visibilidad en Google tradicional y maximización de citas en motores de IA generativa.',
    icon: 'Terminal',
    color: 'amber',
    skills: [
      { name: 'GEO (Generative Engine Optimization)', level: 'Especialista', highlight: true },
      { name: 'Schema.org JSON-LD (Knowledge Graph)', level: 'Experto', highlight: true },
      { name: 'Patrones Answer-First para LLMs', level: 'Especialista', highlight: true },
      { name: 'Core Web Vitals (LCP, INP, CLS Top)', level: 'Experto', highlight: true },
      { name: 'Control de Crawl Budget & Robots LLM', level: 'Avanzado', highlight: true },
      { name: 'next/image, next/font & Precarga', level: 'Avanzado' },
      { name: 'Sitemaps dinámicos & Open Graph', level: 'Avanzado' }
    ]
  },
  {
    title: 'Automatizaciones n8n & Flujos IA',
    description: 'Orquestación de flujos de trabajo sin fricción, conexión de APIs y desarrollo asistido con modelos de lenguaje.',
    icon: 'Workflow',
    color: 'emerald',
    skills: [
      { name: 'n8n (Self-hosted & Cloud)', level: 'Avanzado', highlight: true },
      { name: 'Webhooks & Event Listeners', level: 'Avanzado', highlight: true },
      { name: 'APIs RESTful & Endpoints Seguros', level: 'Avanzado', highlight: true },
      { name: 'Integración de LLMs (OpenAI, Claude)', level: 'Avanzado', highlight: true },
      { name: 'Dev asistido por IA (Windsurf, Claude, OpenCode)', level: 'Experto', highlight: true },
      { name: 'Pipelines ETL & Transformación JSON', level: 'Avanzado' },
      { name: 'Alertas corporativas (Slack, Telegram)', level: 'Avanzado' }
    ]
  },
  {
    title: 'Backend PHP & Infraestructura',
    description: 'Arquitecturas robustas, bases de datos relacionales, despliegues continuos y administración de sistemas.',
    icon: 'Server',
    color: 'indigo',
    skills: [
      { name: 'PHP 8.x (OOP, Tipado Estricto, PSR)', level: 'Avanzado', highlight: true },
      { name: 'Arquitectura MVC & Patrones SOLID', level: 'Avanzado', highlight: true },
      { name: 'Bases de Datos MySQL & MariaDB', level: 'Avanzado' },
      { name: 'Vercel Deployment & Edge Caching', level: 'Avanzado', highlight: true },
      { name: 'Git & GitHub (@readmin803)', level: 'Avanzado', highlight: true },
      { name: 'Docker & Docker Compose', level: 'Competente' },
      { name: 'Seguridad Web (CSRF, XSS, OAuth)', level: 'Avanzado' }
    ]
  }
]
