/**
 * @file projects.data.ts
 * @description Datos estructurados de los proyectos exhibidos en el carrusel de portfolio.
 * Capa: Infrastructure / Data
 */

import type { PortfolioProject } from '../../core/domain/project.model';

export const projectsData: readonly PortfolioProject[] = [
  {
    id: 'sistema-erp',
    number: '01',
    title: 'Sistema ERP Empresarial',
    description:
      'Sistema integral de gestión empresarial con módulos de facturación, inventarios, compras y reportes financieros desarrollado con ASP.NET MVC, C# y SQL Server.',
    technologies: ['C#', 'ASP.NET MVC', 'SQL Server', 'Entity Framework'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JorgeGamezBianchi',
    imageUrl: '/resources/pinto.jpg',
    imageAlt: 'Captura del proyecto Sistema ERP Empresarial'
  },
  {
    id: 'crm-gestion-clientes',
    number: '02',
    title: 'CRM para Gestión de Clientes',
    description:
      'Plataforma CRM orientada a seguimiento de prospectos, automatización de embudos de ventas e integración de notificaciones y analítica en tiempo real.',
    technologies: ['ASP.NET Core', 'Web API', 'JavaScript', 'Bootstrap'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JorgeGamezBianchi',
    imageUrl: '/resources/kira.jpg',
    imageAlt: 'Captura del proyecto CRM para Gestión de Clientes'
  },
  {
    id: 'api-seguridad-roles',
    number: '03',
    title: 'REST API con Autenticación JWT',
    description:
      'Servicio backend seguro con control de acceso basado en roles (RBAC), tokens JWT, cifrado de contraseñas y arquitectura en capas con principios SOLID.',
    technologies: ['C#', '.NET Core', 'JWT', 'SQL Server'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JorgeGamezBianchi',
    imageUrl: '/resources/hacker-red.jpeg',
    imageAlt: 'Captura del proyecto REST API con Autenticación'
  },
  {
    id: 'mobile-flutter-app',
    number: '04',
    title: 'App Móvil de Gestión Operativa',
    description:
      'Aplicación multiplataforma para control de inventario y pedidos en almacén con soporte offline y sincronización mediante REST API.',
    technologies: ['Flutter', 'Dart', 'REST API', 'Android'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JorgeGamezBianchi',
    imageUrl: '/resources/AndroidFlutter.jpeg',
    imageAlt: 'Captura del proyecto App Móvil de Gestión Operativa'
  },
  {
    id: 'automatizacion-ai-n8n',
    number: '05',
    title: 'Automatización de Flujos con IA',
    description:
      'Integración de modelos LLM con n8n y webhooks para clasificación automática de correos, generación de minutas y sincronización con bases de datos.',
    technologies: ['n8n', 'Python', 'OpenAI API', 'Docker'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JorgeGamezBianchi',
    imageUrl: '/resources/happy-hacker.jpeg',
    imageAlt: 'Captura del proyecto Automatización de Flujos con IA'
  },
  {
    id: 'portfolio-astro-modern',
    number: '06',
    title: 'Portfolio con Clean Architecture',
    description:
      'Sitio interactivo SPA construido con Astro 5, TypeScript estricto, Clean Architecture, cabeceras de seguridad CSP y validación antispam.',
    technologies: ['Astro', 'TypeScript', 'Clean Architecture', 'CSS3'],
    liveUrl: '#/inicio',
    githubUrl: 'https://github.com/JorgeGamezBianchi/CV-JorgeGamez',
    imageUrl: '/resources/MangaBeto.jpg',
    imageAlt: 'Captura del proyecto Portfolio con Clean Architecture'
  }
];
