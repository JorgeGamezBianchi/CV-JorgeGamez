/**
 * @file experience.data.ts
 * @description Datos tipados de la trayectoria laboral y proyectos empresariales.
 * Capa: Infrastructure / Data
 */

import type { WorkExperience } from '../../core/domain/experience.model';

export const experienceData: readonly WorkExperience[] = [
  {
    id: 'asf-softlution',
    period: 'Sep 2023 - Actual',
    role: 'Desarrollador .NET Full-Stack',
    company: 'ASF Softlution',
    isCurrent: true,
    highlights: [
      'Desarrollo Front-End y Back-End con arquitectura ASP.NET MVC en entornos productivos.',
      'Implementación y prueba de nuevos módulos con Entity Framework 6 (EF6), LINQ y ADO.NET sobre SQL Server.',
      'Optimización de base de datos productiva mediante Stored Procedures y ajuste de queries, logrando una mejora de rendimiento del 20%.',
      'Refactorización de código legacy aplicando principios SOLID y Clean Architecture.',
      'Mantenimiento y mejora de aplicación móvil Android (Kotlin / Jetpack Compose).',
      'Integración de herramientas de Inteligencia Artificial (Claude Code, Gemini CLI, Antigravity) para automatizar y acelerar flujos de trabajo internos.',
      'Gestión y administración directa de base de datos en ambiente productivo (SQL Server).'
    ]
  },
  {
    id: 'med-marketing',
    period: 'Ago 2022 - Jul 2023',
    role: 'Desarrollador .NET Jr.',
    company: 'Med Marketing',
    highlights: [
      'Desarrollo Full-Stack de módulos para sistemas CRM y ERP empresarial con ASP.NET MVC y C#.',
      'Diseño e implementación de Stored Procedures, Triggers y Vistas en SQL Server, optimizando el rendimiento de queries en un 30% y garantizando la integridad de los datos.',
      'Implementación de REST APIs para integración entre sistemas internos y terceros.',
      'Atención de incidencias de producción, análisis de causa raíz y entrega de mejoras según requerimientos de usuarios finales.',
      'Cobertura de pruebas funcionales en nuevos módulos previo a pase a producción.'
    ]
  },
  {
    id: 'transportes-medrano',
    period: 'Feb 2022 - Ago 2022',
    role: 'Desarrollador Becario',
    company: 'Transportes Medrano',
    highlights: [
      'Desarrollo de módulos personalizados en .NET para distintas áreas del negocio.',
      'Diseño y mantenimiento de REST APIs para integración entre sistemas.',
      'Desarrollo y mantenimiento de aplicaciones móviles Android con Flutter y Dart.',
      'Creación de Stored Procedures para gestión eficiente de operaciones CRUD.',
      'Aplicación de buenas prácticas de Clean Code y versionamiento con Git / GitHub.'
    ]
  }
];
