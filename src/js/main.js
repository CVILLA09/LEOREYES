import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SceneManager } from './SceneManager.js';
import { BackgroundManager } from './BackgroundManager.js';
import { LogoManager } from './LogoManager.js';

// Main app class
class App {
    constructor() {
        // Set up the container
        this.container = document.getElementById('canvas-container');
        
        // Initialize scene manager
        this.sceneManager = new SceneManager(this.container);
        
        // Initialize background
        this.backgroundManager = new BackgroundManager(this.sceneManager.scene);
        
        // Initialize logo
        this.logoManager = new LogoManager(this.sceneManager.scene);
        
        // Start animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Update components
        this.backgroundManager.update();
        this.logoManager.update();
        
        // Render scene
        this.sceneManager.render();
    }
    
    onWindowResize() {
        this.sceneManager.onWindowResize();
    }
}

// Initialize the app when the window loads
window.addEventListener('load', () => {
    new App();
}); 