/**
 * @file aboutTabs.ts
 * @description Controlador de pestañas interactivas de la sección Sobre mí (Experiencia, Educación, Habilidades, Info).
 * Capa: Presentation / Scripts
 */

export function initAboutTabs(): void {
  const aboutBtns = document.querySelectorAll<HTMLButtonElement>('.about-btn');
  const aboutDetails = document.querySelectorAll<HTMLElement>('.about-detail');

  if (!aboutBtns.length || !aboutDetails.length) return;

  aboutBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      aboutBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      aboutDetails.forEach((detail) => detail.classList.remove('active'));
      if (aboutDetails[idx]) {
        aboutDetails[idx].classList.add('active');
      }
    });
  });
}
