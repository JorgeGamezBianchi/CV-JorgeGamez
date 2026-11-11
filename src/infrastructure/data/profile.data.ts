/**
 * @file profile.data.ts
 * @description Datos estructurados y tipados del perfil profesional de Jorge Gámez.
 * Capa: Infrastructure / Data
 */

import type { Profile } from '../../core/domain/profile.model';

export const profileData: Profile = {
  name: 'Jorge Gámez',
  shortName: 'Jorge G.',
  titles: [
    'Desarrollador Full-Stack',
    "Técnico en PC's",
    'Gamer',
    'Biker'
  ],
  headline: 'Full-Stack .NET Developer · Software Engineer · AI & Automation Enthusiast',
  bioSummary:
    'Desarrollador Full-Stack con más de 4 años de trayectoria creando soluciones empresariales robustas, sistemas ERP y CRM con .NET y SQL Server. Enfocado en Clean Architecture, Clean Code y optimización de rendimiento.',
  cvPdfPath: '/resources/CV-JorgeGamez.pdf',
  avatarUrl: '/resources/Foto-Formal-Perfil.jpg',
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/JorgeGamezBianchi',
      iconClass: 'bx bxl-github',
      ariaLabel: 'Perfil de GitHub de Jorge Gámez'
    },
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/jorgegámez',
      iconClass: 'bx bxl-linkedin',
      ariaLabel: 'Perfil de LinkedIn de Jorge Gámez'
    }
  ],
  details: {
    fullName: 'Jorge A. Gámez Bianchi',
    birthDate: '1993-02-11',
    careerStartDate: '2022-02-01',
    maritalStatus: 'Casado',
    location: 'Cuautitlán, México',
    isFreelanceAvailable: true
  }
};
