# Jorge Gámez — Portfolio Profesional & CV

Sitio web interactivo y portfolio profesional de **Jorge Gámez Bianchi**, Desarrollador Full-Stack .NET y Software Engineer. Migrado a **Astro 5** con principios de **Clean Architecture**, **TypeScript estricto** y **estándares de seguridad informática**.

---

## 🚀 Características Principales

- **Arquitectura Limpia (Clean Architecture)**: Desacoplamiento total entre Dominio (modelos puros), Casos de Uso (lógica de negocio y sanitización), Infraestructura (datos tipados y adaptadores de servicios) y Presentación (componentes Astro y controladores TypeScript).
- **Seguridad Informática Robusta**:
  - Cero secretos o credenciales expuestas en el repositorio.
  - Gestión de credenciales mediante variables de entorno (`.env` protegido y `.env.example`).
  - Protección activa contra XSS y sanitización de inputs.
  - Trampa antispam **Honeypot** y **Rate Limiting** en el formulario de contacto.
  - Cabeceras HTTP de seguridad (`Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, HSTS) configuradas en `vercel.json`.
  - Enlaces externos protegidos contra *Reverse Tabnabbing* (`rel="noopener noreferrer"`).
  - Script automatizado de auditoría estática (`npm run security:check`).
- **Navegación SPA Dinámica**: Enrutamiento por hash (`/#/inicio`, `/#/about`, `/#/servicios`, `/#/portfolio`, `/#/contact`) con transiciones animadas y soporte para botones de navegación del explorador.
- **Cálculo Automático de Años**: Edad y años de experiencia calculados con precisión desde fechas de referencia tanto en compilación como en tiempo de ejecución.
- **Rendimiento Ultrarrápido**: Generación de sitio estático (SSG) de Astro con carga optimizada de estilos e imágenes.

---

## 🛠️ Stack Tecnológico

| Capa / Herramienta | Tecnología |
|---|---|
| **Framework Web** | [Astro](https://astro.build/) (SSG Mode) |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Estilos & Animaciones** | CSS3 nativo con variables personalizadas y animaciones por hardware |
| **Iconografía** | [Boxicons](https://boxicons.com/) & [Devicon](https://devicon.dev/) |
| **Servicio de Correos** | [@emailjs/browser](https://www.emailjs.com/) (Aislado en servicio de infraestructura) |
| **Notificaciones** | [SweetAlert2](https://sweetalert2.github.io/) |
| **Despliegue** | [Vercel](https://vercel.com/) |

---

## 📁 Estructura del Proyecto

Para ver el detalle completo de cada capa, consulta el documento [ARCHITECTURE.md](ARCHITECTURE.md).

```text
CV-JorgeGamez/
├── public/                     # Archivos estáticos servidos directamente
│   └── resources/              # Fotografías, iconos y PDF del CV
├── scripts/
│   └── security-check.cjs      # Script de auditoría preventiva de seguridad
├── src/
│   ├── core/                   # CAPA CORE (LÓGICA PURA)
│   │   ├── config/             # Configuración central (site.config.ts)
│   │   ├── domain/             # Interfaces y modelos de dominio
│   │   └── use-cases/          # Casos de uso (cálculos, sanitización, validación)
│   ├── infrastructure/         # CAPA INFRAESTRUCTURA
│   │   ├── data/               # Fuentes de datos de experiencia, proyectos, etc.
│   │   └── services/           # Adaptador de envío de correo (EmailJS)
│   ├── presentation/           # CAPA PRESENTACIÓN
│   │   ├── components/         # Componentes Astro (Header, Home, About, etc.)
│   │   ├── layouts/            # Layout maestro con SEO, OpenGraph y CSP
│   │   └── scripts/            # Controladores TypeScript para el cliente
│   ├── styles/
│   │   └── global.css          # Sistema de diseño, variables y animaciones
│   └── pages/
│       ├── index.astro         # Punto de entrada de la aplicación
│       ├── 404.astro           # Página de error 404 segura
│       └── robots.txt.ts       # Generador de robots.txt
├── .env.example                # Plantilla pública de variables de entorno
├── astro.config.mjs            # Configuración de Astro
├── vercel.json                 # Cabeceras de seguridad HTTP para producción
├── tsconfig.json               # Configuración de TypeScript con alias de rutas
└── package.json
```

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
- Node.js versión 18 o superior.
- Gestor de paquetes `npm`.

### Pasos

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/JorgeGamezBianchi/CV-JorgeGamez.git
   cd CV-JorgeGamez
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Copia el archivo de plantilla `.env.example` y renómbralo como `.env`:
   ```bash
   cp .env.example .env
   ```
   Edita las credenciales en `.env`:
   ```env
   PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
   PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
   PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
   PUBLIC_SITE_URL=http://localhost:4321
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

---

## 🔒 Comandos Disponibles

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia el entorno de desarrollo local con recarga en vivo. |
| `npm run build` | Compila y genera el sitio estático optimizado en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente el build generado en `dist/`. |
| `npm run security:check` | Ejecuta la auditoría estática de seguridad buscando secretos o malas prácticas. |

---

## ☁️ Despliegue en Vercel

1. Sube el repositorio a GitHub:
   ```bash
   git add .
   git commit -m "feat: migrate portfolio to Astro with Clean Architecture and security standards"
   git push origin main
   ```
2. Importa el proyecto en [Vercel](https://vercel.com):
   - **Framework Preset**: `Astro`
   - **Build Command**: `astro build`
   - **Output Directory**: `dist`
3. En la sección **Environment Variables** de Vercel, agrega tus variables de entorno (`PUBLIC_EMAILJS_PUBLIC_KEY`, `PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID`, etc.).
4. Despliega. Vercel aplicará automáticamente las cabeceras HTTP de seguridad definidas en `vercel.json`.

---

## 👤 Autor

**Jorge Gámez Bianchi**
- GitHub: [@JorgeGamezBianchi](https://github.com/JorgeGamezBianchi)
- LinkedIn: [in/jorgegámez](https://www.linkedin.com/in/jorgegámez)
- Portafolio: [https://jorgegamez.vercel.app](https://jorgegamez.vercel.app)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta los detalles de propiedad intelectual en el repositorio.
