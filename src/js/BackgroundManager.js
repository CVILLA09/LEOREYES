import * as THREE from 'three';

export class BackgroundManager {
    constructor(scene) {
        this.scene = scene;
        this.particles = null;
        this.particleSystem = null;
        this.nebulaParticles = null;
        
        // Create stars
        this.createStars();
        
        // Create nebula effect
        this.createNebula();
    }
    
    createStars() {
        // Parameters
        const particleCount = 18000; // Increased from 12000
        const particleSize = 0.08; // Increased from 0.05
        const particleDistance = 150;
        
        // Create particles
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const colors = new Float32Array(particleCount * 3);
        
        // Set random positions for stars across 3D space
        for (let i = 0; i < particleCount; i++) {
            // Get random position within a sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const distance = Math.pow(Math.random(), 0.5) * particleDistance;
            
            const x = distance * Math.sin(phi) * Math.cos(theta);
            const y = distance * Math.sin(phi) * Math.sin(theta);
            const z = distance * Math.cos(phi);
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            // Randomize size with many more bright stars
            sizes[i] = Math.random() > 0.7 ? 
                0.1 + Math.random() * 0.2 : // 30% brighter stars
                0.05 + Math.random() * 0.05; // Base stars bigger too
            
            // Star colors (mostly white, with more colored stars)
            if (Math.random() > 0.85) {
                // Blue stars
                colors[i * 3] = 0.7 + Math.random() * 0.3;
                colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
                colors[i * 3 + 2] = 1.0;
            } else if (Math.random() > 0.85) {
                // Yellow/red stars
                colors[i * 3] = 1.0;
                colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
                colors[i * 3 + 2] = 0.6 * Math.random();
            } else {
                // White stars
                colors[i * 3] = 1.0;
                colors[i * 3 + 1] = 1.0;
                colors[i * 3 + 2] = 1.0;
            }
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Star texture
        const starTexture = this.generateStarTexture();
        
        // Particle material
        const particleMaterial = new THREE.PointsMaterial({
            size: particleSize,
            sizeAttenuation: true,
            map: starTexture,
            transparent: true,
            alphaTest: 0.001,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        
        // Create particle system
        this.particleSystem = new THREE.Points(particles, particleMaterial);
        this.scene.add(this.particleSystem);
        
        // Store particles
        this.particles = particles;
    }
    
    createNebula() {
        // Add some nebula-like clouds to the background
        const nebulaCount = 800;
        const nebulaGeometry = new THREE.BufferGeometry();
        const nebulaPositions = new Float32Array(nebulaCount * 3);
        const nebulaSizes = new Float32Array(nebulaCount);
        const nebulaColors = new Float32Array(nebulaCount * 3);
        
        // Create nebula particles
        for (let i = 0; i < nebulaCount; i++) {
            // Distribute in a disk shape
            const radius = 30 + Math.random() * 70;
            const theta = Math.random() * Math.PI * 2;
            
            nebulaPositions[i * 3] = radius * Math.cos(theta);
            nebulaPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            nebulaPositions[i * 3 + 2] = radius * Math.sin(theta);
            
            // Large particles for nebula effect
            nebulaSizes[i] = 8 + Math.random() * 20;
            
            // Cyberpunk colors - reds, blues, purples
            let hue, saturation, lightness;
            
            // Randomly assign red or blue hues for cyberpunk feel
            if (Math.random() > 0.5) {
                // Red to pink/purple range
                hue = 0.95 + Math.random() * 0.1; // Red hues
                if (Math.random() > 0.5) {
                    hue = 0.8 + Math.random() * 0.1; // Purple hues
                }
            } else {
                // Blue to cyan range
                hue = 0.55 + Math.random() * 0.1; // Blue hues
                if (Math.random() > 0.5) {
                    hue = 0.45 + Math.random() * 0.1; // Cyan hues
                }
            }
            
            saturation = 0.7 + Math.random() * 0.3; // Highly saturated
            lightness = 0.4 + Math.random() * 0.3; // Brighter
            
            // Convert HSL to RGB
            const { r, g, b } = this.hslToRgb(hue, saturation, lightness);
            nebulaColors[i * 3] = r;
            nebulaColors[i * 3 + 1] = g;
            nebulaColors[i * 3 + 2] = b;
        }
        
        nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
        nebulaGeometry.setAttribute('size', new THREE.BufferAttribute(nebulaSizes, 1));
        nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
        
        // Nebula texture
        const nebulaTexture = this.generateNebulaTexture();
        
        // Nebula material
        const nebulaMaterial = new THREE.PointsMaterial({
            size: 10,
            sizeAttenuation: true,
            map: nebulaTexture,
            transparent: true,
            opacity: 0.25, // Increased from 0.15
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        
        // Create nebula system
        this.nebulaParticles = new THREE.Points(nebulaGeometry, nebulaMaterial);
        this.nebulaParticles.position.z = -50;
        this.scene.add(this.nebulaParticles);
    }
    
    generateStarTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2
        );
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.9)'); // Brighter falloff
        gradient.addColorStop(0.4, 'rgba(200, 200, 255, 0.6)'); // Brighter
        gradient.addColorStop(1, 'rgba(0, 0, 128, 0)'); // More color in the glow
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
    
    generateNebulaTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2
        );
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(0.6, 'rgba(100, 100, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 64, 0)');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
    
    // Helper function to convert HSL to RGB
    hslToRgb(h, s, l) {
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return { r, g, b };
    }
    
    update() {
        if (this.particleSystem) {
            // Slowly rotate the particle system
            this.particleSystem.rotation.y += 0.0001;
            this.particleSystem.rotation.x += 0.00005;
            
            // Twinkle effect - vary the size of random stars
            const sizes = this.particles.attributes.size.array;
            for (let i = 0; i < 150; i++) {
                const idx = Math.floor(Math.random() * sizes.length);
                sizes[idx] = Math.random() > 0.95 ? 
                      Math.random() * 0.15 : // Occasional bright stars
                      Math.random() * 0.05 + 0.01;
            }
            this.particles.attributes.size.needsUpdate = true;
            
            // Add color pulsing for cyberpunk effect
            if (this.particles.attributes.color) {
                const colors = this.particles.attributes.color.array;
                // Only update a small portion of stars each frame for efficiency
                for (let i = 0; i < 30; i++) {
                    const idx = Math.floor(Math.random() * (colors.length / 3)) * 3;
                    
                    // Random chance to add red or blue tinting to some stars
                    if (Math.random() > 0.7) {
                        // Enhance red component
                        colors[idx] = Math.min(colors[idx] * 1.05, 1.0);
                        colors[idx + 1] *= 0.98; // Slightly reduce green
                        colors[idx + 2] *= 0.98; // Slightly reduce blue
                    } else if (Math.random() > 0.7) {
                        // Enhance blue component
                        colors[idx] *= 0.98; // Slightly reduce red
                        colors[idx + 1] *= 0.98; // Slightly reduce green
                        colors[idx + 2] = Math.min(colors[idx + 2] * 1.05, 1.0);
                    }
                }
                this.particles.attributes.color.needsUpdate = true;
            }
        }
        
        if (this.nebulaParticles) {
            // Slowly rotate the nebula
            this.nebulaParticles.rotation.y += 0.00005;
        }
    }
} 