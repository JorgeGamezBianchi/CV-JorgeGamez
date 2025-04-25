const tabNav = document.querySelectorAll('header nav a');
const logo = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

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

tabNav.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {

            activePage();

            link.classList.add('active');

            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1000);
        }
    });
});

logo.addEventListener('click', () => {
    if (!tabNav[0].classList.contains('active')) {

        activePage();

        tabNav[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1000);
    }  
});

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
const subj = document.getElementById("subject");
const mssg = document.getElementById("message");

function sendEmail() {
    const myEmail = 'jorge.gamez.mx@gmail.com';
    const bodyMsg = `Name: ${name.value}<br>Email: ${mail.value}<br>Phone: ${phon.value}<br> Message: ${mssg.value}`;

    Email.send({
        //SecureToken : "008671e8-dde0-4d83-a578-e394d4a595b2",
        Host : "smtp.elasticemail.com",
        Username : "jorge.gamez.mx@gmail.com",
        Password : "82A689FE25F3740FEF6FE0209D4B9B376FB6",
        To : myEmail,
        From : myEmail,
        Subject : subj.value,
        Body : bodyMsg
    }).then(
      message => {
        if (message == "OK") {
            Swal.fire({
                title: "Mensaje enviado!",
                text: "Muchas gracias, me comunicare contigo lo más pronto posible!",
                icon: "success"
            });
        }
      }
    );
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
        !subj.classList.contains("error") && !mssg.classList.contains("error")) {
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