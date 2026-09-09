# Portafolio Profesional · Raúl Engracia ([re]admin)

> **Nick**: `readmin` (`re` = Raúl Engracia)  
> **GitHub**: [@readmin803](https://github.com/readmin803)  
> **Especialidades**: Automatizaciones n8n, Next.js (SEO & IA / GEO), PHP Moderno y Fullstack.

Portafolio web interactivo de alto rendimiento construido con **Nuxt 3**, **Tailwind CSS**, **TypeScript** y **Lucide Icons**, optimizado para presentación a empresas y preparado para despliegue automático en **Vercel**.

---

## 🚀 Puesta en marcha local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

3. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 📂 ¿Cómo personalizar y rellenar tu contenido?

### 1. Añadir o editar Proyectos (`data/projects.ts`)
Abre el archivo `data/projects.ts`. Cada proyecto es un objeto con la siguiente estructura:
- `category`: `'n8n'` | `'nextjs-seo'` | `'php'` | `'fullstack'`
- `title`: Título del proyecto o caso de estudio.
- `shortDescription`: Resumen visible de un vistazo.
- `fullDescription`: Explicación detallada (aparece al pulsar "Más detalles").
- `highlights`: Logros técnicos o características clave con iconos de verificación.
- `metrics`: Métricas de impacto (ej: `85% ahorro de tiempo`, `100/100 Lighthouse`).
- `tags`: Etiquetas tecnológicas (`#n8n`, `#Next.js`, `#PHP8`, etc.).
- `githubUrl`: Enlace directo a tu repositorio de GitHub (ej: `https://github.com/readmin803/tu-repo`).
- `demoUrl`: Enlace a la demo en vivo si está desplegada.

### 2. Actualizar tu Currículum Vitae (CV)
Reemplaza el archivo `public/cv-placeholder.pdf` con tu CV real en formato PDF manteniendo ese mismo nombre (o actualizando la ruta en `components/sections/ContactSection.vue`).

### 3. Personalizar Correo de Contacto
En `components/sections/ContactSection.vue` y `components/layout/TheFooter.vue`, actualiza la variable `contactEmail` con tu dirección de correo electrónico real.

---

## 🌐 Despliegue en Vercel

Este proyecto utiliza el preset nativo para Vercel:
1. Sube este repositorio a tu cuenta de GitHub: `readmin803/readmin803`.
2. Conecta el repositorio en [Vercel](https://vercel.com).
3. Vercel detectará Nuxt automáticamente y lo desplegará con Serverless / Edge functions y CDN global.
