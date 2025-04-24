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
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail =>{
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
}

arrowRight.addEventListener('click', () => {
    if (index < 4) {
        index++;
        arrowLeft.classList.remove('disabled');
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
        arrowLeft.classList.add('disabled');
    }
    activePortfolio();
})

const form = document.querySelector("form");
const name = document.getElementById("name");
const mail = document.getElementById("mail");
const phon = document.getElementById("number");
const subj = document.getElementById("subject");
const mssg = document.getElementById("message");
function sendEmail() {

    const myEmail = 'jorge.gamez.mx@gmail.com';
    const bodyMsg = `Name: ${name.value}<br>Email: ${mail.value}<br>Phone: ${phon.value}<br> Message: ${mssg.value}`;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "jorge.gamez.mx@gmail.com",
        Password : "82A689FE25F3740FEF6FE0209D4B9B376FB6",
        To : myEmail,
        From : myEmail,
        Subject : subj.value,
        Body : bodyMsg
    }).then(
      message => alert(message)
    );
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();
});