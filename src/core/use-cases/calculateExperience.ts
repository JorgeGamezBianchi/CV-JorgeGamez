/**
 * @file calculateExperience.ts
 * @description Caso de uso para calcular de forma precisa y dinámica los años transcurridos
 * desde una fecha determinada (ej: edad, años de experiencia laboral).
 * Capa: Core / Use Cases (Lógica pura sin dependencias del DOM).
 */

/**
 * Calcula los años transcurridos desde una fecha dada hasta el momento actual.
 * Toma en cuenta día y mes para no sumar un año antes del aniversario.
 * 
 * @param dateStr Cadena de fecha en formato ISO (YYYY-MM-DD)
 * @param referenceDate Fecha de referencia opcional (por defecto: hoy)
 * @returns Número entero con los años cumplidos
 */
export function calculateYearsSince(dateStr: string, referenceDate: Date = new Date()): number {
  const targetDate = new Date(dateStr);
  
  if (isNaN(targetDate.getTime())) {
    throw new Error(`[calculateYearsSince] Fecha inválida proporcionada: "${dateStr}"`);
  }

  let years = referenceDate.getFullYear() - targetDate.getFullYear();
  
  const currentMonth = referenceDate.getMonth();
  const targetMonth = targetDate.getMonth();
  const currentDate = referenceDate.getDate();
  const targetDay = targetDate.getDate();

  const anniversaryPassed =
    currentMonth > targetMonth ||
    (currentMonth === targetMonth && currentDate >= targetDay);

  if (!anniversaryPassed) {
    years--;
  }

  return Math.max(0, years);
}

/**
 * Formatea la edad calculada para presentación al usuario.
 */
export function formatAge(birthDateStr: string, referenceDate?: Date): string {
  const years = calculateYearsSince(birthDateStr, referenceDate);
  return `${years} años`;
}

/**
 * Formatea los años de experiencia para presentación (ej: "4+ años").
 */
export function formatExperience(startDateStr: string, referenceDate?: Date): string {
  const years = calculateYearsSince(startDateStr, referenceDate);
  return `${years}+ años`;
}
