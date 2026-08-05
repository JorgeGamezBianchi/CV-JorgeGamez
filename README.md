# Jorge Gámez — Portfolio & CV

Portfolio profesional y curriculum interactivo de **Jorge Gámez Bianchi**, desarrollador Full-Stack .NET. Sitio de una sola página (SPA) construido con HTML, CSS y JavaScript vanilla, desplegado en Vercel.

## Descripción

CV digital con navegación por secciones animadas, diseño responsivo y modo oscuro. Incluye perfil profesional, experiencia laboral, educación, stack tecnológico, proyectos y un formulario de contacto funcional que envía correos mediante **EmailJS**.

## Secciones

- **Inicio** — Presentación, rol dinámico (rotación de texto) y descarga del CV en PDF.
- **Servicios** — Servicios ofrecidos (desarrollo web, reparación de PC, UI/UX, etc.).
- **Sobre mí** — Pestañas con *Experiencia*, *Educación*, *Habilidades* (iconos por categoría) y *Sobre mí* (datos personales con edad y experiencia calculadas automáticamente).
- **Portfolio** — Carrusel de proyectos con detalle y enlaces.
- **Contacto** — Datos de contacto, redes sociales y formulario con validación y envío de correo.

## Características

- **SPA con hash routing**: navegación entre secciones sin recargar, con URLs como `/#/servicios`, `/#/about`, `/#/portfolio`, `/#/contact`. El historial del navegador (atrás/adelante) y el deep-linking funcionan correctamente.
- **Contador automático**: edad y años de experiencia calculados en tiempo real desde fechas configuradas.
- **Formulario de contacto**: validación de campos, mensajes de error y envío de correo vía EmailJS con notificaciones SweetAlert2.
- **Iconos de tecnologías**: iconos oficiales de lenguajes, frameworks y herramientas (Devicon) con tooltips.
- **Animaciones**: transiciones de sección, barras de carga y efectos al pasar el cursor.
- **Responsivo**: adaptado a móvil, tablet y escritorio con menú hamburguesa.
- **Accesible**: enlaces semánticos, `alt` en imágenes y navegación por teclado.

## Stack tecnológico

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura del sitio |
| CSS3 | Estilos, animaciones y diseño responsivo |
| JavaScript (vanilla) | Interactividad, routing y lógica del cliente |
| Boxicons | Iconos de interfaz y redes sociales |
| Devicon | Iconos de tecnologías y herramientas |
| SweetAlert2 | Alertas y confirmaciones |
| EmailJS | Envío del formulario de contacto sin backend |
| Google Fonts (Poppins) | Tipografía |
| Vercel | Hosting y despliegue continuo |

## Estructura del proyecto

```
CV-JorgeGamez/
├── index.html          # Página principal (todas las secciones)
├── css/
│   └── style.css       # Estilos globales, animaciones y media queries
├── js/
│   └── script.js       # Navegación, routing, validación y envío de correo
├── resources/          # Imágenes, iconos y CV en PDF
│   └── CV-JorgeGamez.pdf
└── README.md
```

## Ejecutar en local

No requiere dependencias ni build. Clona el repositorio y abre el archivo:

```bash
git clone https://github.com/JorgeGamezBianchi/CV-JorgeGamez.git
cd CV-JorgeGamez
# Abrir index.html en el navegador, o con un servidor local:
npx serve .
```

### Configurar el formulario de contacto

El envío de correos usa EmailJS. Para usar tus propias credenciales, edita `js/script.js`:

```js
emailjs.init("TU_PUBLIC_KEY");          // Public Key de tu cuenta
const serviceID = "TU_SERVICE_ID";      // ID del servicio de correo
const templateID = "TU_TEMPLATE_ID";    // ID de la plantilla
```

La plantilla debe definir las variables `from_name`, `from_email`, `phone` y `message`.

## Despliegue en Vercel

1. Importa el repositorio en [Vercel](https://vercel.com).
2. Configura `Build Command` y `Output Directory` como vacíos (es un sitio estático).
3. Despliega. El proyecto se publica automáticamente en cada push a `main`.

## Autor

**Jorge Gámez Bianchi**

- GitHub: [JorgeGamezBianchi](https://github.com/JorgeGamezBianchi)
- LinkedIn: [jorgegámez](https://www.linkedin.com/in/jorgegámez)
- Sitio: https://jorgegamez.vercel.app

## Licencia

Este proyecto es de uso personal y educacional. El contenido, fotografías y datos personales pertenecen a su autor.
