# Despliegue en GitHub Pages

## Configuración Automática (Recomendado)

Este proyecto está configurado con GitHub Actions para despliegue automático. Cada vez que hagas push a la rama `main` o `master`, el proyecto se compilará y desplegará automáticamente.

### Pasos para activar GitHub Pages:

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona **Deploy from a branch**
4. En **Branch**, selecciona **gh-pages** y **/(root)**
5. Haz clic en **Save**

### Configuración del repositorio:

- **Branch de despliegue:** `gh-pages`
- **Directorio de despliegue:** `/ (root)`
- **URL del sitio:** `https://[tu-usuario].github.io/LEOREYES/`

## Despliegue Manual

Si prefieres hacer el despliegue manualmente:

### 1. Compilar el proyecto:
```bash
npm install
npm run build
```

### 2. Subir la carpeta dist:
```bash
git add dist/
git commit -m "Add built files for GitHub Pages"
git push origin main
```

### 3. Configurar GitHub Pages:
- Ve a **Settings** → **Pages**
- Selecciona **Deploy from a branch**
- Selecciona tu rama principal (main/master)
- Selecciona **/(root)** como directorio

## Solución de Problemas

### Página en blanco:
- Verifica que la rama de despliegue sea correcta
- Asegúrate de que la carpeta `dist` contenga los archivos compilados
- Revisa la consola del navegador para errores de JavaScript

### Rutas incorrectas:
- El proyecto está configurado con `base: '/LEOREYES/'` en `vite.config.js`
- Todas las rutas se generan automáticamente con el prefijo correcto

### Actualizaciones:
- Los cambios se reflejan automáticamente después de hacer push
- El workflow de GitHub Actions se ejecuta en cada push
- Puedes ver el estado del despliegue en la pestaña **Actions**
