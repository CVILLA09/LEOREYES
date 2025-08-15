# 🚀 Configuración de GitHub Pages - Leo Reyes Website

## ✅ Cambios Realizados

### 1. Configuración de Vite (`vite.config.js`)
- ✅ Agregado `base: '/LEOREYES/'` para rutas relativas
- ✅ Optimizada configuración de build
- ✅ Deshabilitados sourcemaps para producción

### 2. Archivos HTML Actualizados
- ✅ `index.html`: Rutas relativas para CSS, JS y navegación
- ✅ `music.html`: Rutas relativas para CSS, JS, imágenes y navegación
- ✅ Eliminadas todas las rutas absolutas (`/src/`, `/index.html`, etc.)

### 3. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- ✅ Despliegue automático en cada push a main/master
- ✅ Compilación automática del proyecto
- ✅ Despliegue a la rama `gh-pages`

### 4. Archivos de Configuración
- ✅ `.gitignore` optimizado para Node.js/Vite
- ✅ `404.html` para manejo de rutas en GitHub Pages
- ✅ `deploy.sh` script de despliegue automatizado
- ✅ `DEPLOYMENT.md` con instrucciones detalladas

## 🎯 Próximos Pasos

### Opción 1: Despliegue Automático (Recomendado)

1. **Hacer commit y push de los cambios:**
   ```bash
   git add .
   git commit -m "Configure project for GitHub Pages deployment"
   git push origin main
   ```

2. **Configurar GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages` / `/(root)`
   - Save

3. **Verificar el despliegue:**
   - Ve a la pestaña "Actions" para ver el progreso
   - Tu sitio estará en: `https://[usuario].github.io/LEOREYES/`

### Opción 2: Despliegue Manual

1. **Compilar localmente:**
   ```bash
   npm install
   npm run build
   ```

2. **Subir la carpeta dist:**
   ```bash
   git add dist/
   git commit -m "Add built files for GitHub Pages"
   git push origin main
   ```

3. **Configurar GitHub Pages** (mismo proceso que arriba)

## 🔧 Comandos Útiles

```bash
# Desarrollo local
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Previsualizar build

# Despliegue
./deploy.sh          # Script de despliegue automatizado
npm run deploy       # Build + commit + push automático
npm run clean        # Limpiar carpeta dist
```

## 🌐 URLs del Sitio

- **Desarrollo local:** `http://localhost:5173`
- **GitHub Pages:** `https://[usuario].github.io/LEOREYES/`
- **Rama de despliegue:** `gh-pages`

## 📁 Estructura del Build

```
dist/
├── index.html           # Página principal
├── assets/
│   ├── index-[hash].css # CSS compilado
│   └── index-[hash].js  # JavaScript compilado
└── 404.html            # Página de redirección
```

## 🚨 Solución de Problemas

### Página en blanco
- ✅ Verificar que GitHub Pages esté configurado en la rama `gh-pages`
- ✅ Revisar la consola del navegador para errores
- ✅ Verificar que las rutas en `vite.config.js` sean correctas

### Rutas incorrectas
- ✅ Todas las rutas ahora son relativas
- ✅ Vite genera automáticamente las rutas con prefijo `/LEOREYES/`
- ✅ El archivo `404.html` maneja las redirecciones

### Build falla
- ✅ Verificar que `npm install` se ejecutó correctamente
- ✅ Revisar la consola para errores de compilación
- ✅ Verificar que todos los archivos de origen existen

## 🎉 ¡Listo para Desplegar!

Tu proyecto está completamente configurado para GitHub Pages. Solo necesitas hacer push de los cambios y configurar GitHub Pages en la rama `gh-pages`.
