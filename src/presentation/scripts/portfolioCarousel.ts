/**
 * @file portfolioCarousel.ts
 * @description Controlador del carrusel de portfolio interactivo con desplazamiento fluido y estado de controles.
 * Capa: Presentation / Scripts
 */

export function initPortfolioCarousel(): void {
  const arrowRight = document.querySelector<HTMLButtonElement>('.portfolio-box .navigation .arrow-right');
  const arrowLeft = document.querySelector<HTMLButtonElement>('.portfolio-box .navigation .arrow-left');
  const imgSlide = document.querySelector<HTMLElement>('.portfolio-carousel .img-slide');
  const portfolioDetails = document.querySelectorAll<HTMLElement>('.portfolio-detail');

  if (!arrowRight || !arrowLeft || !imgSlide || !portfolioDetails.length) return;

  const totalItems = portfolioDetails.length;
  let currentIndex = 0;

  const updateCarousel = (): void => {
    imgSlide.style.transform = `translateX(calc(${currentIndex * -100}% - ${currentIndex * 2}rem))`;

    portfolioDetails.forEach((detail) => detail.classList.remove('active'));
    if (portfolioDetails[currentIndex]) {
      portfolioDetails[currentIndex].classList.add('active');
    }

    // Actualización de estado visual y de accesibilidad en botones
    if (currentIndex <= 0) {
      arrowLeft.classList.add('disabled');
      arrowLeft.setAttribute('aria-disabled', 'true');
    } else {
      arrowLeft.classList.remove('disabled');
      arrowLeft.setAttribute('aria-disabled', 'false');
    }

    if (currentIndex >= totalItems - 1) {
      arrowRight.classList.add('disabled');
      arrowRight.setAttribute('aria-disabled', 'true');
    } else {
      arrowRight.classList.remove('disabled');
      arrowRight.setAttribute('aria-disabled', 'false');
    }
  };

  arrowRight.addEventListener('click', () => {
    if (currentIndex < totalItems - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  arrowLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  updateCarousel();
}
