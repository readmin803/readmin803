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
  category: 'n8n' | 'nextjs-seo' | 'php' | 'fullstack'
  categoryLabel: string
  badgeColor: 'emerald' | 'cyan' | 'indigo' | 'amber'
  shortDescription: string
  fullDescription: string
  highlights: string[]
  metrics: ProjectMetric[]
  tags: string[]
  githubUrl?: string
  demoUrl?: string
  featured: boolean
  architectureNote?: string
  detailedSections?: DetailedSection[]
}

export const CATEGORIES = [
  { id: 'all', label: 'Todos los proyectos', count: 6 },
  { id: 'n8n', label: 'n8n & Automatizaciones', count: 2 },
  { id: 'nextjs-seo', label: 'Next.js · SEO & IA (GEO)', count: 2 },
  { id: 'php', label: 'PHP & Aplicaciones Web', count: 2 }
] as const

export const PROJECTS: ProjectItem[] = [
  // --- NEXT.JS + HEADLESS CMS + SEO TÉCNICO & GEO (FLAGSHIP PROJECT) ---
  {
    id: 'real-estate-nextjs-sanity-geo',
    title: 'Plataforma Inmobiliaria Internacional & Motor GEO con Next.js 16 y Sanity.io',
    role: 'Lead Frontend & Technical SEO Engineer',
    category: 'nextjs-seo',
    categoryLabel: 'Next.js · SEO & IA (GEO)',
    badgeColor: 'cyan',
    shortDescription: 'Desarrollo web integral, migración desde Replit a Next.js 16 (App Router), sincronización en tiempo real con Sanity.io Live Content API y optimización híbrida para Google y motores de IA (GEO).',
    fullDescription: 'Liderazgo técnico en el diseño, desarrollo y posicionamiento orgánico de una plataforma inmobiliaria internacional enfocada en captación de inversores en Europa, Australia y Singapur. El proyecto unifica arquitectura frontend moderna en Next.js 16, gestión headless reactiva con Sanity.io, autenticación segura con Google OAuth y una estrategia avanzada de Generative Engine Optimization (GEO) y Knowledge Graph.',
    highlights: [
      'Migración de React (Replit) a Next.js 16 (App Router) con SSR/SSG e i18n para inversores globales (Europa, Australia, Singapur)',
      'Arquitectura de datos relacionales en Sanity.io con sincronización bidireccional en tiempo real vía Live Content API',
      'Optimización drástica de Core Web Vitals (LCP, INP, CLS) con next/image, next/font y precarga inteligente de recursos',
      'Estrategia GEO (Generative Engine Optimization): JSON-LD avanzado, clústeres para Knowledge Graph y patrones Answer-First para ChatGPT/Perplexity'
    ],
    metrics: [
      { label: 'Core Web Vitals', value: 'LCP / INP / CLS Top' },
      { label: 'Mercados i18n', value: 'Europa · AUS · SG' },
      { label: 'GEO Indexing', value: 'Answer-First AI' }
    ],
    tags: [
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS',
      'Sanity.io',
      'Live Content API',
      'Google OAuth',
      'REST APIs',
      'Google Maps API',
      'JSON-LD Schema.org',
      'GEO / LLM SEO',
      'i18n'
    ],
    githubUrl: 'https://github.com/readmin803',
    demoUrl: '',
    featured: true,
    architectureNote: 'Next.js 16 App Router + Sanity.io Live Content API + JSON-LD Knowledge Graph + Google OAuth',
    detailedSections: [
      {
        title: '🏗️ Arquitectura Frontend y Migración',
        items: [
          'Lideré la migración completa de un ecosistema React (alojado previamente en Replit) hacia una arquitectura moderna basada en Next.js 16 (App Router), implementando Server-Side Rendering (SSR) y Static Site Generation (SSG) para maximizar el rendimiento.',
          'Desarrollé el sistema de internacionalización (i18n) multi-idioma mediante diccionarios de traducción, adaptando la plataforma para captar inversores en mercados clave de Europa, Australia y Singapur.',
          'Optimicé drásticamente los Core Web Vitals (LCP, INP, CLS) mediante la refactorización de elementos nativos hacia componentes optimizados (next/image, next/font), carga diferida y precarga de recursos críticos.'
        ]
      },
      {
        title: '🔌 Integración Backend y Headless CMS',
        items: [
          'Diseñé e implementé la arquitectura de datos relacionales en Sanity.io (esquemas personalizados para propiedades, proyectos de inversión y artículos).',
          'Desarrollé la sincronización bidireccional entre el CMS y el frontend utilizando la Live Content API de Sanity.',
          'Configuré los endpoints de la API para los formularios de contacto, implementando autenticación segura mediante Google OAuth.',
          'Integré enlaces y mapas dinámicos de Google Maps para la geolocalización precisa de los desarrollos inmobiliarios en Kuta Lombok.'
        ]
      },
      {
        title: '🤖 GEO (Generative Engine Optimization) y SEO Técnico',
        items: [
          'Diseñé e implementé una estrategia integral de rastreo y posicionamiento híbrido (Google Tradicional + Motores IA).',
          'Desarrollé la generación dinámica de etiquetado semántico avanzado mediante JSON-LD Schema.org (incluyendo clústeres para RealEstateAgent, SingleFamilyResidence, Article y FAQPage), estructurando las entidades para el Knowledge Graph.',
          'Automaticé la creación de metadatos dinámicos, imágenes Open Graph, sitemaps XML e implementé directivas de robots.txt para controlar el acceso del crawl budget y crawlers de LLMs.',
          'Estructuré el contenido bajo patrones Answer-First para maximizar la tasa de extracción y co-citación en respuestas de IA generativa (ChatGPT Search, Perplexity, AI Overviews).'
        ]
      }
    ]
  },

  // --- SAAS & LANDING DE ALTO RENDIMIENTO ---
  {
    id: 'nextjs-saas-showcase',
    title: 'Landing & Aplicación Web SaaS de Alto Rendimiento',
    category: 'nextjs-seo',
    categoryLabel: 'Next.js · SEO & IA (GEO)',
    badgeColor: 'cyan',
    shortDescription: 'Arquitectura frontend moderna orientada a conversión de usuarios, carga instantánea y posicionamiento orgánico en búsquedas transaccionales.',
    fullDescription: 'Sitio web corporativo y panel interactivo con animaciones sutiles, carga diferida de scripts, optimización de fuentes e imágenes con formato AVIF/WebP. Incluye integración analítica respetuosa con la privacidad y pruebas A/B de páginas de aterrizaje.',
    highlights: [
      'Carga diferida inteligente y priorización crítica de recursos (Fetch Priority)',
      'Estrategia de metadatos dinámicos por ruta para snippets enriquecidos en Google',
      'Diseño responsive adaptativo con soporte para temas oscuro y claro nativo'
    ],
    metrics: [
      { label: 'First Contentful Paint', value: '0.4s' },
      { label: 'Tasa de rebote', value: '-35%' },
      { label: 'Conversión móvil', value: '+42%' }
    ],
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Lucide', 'Edge Functions', 'SEO On-Page'],
    githubUrl: 'https://github.com/readmin803',
    demoUrl: '',
    featured: false,
    architectureNote: 'Arquitectura headless desacoplada con SSR y componentes React optimizados'
  },

  // --- AUTOMATIZACIONES Y FLUJOS CON N8N ---
  {
    id: 'n8n-lead-intelligence',
    title: 'Pipeline Autónomo de Enriquecimiento y Cualificación de Leads con n8n & LLMs',
    category: 'n8n',
    categoryLabel: 'n8n & Automatizaciones',
    badgeColor: 'emerald',
    shortDescription: 'Sistema end-to-end de recepción de webhooks, enriquecimiento inteligente con APIs de IA y sincronización en tiempo real con CRM y canales corporativos.',
    fullDescription: 'Flujo de trabajo de alta disponibilidad diseñado en n8n self-hosted para procesar eventos en tiempo real. Captura leads desde formularios web mediante webhooks autenticados, valida y normaliza datos, consulta APIs externas de enriquecimiento empresarial y ejecuta clasificación semántica mediante modelos de IA para asignar automáticamente puntuación (lead scoring) y alertar al equipo comercial.',
    highlights: [
      'Gestión robusta de reintentos (retry on fail) y dead-letter queues',
      'Integración fluida con modelos OpenAI / Claude para clasificación de intenciones',
      'Despliegue contenerizado en Docker con volumen persistente y monitorización'
    ],
    metrics: [
      { label: 'Tiempo de respuesta', value: '< 1.8s' },
      { label: 'Ahorro de gestión manual', value: '85%' },
      { label: 'Uptime del flujo', value: '99.9%' }
    ],
    tags: ['n8n', 'Webhooks', 'Docker', 'AI APIs', 'PostgreSQL', 'Slack API'],
    githubUrl: 'https://github.com/readmin803',
    demoUrl: '',
    featured: true,
    architectureNote: 'Docker compose con n8n, worker redis y webhook reverse proxy con SSL'
  },
  {
    id: 'n8n-multi-sync-engine',
    title: 'Motor de Sincronización Bidireccional de Inventario y Pedidos',
    category: 'n8n',
    categoryLabel: 'n8n & Automatizaciones',
    badgeColor: 'emerald',
    shortDescription: 'Automatización crítica para sincronizar catálogos, stock y estados de pedidos entre múltiples plataformas de venta y bases de datos centrales.',
    fullDescription: 'Orquestación de micro-flujos en n8n que unifica la gestión de existencias entre tiendas online y ERP central. Incluye control de concurrencia, balanceo de rate-limits en APIs REST de terceros y notificaciones instantáneas ante discrepancias o roturas de stock.',
    highlights: [
      'Mapeo dinámico de esquemas JSON con transformaciones JavaScript nativas en n8n',
      'Control estricto de concurrencia para evitar condiciones de carrera en ventas simultáneas',
      'Generación de logs centralizados y alertas proactivas a través de Telegram/Discord bots'
    ],
    metrics: [
      { label: 'Sincronización de stock', value: 'Tiempo real' },
      { label: 'Discrepancias eliminadas', value: '100%' },
      { label: 'Eventos diarios procesados', value: '+12,000' }
    ],
    tags: ['n8n', 'REST APIs', 'Webhooks', 'JSON Data Mapper', 'MySQL', 'Telegram Bot'],
    githubUrl: 'https://github.com/readmin803',
    demoUrl: '',
    featured: false,
    architectureNote: 'Orquestador de cron triggers + webhooks para consistencia eventual'
  },

  // --- PHP Y APLICACIONES WEB ---
  {
    id: 'php-enterprise-crm',
    title: 'Plataforma Web de Gestión Empresarial y Administración en PHP',
    category: 'php',
    categoryLabel: 'PHP & Aplicaciones Web',
    badgeColor: 'indigo',
    shortDescription: 'Sistema web robusto con arquitectura MVC modular, gestión integral de clientes, facturación y control granular de roles y permisos.',
    fullDescription: 'Aplicación web empresarial desarrollada en PHP moderno con orientación a objetos (OOP) estricta, arquitectura desacoplada y base de datos relacional optimizada con índices y transacciones ACID. Incluye generación de reportes PDF bajo demanda, auditoría de cambios y autenticación segura con JWT y protección CSRF/XSS.',
    highlights: [
      'Arquitectura MVC limpia siguiendo principios SOLID y patrones de diseño (Repository, Service)',
      'Panel de control reactivo con filtros avanzados, exportación de datos y dashboards visuales',
      'Módulo de roles y permisos granulares (RBAC) para diferentes niveles de usuario'
    ],
    metrics: [
      { label: 'PHP Version', value: '8.x Modern' },
      { label: 'Transacciones/seg', value: 'Alta concurrencia' },
      { label: 'Seguridad', value: 'A+ Audit' }
    ],
    tags: ['PHP 8', 'MVC', 'MySQL', 'REST API', 'JavaScript', 'Bootstrap / Tailwind', 'Docker'],
    githubUrl: 'https://github.com/readmin803',
    demoUrl: '',
    featured: true,
    architectureNote: 'Diseño en capas (Domain, Infrastructure, Presentation) con Composer'
  },
  {
    id: 'php-legacy-refactor-api',
    title: 'Refactorización y API REST de Alto Rendimiento en PHP',
    category: 'php',
    categoryLabel: 'PHP & Aplicaciones Web',
    badgeColor: 'indigo',
    shortDescription: 'Modernización de un sistema legado a PHP 8.x con creación de capa API REST para consumo frontend y clientes móviles.',
    fullDescription: 'Proyecto de ingeniería de software enfocado en la migración de código monolítico antiguo a una arquitectura limpia basada en estándares PSR. Implementación de una API RESTful documentada con Swagger/OpenAPI, middleware de autenticación por tokens y caché de consultas con Redis.',
    highlights: [
      'Migración segura sin tiempo de inactividad garantizando retrocompatibilidad de datos',
      'Incorporación de capa de validación de entradas estrictas y control global de excepciones',
      'Optimización de consultas SQL complejas reduciendo tiempos de carga de base de datos en un 60%'
    ],
    metrics: [
      { label: 'Tiempo de consulta SQL', value: '-60%' },
      { label: 'Compatibilidad', value: 'PSR-12 / PSR-7' },
      { label: 'Disponibilidad en migración', value: '100%' }
    ],
    tags: ['PHP 8', 'RESTful API', 'Redis Cache', 'PDO MySQL', 'Swagger / OpenAPI', 'Unit Testing'],
    githubUrl: 'https://github.com/readmin803',
    demoUrl: '',
    featured: false,
    architectureNote: 'Capa de abstracción con repositorios y contratos de interfaz'
  }
]
