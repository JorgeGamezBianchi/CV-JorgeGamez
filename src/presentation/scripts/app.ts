/**
 * @file app.ts
 * @description Punto de entrada para la interactividad del lado del cliente en el Portfolio de Astro.
 * Capa: Presentation / Scripts
 */

import { initNavigation } from './navigation';
import { initAboutTabs } from './aboutTabs';
import { initPortfolioCarousel } from './portfolioCarousel';
import { initContactForm } from './contactFormController';

function bootstrapApp(): void {
  initNavigation();
  initAboutTabs();
  initPortfolioCarousel();
  initContactForm();
}

// Inicialización cuando el DOM esté completamente listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
