/**
 * @file education.model.ts
 * @description Modelo de datos para títulos académicos y formación profesional.
 * Capa: Core / Domain
 */

export interface EducationItem {
  readonly id: string;
  readonly period: string;
  readonly degree: string;
  readonly institution: string;
  readonly description?: string;
}
