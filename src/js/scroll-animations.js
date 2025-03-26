/**
 * Scroll animations for the music page
 * Uses Intersection Observer API to detect when elements enter/exit the viewport
 */

class ScrollAnimations {
    constructor() {
        // Elements to animate
        this.fadeElements = [];
        
        // Initialize
        this.init();
    }
    
    init() {
        // Find all elements to animate
        this.fadeElements = document.querySelectorAll('.fade-element');
        
        // Set up the intersection observer
        const options = {
            root: null, // Use the viewport
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };
        
        // Create an observer
        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Add or remove the 'visible' class based on intersection
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // Only remove the class if the element is above the viewport (scrolled past)
                    if (entry.boundingClientRect.y < 0) {
                        entry.target.classList.remove('visible');
                    }
                }
            });
        }, options);
        
        // Observe all fade elements
        this.fadeElements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Export the class
export { ScrollAnimations }; 