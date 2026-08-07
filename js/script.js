const tabNav = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

const BIRTH_DATE = new Date('1993-02-11');
const WORK_START_DATE = new Date('2022-02-01');

function calcYearsSince(date) {
    const now = new Date();
    let years = now.getFullYear() - date.getFullYear();
    const anniversaryPassed =
        now.getMonth() > date.getMonth() ||
        (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());
    if (!anniversaryPassed) years--;
    return years;
}

const ageEl = document.getElementById('age');
const expEl = document.getElementById('experience');

ageEl.textContent = `${calcYearsSince(BIRTH_DATE)} años`;
expEl.textContent = `${calcYearsSince(WORK_START_DATE)}+ años`;

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1000);

    tabNav.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1000);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const routes = {
    'inicio': 0,
    'about': 1,
    'servicios': 2,
    'portfolio': 3,
    'contact': 4,
};

const hashToIndex = (hash) => {
    const path = hash.replace(/^#\/?/, '').toLowerCase();
    return routes[path] !== undefined ? routes[path] : 0;
};

const goTo = (index) => {
    activePage();

    tabNav[index].classList.add('active');

    setTimeout(() => {
        sections[index].classList.add('active');
        window.scrollTo(0, 0);
    }, 1000);
};

const handleHash = () => {
    const index = hashToIndex(location.hash);

    if (tabNav[index].classList.contains('active')) return;

    goTo(index);
};

window.addEventListener('hashchange', handleHash);

const initialIndex = hashToIndex(location.hash);
if (initialIndex !== 0) {
    goTo(initialIndex);
}

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
const fullname = document.getElementById("name");
const mail = document.getElementById("mail");
const phon = document.getElementById("number");
const mssg = document.getElementById("message");

emailjs.init("cOB2jIZA5NM0iW578");

function sendEmail() {
    const serviceID = "service_b0n2c86";
    const templateID = "template_contacto";

    const templateParams = {
        from_name: fullname.value,
        from_email: mail.value,
        phone: phon.value,
        message: mssg.value
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(() => {
            Swal.fire({
                title: "Mensaje enviado!",
                text: "Muchas gracias, me comunicare contigo lo más pronto posible!",
                icon: "success"
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "Error",
                text: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
                icon: "error"
            });
        });
}

function validateForm() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != "") {
            checkMail();
        }

        items[1].addEventListener("keyup", () => {
            checkMail();
        })

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.add("error");
            }
        })
    }
}

function checkMail() {
    const mailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorMail = document.querySelector(".error-txt.mail");

    if (!mail.value.match(mailRegex)) {
        mail.classList.add("error");
        mail.parentElement.classList.add("error");

        if (mail.value != "")
            errorMail.innerText = "Ingrese un correo válido";
        else
            errorMail.innerText = "";
    }
    else {
        mail.classList.remove("error");
        mail.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    validateForm();

    if (!fullname.classList.contains("error") && !mail.classList.contains("error") && !phon.classList.contains("error") &&
        !mssg.classList.contains("error")) {
            //console.log('OK');
            sendEmail();

            form.reset();
            return false;
    }
    else {
        Swal.fire({
            title: "Error",
            text: "Por favor, ingresa todos los campos correctamente",
            icon: "error"
        });
    }
});