const aboutBtns = document.querySelectorAll('.about-btn');

aboutBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const aboutDetail = document.querySelectorAll('.about-detail');

        aboutBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        aboutDetail.forEach(detail => {
            detail.classList.remove('active');
        });
        aboutDetail[idx].classList.add('active');
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;
const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
}

arrowRight.addEventListener('click', () => {
    if (index < 4) {
        index++;
    }
    else {
        index = 5;
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
})

arrowLeft.addEventListener('click', () => {
    if (index > 1) {
        index--;
        arrowRight.classList.remove('disabled');
    }
    else {
        index = 0;
    }
    activePortfolio();
})