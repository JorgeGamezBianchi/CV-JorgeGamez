/**
 * @file services.data.ts
 * @description Datos tipados de los servicios profesionales ofrecidos.
 * Capa: Infrastructure / Data
 */

import type { ProfessionalService } from '../../core/domain/service.model';

export const servicesData: readonly ProfessionalService[] = [
  {
    id: 'web-development',
    title: 'Desarrollo Web',
    description:
      'Diseño y construcción de aplicaciones web y plataformas empresariales escalables con ASP.NET Core, MVC, APIs RESTful y arquitecturas limpias optimizadas para alta concurrencia.',
    iconClass: 'bx bx-code-alt',
    actionUrl: '#/contact'
  },
  {
    id: 'pc-repair',
    title: "Reparación de PC's",
    description:
      'Diagnóstico profesional, mantenimiento preventivo y correctivo, ensamblado personalizado de equipos de cómputo y optimización de hardware y software.',
    iconClass: 'bx bxs-wrench',
    actionUrl: '#/contact'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description:
      'Creación de interfaces de usuario modernas, intuitivas y totalmente responsivas centradas en la mejor experiencia para el usuario final y la accesibilidad web.',
    iconClass: 'bx bx-palette',
    actionUrl: '#/contact'
  },
  {
    id: 'phone-repair',
    title: 'Reparación de celulares',
    description:
      'Diagnóstico especializado, sustitución de componentes, cambio de baterías y pantallas, y resolución de incidencias en dispositivos móviles.',
    iconClass: 'bx bx-mobile-alt',
    actionUrl: '#/contact'
  },
  {
    id: 'database-optimization',
    title: 'Optimización de Bases de Datos',
    description:
      'Auditoría y optimización de consultas SQL Server, creación de Stored Procedures, índices y vistas de alto rendimiento para acelerar tiempos de respuesta.',
    iconClass: 'bx bxs-data',
    actionUrl: '#/contact'
  },
  {
    id: 'automation-ai',
    title: 'Automatización con IA',
    description:
      'Implementación de flujos de trabajo inteligentes, scripts de automatización con n8n y herramientas de IA generativa para maximizar la productividad operativa.',
    iconClass: 'bx bx-chip',
    actionUrl: '#/contact'
  }
];
