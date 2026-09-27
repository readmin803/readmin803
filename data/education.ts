export interface EducationItem {
  title: string
  subtitle: string
  year: string
  icon: string
}

export interface CertificationItem {
  name: string
  org: string
  year: string
}

export interface ExperienceItem {
  role: string
  period: string
  description: string
  highlights: string[]
}

export const EDUCATION: EducationItem[] = [
  {
    title: 'Bachillerato',
    subtitle: 'Modalidad Tecnológico',
    year: '2005',
    icon: 'graduation'
  },
  {
    title: 'Ciclo Grado Superior',
    subtitle: 'Administración de Sistemas Informáticos',
    year: '2008',
    icon: 'graduation'
  }
]

export const CERTIFICATIONS: CertificationItem[] = [
  { name: 'CCNA', org: 'Cisco Certified Network Associate', year: '' },
  { name: 'MTCNA', org: 'MikroTik Certified Network Associate', year: '' },
  { name: 'MCSA', org: 'Microsoft Certified Solutions Associate', year: '' }
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Técnico Informático — Sistemas Informáticos',
    period: '2025 — Actualidad',
    description: 'Soporte y administración de virtualización con VMware ESXi y Proxmox, configuración RAID, ZFS, copias de seguridad con Active Backup de Sygnology, despliegue de redes con fibra óptica, video vigilancia IP y WiFi. Soporte en hardware, cambio de placas, pantallas y equipos. Configuración de servidores, RDP, SMB, OpenVPN y Wireguard. Mantenimiento tecnológico integral en centros educativos con Intune, AAD y Linewize.',
    highlights: [
      'VMware ESXi · Proxmox · RAID · ZFS',
      'Fibra óptica · Vigilancia IP · WiFi',
      'Servidores · RDP · SMB · OpenVPN · Wireguard',
      'Intune · AAD · Linewize'
    ]
  },
  {
    role: 'Técnico Informático',
    period: '2014 — 2025',
    description: 'Soporte hardware y software para equipos informáticos y servicio técnico de dispositivos móviles. Instalación y configuración de infraestructura de red: fibra óptica, videovigilancia IP, diseño y despliegue de soluciones WiFi con estudios de cobertura, configuración de puntos de acceso, repetidores y radioenlaces.',
    highlights: [
      'Fibra óptica · Videovigilancia IP',
      'WiFi: Ubiquiti, MikroTik, Grandstream, Ruijie, Cambium, Cisco',
      'Estudios de cobertura · Puntos de acceso · Radioenlaces'
    ]
  },
  {
    role: 'Diseñador Web Frontend/Backend',
    period: '2008 — Actualidad',
    description: 'Creación y mantenimiento de sitios web con desarrollo frontend y backend, SEO, diseño gráfico y audiovisual, tiendas online.',
    highlights: [
      'Frontend · Backend · SEO',
      'Diseño gráfico y audiovisual',
      'Tiendas online'
    ]
  }
]

export const LANGUAGES = [
  { lang: 'Castellano', level: 'Nativo' },
  { lang: 'Inglés', level: 'Avanzado' }
]

export const PROFESSIONAL_SKILLS = [
  'Redes LAN: montaje y cableado de racks, switches, routers y firewalls (Fortinet)',
  'Redes WiFi: despliegue, configuración y soporte de redes inalámbricas',
  'Soporte técnico avanzado en entornos Windows, servidores y redes',
  'Acceso remoto: RDP, SMB, NAS, copias de seguridad, Sys RAID',
  'TPV: soporte básico, especialidad Micros/Oracle/AgoraPOS',
  'Impresoras: mantenimiento básico y resolución de incidencias',
  'Capacidad de adaptación y buen trato en entornos exigentes'
]
