// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // URL base de producción para SEO, canonical tags y OpenGraph
  site: 'https://jorgegamez.vercel.app',

  // Configuración de variables de entorno seguras tipadas (Astro 5)
  env: {
    schema: {
      PUBLIC_EMAILJS_PUBLIC_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: ''
      }),
      PUBLIC_EMAILJS_SERVICE_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: ''
      }),
      PUBLIC_EMAILJS_TEMPLATE_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: ''
      }),
      PUBLIC_SITE_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: 'https://jorgegamez.vercel.app'
      })
    }
  },

  // Generación estática para máxima seguridad y rendimiento
  output: 'static',

  // Cabeceras de seguridad y optimizaciones de build
  build: {
    format: 'directory',
    inlineStylesheets: 'auto'
  },

  // Configuración del servidor de desarrollo local
  server: {
    port: 4321,
    host: true
  }
});
