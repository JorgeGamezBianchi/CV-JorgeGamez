/**
 * @file project.model.ts
 * @description Modelo de proyectos destacados para el portfolio interactivo.
 * Capa: Core / Domain
 */

export interface PortfolioProject {
  readonly id: string;
  readonly number: string; // Ej: "01", "02"
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
}
