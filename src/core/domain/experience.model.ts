/**
 * @file experience.model.ts
 * @description Modelo de datos para trayectoria y experiencia profesional.
 * Capa: Core / Domain
 */

export interface WorkExperience {
  readonly id: string;
  readonly period: string;
  readonly role: string;
  readonly company: string;
  readonly highlights: readonly string[];
  readonly isCurrent?: boolean;
}
