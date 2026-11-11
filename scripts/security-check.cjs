/**
 * @file security-check.cjs
 * @description Script de auditoría estática de seguridad para prevenir fugas de secretos y malas prácticas.
 * Ejecutar con: npm run security:check
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', '.astro', 'build']);

// Patrones de detección de secretos o credenciales expuestas
const SECRET_PATTERNS = [
  { name: 'OpenAI API Key', regex: /sk-[a-zA-Z0-9]{32,}/ },
  { name: 'GitHub Personal Token', regex: /ghp_[a-zA-Z0-9]{36,}/ },
  { name: 'AWS Access Key ID', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'Google API Key', regex: /AIza[0-9A-Za-z-_]{35}/ },
  { name: 'Generic Password Assignment', regex: /(?:password|passwd|contraseña|secret)\s*[:=]\s*["'][^"']{6,}["']/i },
  { name: 'Private Key Block', regex: /-----BEGIN\s+(RSA|EC|DSA|OPENSSH)?\s*PRIVATE KEY-----/ },
  { name: 'Slack Bot Token', regex: /xoxb-[0-9]{11}-[0-9]{11}-[0-9a-zA-Z]{24}/ }
];

let issuesFound = 0;

console.log('🔒 [Security Audit] Iniciando verificación de seguridad...');

// 1. Verificar .gitignore
const gitignorePath = path.join(ROOT_DIR, '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  console.error('❌ CRÍTICO: No se encontró el archivo .gitignore');
  issuesFound++;
} else {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  if (!gitignoreContent.includes('.env')) {
    console.error('❌ CRÍTICO: .gitignore no contiene la regla para excluir .env');
    issuesFound++;
  } else {
    console.log('  ✅ .gitignore protege los archivos .env correctamente.');
  }
}

// 2. Escaneo recursivo de archivos de código
function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile()) {
      // Ignorar archivos no relevantes para análisis de código
      if (
        entry.name.endsWith('.jpg') ||
        entry.name.endsWith('.jpeg') ||
        entry.name.endsWith('.png') ||
        entry.name.endsWith('.webp') ||
        entry.name.endsWith('.pdf') ||
        entry.name.endsWith('.svg') ||
        entry.name === '.env' ||
        entry.name === 'package-lock.json'
      ) {
        continue;
      }

      checkFile(fullPath, entry.name);
    }
  }
}

function checkFile(filePath, fileName) {
  const relativePath = path.relative(ROOT_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // Comprobar patrones de secretos
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.regex.test(content)) {
      console.error(`❌ ALERTA DE SEGURIDAD: Posible secreto detectado (${pattern.name}) en: ${relativePath}`);
      issuesFound++;
    }
  }

  // Comprobar enlaces con target="_blank" sin rel seguro (Reverse Tabnabbing)
  const unsafeLinkRegex = /<a\s+[^>]*target=["']_blank["'][^>]*>/gi;
  let match;
  while ((match = unsafeLinkRegex.exec(content)) !== null) {
    const linkTag = match[0];
    if (!linkTag.includes('rel=') || !linkTag.includes('noopener')) {
      console.warn(`⚠️ ADVERTENCIA: Enlace con target="_blank" sin rel="noopener noreferrer" en ${relativePath}`);
    }
  }
}

scanDirectory(ROOT_DIR);

if (issuesFound > 0) {
  console.error(`\n❌ Se encontraron ${issuesFound} problema(s) de seguridad. Corrígelos antes de continuar.`);
  process.exit(1);
} else {
  console.log('✨ [Security Audit] Verificación completada con éxito. No se detectaron secretos ni vulnerabilidades críticas.\n');
  process.exit(0);
}
