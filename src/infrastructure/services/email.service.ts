/**
 * @file email.service.ts
 * @description Servicio adaptador de infraestructura para el envío seguro de correos.
 * Aísla las llamadas a EmailJS del resto de la aplicación, protegiendo credenciales
 * e implementando control de frecuencia (Rate Limiting) en cliente.
 * Capa: Infrastructure / Services
 */

import emailjs from '@emailjs/browser';
import type { ContactFormData, SendEmailResponse } from '../../core/domain/contact.model';

// Tiempo mínimo requerido entre envíos para prevenir spam y sobrecostos (30 segundos)
const SUBMISSION_COOLDOWN_MS = 30000;
let lastSubmissionTimestamp = 0;

/**
 * Obtiene las variables de entorno para EmailJS de forma segura.
 * Utiliza import.meta.env provisto por Astro/Vite.
 */
function getEmailConfig() {
  const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || '';
  const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || '';
  const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID || '';

  return {
    publicKey,
    serviceId,
    templateId,
    isConfigured: Boolean(publicKey && serviceId && templateId)
  };
}

/**
 * Envía un mensaje de contacto a través de la infraestructura de correo configurada.
 *
 * @param sanitizedData Datos previamente sanitizados y validados por el caso de uso
 * @returns Promesa con el resultado de la operación
 */
export async function sendContactEmail(sanitizedData: ContactFormData): Promise<SendEmailResponse> {
  const now = Date.now();

  // 1. Verificación de Rate Limiting (anti-flood en el cliente)
  if (now - lastSubmissionTimestamp < SUBMISSION_COOLDOWN_MS) {
    const remainingSeconds = Math.ceil((SUBMISSION_COOLDOWN_MS - (now - lastSubmissionTimestamp)) / 1000);
    return {
      success: false,
      message: `Por favor espera ${remainingSeconds} segundos antes de enviar otro mensaje.`,
      timestamp: now
    };
  }

  // 2. Obtención de credenciales
  const config = getEmailConfig();

  if (!config.isConfigured) {
    console.warn(
      '[EmailService] Advertencia de configuración: Las variables de entorno de EmailJS no están definidas.'
    );
    return {
      success: false,
      message: 'El servicio de contacto no está configurado temporalmente. Por favor intenta por LinkedIn o GitHub.',
      timestamp: now
    };
  }

  try {
    // 3. Inicialización segura con la Public Key
    emailjs.init({
      publicKey: config.publicKey
    });

    // 4. Parámetros estrictamente mapeados
    const templateParams = {
      from_name: sanitizedData.fullName,
      from_email: sanitizedData.email,
      phone: sanitizedData.phone,
      message: sanitizedData.message
    };

    // 5. Envío mediante SDK
    await emailjs.send(config.serviceId, config.templateId, templateParams);

    lastSubmissionTimestamp = Date.now();

    return {
      success: true,
      message: '¡Mensaje enviado con éxito! Me comunicaré contigo lo más pronto posible.',
      timestamp: lastSubmissionTimestamp
    };
  } catch (error) {
    console.error('[EmailService] Error al enviar mensaje:', error);
    return {
      success: false,
      message: 'Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo más tarde.',
      timestamp: Date.now()
    };
  }
}
