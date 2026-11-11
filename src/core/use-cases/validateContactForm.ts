/**
 * @file validateContactForm.ts
 * @description Caso de uso para validar rigurosamente los datos del formulario de contacto
 * antes de procesar o enviar peticiones a servicios externos.
 * Capa: Core / Use Cases (Seguridad y Validación)
 */

import type { ContactFormData, ValidationResult } from '../domain/contact.model';
import { sanitizeString } from './sanitizeInput';

// Expresión regular estándar y segura para emails (RFC 5322 compatible simplificada)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

// Expresión regular para validar teléfonos internacionales o locales (entre 7 y 20 caracteres)
const PHONE_REGEX = /^[+0-9\s\-()]{7,20}$/;

/**
 * Valida los campos ingresados en el formulario de contacto.
 * Incluye verificación de Honeypot antispam para bots automatizados.
 *
 * @param rawData Datos sin sanitizar recibidos del formulario
 * @returns ValidationResult con el estado de validez, errores y datos limpios
 */
export function validateContactForm(rawData: Partial<ContactFormData>): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  // 1. Verificación de Honeypot (Trampa antispam)
  // Si un bot completa este campo oculto, invalidamos la solicitud inmediatamente
  if (rawData.honeypot && rawData.honeypot.trim().length > 0) {
    return {
      isValid: false,
      errors: {
        honeypot: 'Actividad automatizada detectada.'
      }
    };
  }

  // 2. Sanitización y validación del Nombre
  const rawName = typeof rawData.fullName === 'string' ? rawData.fullName.trim() : '';
  if (!rawName) {
    errors.fullName = 'El nombre es obligatorio.';
  } else if (rawName.length < 2) {
    errors.fullName = 'El nombre debe contener al menos 2 caracteres.';
  } else if (rawName.length > 80) {
    errors.fullName = 'El nombre no puede exceder los 80 caracteres.';
  }

  // 3. Sanitización y validación del Teléfono
  const rawPhone = typeof rawData.phone === 'string' ? rawData.phone.trim() : '';
  if (!rawPhone) {
    errors.phone = 'El teléfono es obligatorio.';
  } else if (!PHONE_REGEX.test(rawPhone)) {
    errors.phone = 'Ingrese un número telefónico válido (mínimo 7 dígitos).';
  }

  // 4. Sanitización y validación del Correo Electrónico
  const rawEmail = typeof rawData.email === 'string' ? rawData.email.trim() : '';
  if (!rawEmail) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!EMAIL_REGEX.test(rawEmail) || rawEmail.length > 100) {
    errors.email = 'Ingrese un correo electrónico válido.';
  }

  // 5. Sanitización y validación del Mensaje
  const rawMessage = typeof rawData.message === 'string' ? rawData.message.trim() : '';
  if (!rawMessage) {
    errors.message = 'El mensaje no puede estar vacío.';
  } else if (rawMessage.length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  } else if (rawMessage.length > 2000) {
    errors.message = 'El mensaje no puede exceder los 2000 caracteres.';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    sanitizedData: isValid
      ? {
          fullName: sanitizeString(rawName, 80),
          phone: sanitizeString(rawPhone, 25),
          email: sanitizeString(rawEmail, 100),
          message: sanitizeString(rawMessage, 2000)
        }
      : undefined
  };
}
