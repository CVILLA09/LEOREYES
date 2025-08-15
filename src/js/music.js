// Three.js ya está cargado desde CDN como objeto global
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
}

// Initialize the app when the window loads
window.addEventListener('load', () => {
    new MusicApp();
}); 