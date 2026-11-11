/**
 * @file service.model.ts
 * @description Modelo de servicios profesionales ofrecidos a clientes y empresas.
 * Capa: Core / Domain
 */

export interface ProfessionalService {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly iconClass: string;
  readonly actionUrl?: string;
}
