/**
 * @file education.data.ts
 * @description Datos tipados de formación académica y certificaciones profesionales.
 * Capa: Infrastructure / Data
 */

import type { EducationItem } from '../../core/domain/education.model';

export const educationData: readonly EducationItem[] = [
  {
    id: 'maestria',
    period: '2025',
    degree: 'Maestría en Habilidades Directivas',
    institution: 'Universidad Mexicana'
  },
  {
    id: 'especialidad',
    period: '2024 - 2025',
    degree: 'Especialidad en Habilidades Directivas',
    institution: 'Universidad Mexicana'
  },
  {
    id: 'licenciatura',
    period: '2020 - 2023',
    degree: 'Licenciatura en Sistemas Computacionales',
    institution: 'Universidad Mexicana'
  },
  {
    id: 'bachillerato',
    period: '2008 - 2011',
    degree: 'Bachillerato Técnico en Programación',
    institution: 'Universidad Bancaria de México'
  }
];
