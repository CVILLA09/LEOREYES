import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SceneManager } from './SceneManager.js';
import { BackgroundManager } from './BackgroundManager.js';
import { ScrollAnimations } from './scroll-animations.js';

// Music page application class
export class MusicApp {
    constructor() {
        // Set up the container
        this.container = document.getElementById('canvas-container');
        
        // Initialize scene manager
        this.sceneManager = new SceneManager(this.container);
        
        // Initialize background with stars
        this.backgroundManager = new BackgroundManager(this.sceneManager.scene);
        
        // Ensure the canvas spans full page even when scrolling
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.zIndex = '1';
        
        // Start animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Initialize music page interactions
        this.initMusicInteractions();

        // Initialize mobile navigation toggle
        this.initMenuToggle();
        
        // Initialize scroll animations
        this.scrollAnimations = new ScrollAnimations();
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Update components
        this.backgroundManager.update();
        
        // Render scene
        this.sceneManager.render();
    }
    
    onWindowResize() {
        this.sceneManager.onWindowResize();
    }
    
    initMusicInteractions() {
        // Smooth scroll for music button
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Additional music page interactions could be added here
        // For example, handling audio playback, visualizations, etc.
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

        if (overlay) overlay.addEventListener('click', closeMenu);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }
}

// Initialize the app when the window loads
window.addEventListener('load', () => {
    new MusicApp();
}); 