import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SceneManager } from './SceneManager.js';
import { BackgroundManager } from './BackgroundManager.js';
import { LogoManager } from './LogoManager.js';

console.log('🚀 Main.js cargado correctamente');
console.log('Three.js version:', THREE.REVISION);

// Main app class
class App {
    constructor() {
        console.log('🏗️ Inicializando App...');
        
        // Set up the container
        this.container = document.getElementById('canvas-container');
        console.log('📦 Container encontrado:', this.container);
        
        if (!this.container) {
            console.error('❌ No se encontró el container canvas-container');
            return;
        }
        
        try {
            // Initialize scene manager
            console.log('🎬 Inicializando SceneManager...');
            this.sceneManager = new SceneManager(this.container);
            
            // Initialize background
            console.log('🌌 Inicializando BackgroundManager...');
            this.backgroundManager = new BackgroundManager(this.sceneManager.scene);
            
            // Initialize logo
            console.log('🎨 Inicializando LogoManager...');
            this.logoManager = new LogoManager(this.sceneManager.scene);
            
            console.log('✅ App inicializada correctamente');
            
            // Start animation loop
            this.animate();
            
            // Handle window resize
            window.addEventListener('resize', this.onWindowResize.bind(this));

            // Initialize mobile navigation toggle
            this.initMenuToggle();
            
        } catch (error) {
            console.error('❌ Error al inicializar App:', error);
        }
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        try {
            // Update components
            if (this.backgroundManager) this.backgroundManager.update();
            if (this.logoManager) this.logoManager.update();
            
            // Render scene
            if (this.sceneManager) this.sceneManager.render();
        } catch (error) {
            console.error('❌ Error en animate loop:', error);
        }
    }
    
    onWindowResize() {
        if (this.sceneManager) this.sceneManager.onWindowResize();
    }

    initMenuToggle() {
        const toggleButton = document.querySelector('.menu-toggle');
        const menu = document.getElementById('nav-menu');
        const overlay = document.getElementById('nav-overlay');
        if (!toggleButton || !menu) return;

        const closeMenu = () => {
            menu.classList.remove('open');
            toggleButton.setAttribute('aria-expanded', 'false');
            if (overlay) overlay.classList.remove('open');
        };

        toggleButton.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (overlay) overlay.classList.toggle('open', isOpen);
        });

        // Close on overlay click
        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        // Close when clicking a nav link
        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });
    }
}

// Initialize the app when the window loads
window.addEventListener('load', () => {
    console.log('📱 Window loaded, iniciando App...');
    new App();
});

// También intentar inicializar cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded');
}); 