/**
 * @file skill.model.ts
 * @description Modelo para competencias técnicas, lenguajes, frameworks y herramientas.
 * Capa: Core / Domain
 */

export interface SkillItem {
  readonly name: string;
  readonly deviconClass?: string;
  readonly iconUrl?: string;
}

export interface SkillCategory {
  readonly categoryName: string;
  readonly skills: readonly SkillItem[];
  readonly chips?: readonly string[];
}
