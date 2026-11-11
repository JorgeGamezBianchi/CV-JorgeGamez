/**
 * @file site.config.ts
 * @description Configuración centralizada de metadatos del sitio, SEO, OpenGraph y autor.
 * Capa: Core / Config
 */

export const siteConfig = {
  name: 'Jorge Gámez Bianchi',
  title: 'Jorge Gámez | Full-Stack .NET Developer & Software Engineer',
  description: 'Portfolio profesional y CV interactivo de Jorge Gámez Bianchi, desarrollador Full-Stack .NET especializado en Clean Architecture, ASP.NET MVC, C#, SQL Server y optimización de sistemas empresariales.',
  url: 'https://jorgegamez.vercel.app',
  defaultLanguage: 'es',
  locale: 'es_MX',
  themeColor: '#1f242d',
  accentColor: '#7cf03d',
  author: {
    name: 'Jorge Gámez Bianchi',
    role: 'Full-Stack .NET Developer',
    location: 'Cuautitlán, Estado de México',
    github: 'https://github.com/JorgeGamezBianchi',
    linkedin: 'https://www.linkedin.com/in/jorgegámez'
  },
  routes: [
    { id: 'inicio', label: 'Inicio', href: '#/inicio' },
    { id: 'about', label: 'Sobre mi', href: '#/about' },
    { id: 'servicios', label: 'Servicios', href: '#/servicios' },
    { id: 'portfolio', label: 'Portfolio', href: '#/portfolio' },
    { id: 'contact', label: 'Contacto', href: '#/contact' }
  ]
} as const;
