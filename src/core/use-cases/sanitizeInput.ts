/**
 * @file sanitizeInput.ts
 * @description Utilidades de seguridad informática para sanitizar y limpiar entradas de usuario,
 * previniendo ataques de Cross-Site Scripting (XSS), inyección de caracteres y sobrecarga de payloads.
 * Capa: Core / Use Cases (Seguridad)
 */

/**
 * Escapa caracteres HTML especiales para evitar que el navegador o clientes de correo
 * interpreten entradas maliciosas como etiquetas ejecutables.
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Limpia y recorta una cadena de texto, limitándola a una longitud máxima segura.
 */
export function sanitizeString(input: unknown, maxLength: number = 500): string {
  if (typeof input !== 'string') return '';
  const trimmed = input.trim();
  const safeLength = Math.max(0, maxLength);
  const bounded = trimmed.slice(0, safeLength);
  return sanitizeHtml(bounded);
}
