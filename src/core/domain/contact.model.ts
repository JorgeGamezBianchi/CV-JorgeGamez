/**
 * @file contact.model.ts
 * @description Modelos para solicitudes de contacto, validación y respuesta.
 * Capa: Core / Domain
 */

export interface ContactFormData {
  readonly fullName: string;
  readonly phone: string;
  readonly email: string;
  readonly message: string;
  /** Campo señuelo invisible (Honeypot) para detener bots de spam */
  readonly honeypot?: string;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: Partial<Record<keyof ContactFormData, string>>;
  readonly sanitizedData?: ContactFormData;
}

export interface SendEmailResponse {
  readonly success: boolean;
  readonly message: string;
  readonly timestamp: number;
}
