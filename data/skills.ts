export interface SkillPillar {
  title: string
  techs: string
  description: string
  icon: 'workflow' | 'code' | 'database'
}

export const SKILL_PILLARS: SkillPillar[] = [
  {
    title: 'Automatizaciones n8n',
    techs: 'n8n · Webhooks · APIs REST · LLMs (OpenAI / Claude)',
    description: 'Flujos que eliminan tareas manuales: enriquecimiento de leads, scoring automático y sincronización entre plataformas.',
    icon: 'workflow'
  },
  {
    title: 'Desarrollo Web Fullstack',
    techs: 'Vue 3 · Nuxt 3 · JavaScript (ES6+) · Tailwind CSS · Nitro / Node.js',
    description: 'Aplicaciones web completas: interfaz modular, lógica de servidor y consumo de APIs REST. Incluye juegos 2D con Phaser.js y PixiJS.',
    icon: 'code'
  },
  {
    title: 'Sistemas & Bases de Datos',
    techs: 'Docker · PostgreSQL / MySQL · Linux · Mantenimiento de programas técnicos',
    description: 'Administración de bases de datos, despliegue con contenedores y mantenimiento de sistemas y aplicaciones técnicas.',
    icon: 'database'
  }
]
