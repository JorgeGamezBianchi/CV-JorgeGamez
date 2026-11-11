/**
 * @file contactFormController.ts
 * @description Controlador del formulario de contacto: validaciones de seguridad, honeypot y alertas SweetAlert2.
 * Capa: Presentation / Scripts
 */

import Swal from 'sweetalert2';
import { validateContactForm } from '../../core/use-cases/validateContactForm';
import { sendContactEmail } from '../../infrastructure/services/email.service';

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  if (!form) return;

  const nameInput = form.querySelector<HTMLInputElement>('#name');
  const numberInput = form.querySelector<HTMLInputElement>('#number');
  const mailInput = form.querySelector<HTMLInputElement>('#mail');
  const messageInput = form.querySelector<HTMLTextAreaElement>('#message');
  const honeypotInput = form.querySelector<HTMLInputElement>('#company_security_code');
  const submitBtn = form.querySelector<HTMLButtonElement>('#submit-btn');

  if (!nameInput || !numberInput || !mailInput || !messageInput) return;

  const setFieldError = (input: HTMLElement, hasError: boolean, customMsg?: string) => {
    const parent = input.parentElement;
    if (hasError) {
      input.classList.add('error');
      parent?.classList.add('error');
      if (customMsg) {
        const errorTxt = parent?.querySelector('.error-txt');
        if (errorTxt) errorTxt.textContent = customMsg;
      }
    } else {
      input.classList.remove('error');
      parent?.classList.remove('error');
    }
  };

  // Validación dinámica al escribir
  [nameInput, numberInput, mailInput, messageInput].forEach((field) => {
    field.addEventListener('input', () => {
      if (field.value.trim().length > 0) {
        setFieldError(field, false);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const rawFormData = {
      fullName: nameInput.value,
      phone: numberInput.value,
      email: mailInput.value,
      message: messageInput.value,
      honeypot: honeypotInput ? honeypotInput.value : ''
    };

    // 1. Ejecutar validación del caso de uso de Dominio
    const validation = validateContactForm(rawFormData);

    // Actualizar estados visuales de error
    setFieldError(nameInput, Boolean(validation.errors.fullName), validation.errors.fullName);
    setFieldError(numberInput, Boolean(validation.errors.phone), validation.errors.phone);
    setFieldError(mailInput, Boolean(validation.errors.email), validation.errors.email);
    setFieldError(messageInput, Boolean(validation.errors.message), validation.errors.message);

    if (!validation.isValid || !validation.sanitizedData) {
      // Si la falla fue por el Honeypot (bot detectado), no damos pistas al atacante
      if (validation.errors.honeypot) {
        console.warn('[Security] Solicitud de bot bloqueada por trampa Honeypot.');
        form.reset();
        return;
      }

      await Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, revisa los campos señalados en rojo e inténtalo de nuevo.',
        icon: 'warning',
        confirmButtonColor: '#7cf03d',
        color: '#fff',
        background: '#1f242d'
      });
      return;
    }

    // 2. Estado de envío en progreso
    if (submitBtn) {
      submitBtn.classList.add('is-submitting');
      submitBtn.disabled = true;
      const textSpan = submitBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Enviando...';
    }

    try {
      // 3. Envío seguro a través del servicio
      const result = await sendContactEmail(validation.sanitizedData);

      if (result.success) {
        await Swal.fire({
          title: '¡Mensaje enviado!',
          text: result.message,
          icon: 'success',
          confirmButtonColor: '#7cf03d',
          color: '#fff',
          background: '#1f242d'
        });
        form.reset();
        [nameInput, numberInput, mailInput, messageInput].forEach((f) => setFieldError(f, false));
      } else {
        await Swal.fire({
          title: 'Aviso',
          text: result.message,
          icon: 'error',
          confirmButtonColor: '#7cf03d',
          color: '#fff',
          background: '#1f242d'
        });
      }
    } catch {
      await Swal.fire({
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servicio de mensajería. Inténtalo más tarde.',
        icon: 'error',
        confirmButtonColor: '#7cf03d',
        color: '#fff',
        background: '#1f242d'
      });
    } finally {
      if (submitBtn) {
        submitBtn.classList.remove('is-submitting');
        submitBtn.disabled = false;
        const textSpan = submitBtn.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = 'Enviar';
      }
    }
  });
}
