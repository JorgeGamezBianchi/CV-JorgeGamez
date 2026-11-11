/**
 * @file navigation.ts
 * @description Controlador de enrutamiento SPA basado en hash y transiciones animadas de secciones.
 * Capa: Presentation / Scripts
 */

const ROUTES: Record<string, number> = {
  inicio: 0,
  about: 1,
  servicios: 2,
  portfolio: 3,
  contact: 4
};

export function initNavigation(): void {
  const tabNav = document.querySelectorAll<HTMLAnchorElement>('header nav a');
  const sections = document.querySelectorAll<HTMLElement>('section');
  const menuIcon = document.querySelector<HTMLElement>('#menu-icon');
  const navbar = document.querySelector<HTMLElement>('header nav');
  const header = document.querySelector<HTMLElement>('header');
  const barsBox = document.querySelector<HTMLElement>('.bars-box');

  if (!tabNav.length || !sections.length) return;

  // Manejo del menú hamburguesa en dispositivos móviles
  if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    });
  }

  const triggerPageTransition = (): void => {
    if (header) {
      header.classList.remove('active');
      setTimeout(() => {
        header.classList.add('active');
      }, 1000);
    }

    tabNav.forEach((link) => link.classList.remove('active'));

    if (barsBox) {
      barsBox.classList.remove('active');
      setTimeout(() => {
        barsBox.classList.add('active');
      }, 1000);
    }

    sections.forEach((section) => section.classList.remove('active'));

    if (menuIcon && navbar) {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    }
  };

  const hashToIndex = (hash: string): number => {
    const cleanPath = hash.replace(/^#\/?/, '').toLowerCase();
    return ROUTES[cleanPath] !== undefined ? ROUTES[cleanPath] : 0;
  };

  const navigateTo = (index: number): void => {
    if (index < 0 || index >= sections.length) return;

    triggerPageTransition();

    if (tabNav[index]) {
      tabNav[index].classList.add('active');
    }

    setTimeout(() => {
      sections[index].classList.add('active');
      window.scrollTo(0, 0);
    }, 1000);
  };

  const handleHashChange = (): void => {
    const targetIndex = hashToIndex(window.location.hash);
    if (tabNav[targetIndex] && tabNav[targetIndex].classList.contains('active')) {
      return;
    }
    navigateTo(targetIndex);
  };

  window.addEventListener('hashchange', handleHashChange);

  // Inicialización según la URL al cargar
  const initialIndex = hashToIndex(window.location.hash);
  if (initialIndex !== 0) {
    navigateTo(initialIndex);
  }
}
