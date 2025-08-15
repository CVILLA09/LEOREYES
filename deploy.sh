#!/bin/bash

echo "🚀 Iniciando despliegue de Leo Reyes Website..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Asegúrate de estar en el directorio del proyecto."
    exit 1
fi

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Limpiar build anterior
echo "🧹 Limpiando build anterior..."
rm -rf dist/

# Construir el proyecto
echo "🔨 Construyendo el proyecto..."
npm run build

# Verificar que la carpeta dist se creó
if [ ! -d "dist" ]; then
    echo "❌ Error: La carpeta dist no se creó. Revisa los errores de build."
    exit 1
fi

echo "✅ Build completado exitosamente!"
echo "📁 Archivos generados en la carpeta dist:"
ls -la dist/

echo ""
echo "📝 Para completar el despliegue:"
echo "1. Haz commit de los cambios: git add . && git commit -m 'Update for GitHub Pages'"
echo "2. Haz push: git push origin main"
echo "3. El GitHub Action se ejecutará automáticamente"
echo "4. Ve a Settings > Pages y configura la rama gh-pages"
echo ""
echo "🌐 Tu sitio estará disponible en: https://[tu-usuario].github.io/LEOREYES/"
