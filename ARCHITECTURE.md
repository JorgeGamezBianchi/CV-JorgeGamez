# Clean Architecture & Security Guide — Portfolio Astro

Este documento describe la arquitectura de software, las capas de responsabilidad y las medidas de seguridad informática implementadas en la migración a **Astro**.

---

## 🏛️ 1. Principios de Clean Architecture

El proyecto sigue una adaptación práctica de **Clean Architecture** para aplicaciones frontend y sitios estáticos modernos (SSG/SPA). La regla de dependencia establece que las capas internas no deben conocer ni depender de las capas externas.

```
       ┌────────────────────────────────────────────────────────┐
       │             PRESENTATION LAYER (Astro UI)              │
       │   - Astro Pages & Layouts (HTML/SEO/Head)              │
       │   - Astro Components (Common & Sections)               │
       │   - Client-side Scripts & Interactivity                │
       └───────────────────────────┬────────────────────────────┘
                                   │  depende de
       ┌───────────────────────────▼────────────────────────────┐
       │             INFRASTRUCTURE LAYER (Adapters)            │
       │   - Structured Data Providers (JSON-like TS files)     │
       │   - External Services (EmailJS, SweetAlert2)           │
       │   - Environment Variable Bindings                      │
       └───────────────────────────┬────────────────────────────┘
                                   │  depende de
       ┌───────────────────────────▼────────────────────────────┐
       │                 CORE LAYER (Pure Logic)                │
       │   - Domain Models & Types (Interfaces, Entities)       │
       │   - Use Cases (Date Calculations, Form Sanitization)   │
       │   - Application Config & Constants                     │
       └────────────────────────────────────────────────────────┘
```

---

## 📂 2. Estructura de Directorios y Ubicación del Código

| Ruta | Capa | Responsabilidad |
|---|---|---|
| `src/core/domain/` | **Core / Domain** | Entidades y modelos de datos agnósticos a la UI (`profile.model.ts`, `experience.model.ts`, `skill.model.ts`, `project.model.ts`, `service.model.ts`, `contact.model.ts`). |
| `src/core/use-cases/` | **Core / Use Cases** | Casos de uso y reglas de negocio puras (`calculateExperience.ts` para cálculo de años transcurridos, `sanitizeInput.ts` para protección XSS y `validateContactForm.ts` para validación estricta con Honeypot). |
| `src/core/config/` | **Core / Config** | Configuración centralizada de metadatos, SEO, rutas y redes sociales (`site.config.ts`). |
| `src/infrastructure/data/` | **Infrastructure / Data** | Fuentes de datos tipadas con la información profesional de Jorge Gámez (`profile.data.ts`, `experience.data.ts`, `education.data.ts`, `skills.data.ts`, `services.data.ts`, `projects.data.ts`). |
| `src/infrastructure/services/` | **Infrastructure / Services** | Adaptadores de servicios externos (`email.service.ts`), aislando SDKs como EmailJS, gestionando cooldown (anti-spam) y lectura de variables de entorno. |
| `src/presentation/layouts/` | **Presentation / Layouts** | Plantilla maestra HTML5 (`Layout.astro`) con OpenGraph, Twitter Cards, SEO canónico, y carga de fuentes/iconos. |
| `src/presentation/components/common/` | **Presentation / UI** | Componentes transversales reutilizables (`Header.astro`, `BarsBackground.astro`, `SocialLinks.astro`). |
| `src/presentation/components/sections/` | **Presentation / UI** | Vistas y secciones completas (`HomeSection.astro`, `ServicesSection.astro`, `about/`, `portfolio/`, `contact/`). |
| `src/presentation/scripts/` | **Presentation / Scripts** | Controladores TypeScript de cliente para enrutamiento SPA (`navigation.ts`), pestañas (`aboutTabs.ts`), carrusel (`portfolioCarousel.ts`) y formulario (`contactFormController.ts`). |
| `src/styles/` | **Styles** | Hojas de estilo globales y animaciones de transición (`global.css`). |
| `src/pages/` | **Pages** | Enrutamiento de Astro (`index.astro`, `404.astro`, `robots.txt.ts`). |
| `public/resources/` | **Static Assets** | Fotografías, iconos de tecnologías, imágenes de proyectos y el PDF descargable del CV. |
| `scripts/security-check.cjs` | **Tooling / Security** | Script de auditoría estática para prevenir subida accidental de secretos o malas prácticas. |

---

## 🔒 3. Modelo de Seguridad Informática

Para proteger el código, evitar hackeos y garantizar que ninguna credencial quede expuesta, se aplicaron los siguientes controles:

### 3.1. Gestión Segura de Credenciales y Secretos
- **Eliminación de Claves Hardcodeadas**: Se eliminaron del código fuente las llaves expuestas previamente en texto plano.
- **Variables de Entorno Tipadas**: Se utiliza el sistema de variables de entorno de Astro (`astro.config.mjs`) e `import.meta.env`.
- **Aislamiento en Git**: El archivo `.gitignore` excluye de manera terminante `.env`, `.env.*`, archivos de llaves (`*.pem`, `*.key`, `*.pfx`), certificados y carpetas temporales.
- **Plantilla Pública Segura (`.env.example`)**: Solo contiene claves de muestra para que nuevos colaboradores sepan qué variables configurar sin filtrar secretos reales.

### 3.2. Prevención de Cross-Site Scripting (XSS) y Sanitización
- El caso de uso `sanitizeInput.ts` escapa caracteres especiales (`<`, `>`, `&`, `"`, `'`, `/`) en los valores de entrada.
- Los componentes de Astro renderizan datos escapados por defecto en el HTML, evitando inyección de etiquetas ejecutables.
- En los controladores de cliente se utiliza `textContent` en lugar de `innerHTML` para el renderizado de mensajes dinámicos.

### 3.3. Protección de Enlaces Externos (Reverse Tabnabbing)
- Todos los enlaces con `target="_blank"` implementan obligatoriamente `rel="noopener noreferrer"`, impidiendo que la página de destino acceda al objeto `window.opener` de la aplicación.

### 3.4. Defensa en Profundidad: Cabeceras HTTP de Seguridad
El archivo `vercel.json` inyecta en cada respuesta HTTP de producción:
- **`Content-Security-Policy` (CSP)**: Restringe los orígenes permitidos para scripts, estilos, fuentes e imágenes.
- **`X-Frame-Options: DENY`**: Evita que el sitio sea embebido en iframes de sitios de terceros (protección contra Clickjacking).
- **`X-Content-Type-Options: nosniff`**: Impide que los navegadores interpreten archivos con tipos MIME incorrectos.
- **`Strict-Transport-Security` (HSTS)**: Fuerza conexiones HTTPS seguras.
- **`Referrer-Policy: strict-origin-when-cross-origin`**: Protege la privacidad del usuario en solicitudes externas.
- **`Permissions-Policy`**: Deshabilita acceso no autorizado a cámara, micrófono y geolocalización.

### 3.5. Protección Antispam y Anti-Abuso en Formularios
- **Técnica Honeypot**: Un campo falso invisible para humanos (`#company_security_code`) que si es completado por un bot detiene el envío silenciosamente sin consumir cuota del servicio de correos.
- **Rate Limiting en Cliente**: Un cooldown de 30 segundos entre envíos previene ataques de denegación de servicio (DoS) y envíos masivos involuntarios.
- **Validación de Tipos y Longitudes**: Límites estrictos en cantidad de caracteres para evitar desbordes y payloads excesivos.

### 3.6. Auditoría Estática de Seguridad (`npm run security:check`)
Un script automatizado escanea el repositorio en busca de patrones de secretos (claves privadas, tokens de GitHub, OpenAI, Google Cloud, AWS) antes de cualquier pase a producción.
