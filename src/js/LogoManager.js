import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export class LogoManager {
    constructor(scene) {
        this.scene = scene;
        this.logo = null;
        this.loadLogo();
    }
    
    loadLogo() {
        // Create materials for the 3D model - silver metallic
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xB8B8BD, // Silver with slight blue tint
            metalness: 1.0,
            roughness: 0.07,
            reflectivity: 1.0,
            clearcoat: 0.3, // Add subtle clearcoat for shine
            clearcoatRoughness: 0.3,
            envMapIntensity: 2.5
        });
        
        // Load the OBJ file
        const objLoader = new OBJLoader();
        objLoader.load('/src/assets/models/logo.obj', (object) => {
            // Apply material to all meshes in the loaded object
            object.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                    
                    // Ensure smooth shading for better quality
                    child.geometry.computeVertexNormals();
                }
            });
            
            // Create a group for the logo
            this.logo = new THREE.Group();
            this.logo.add(object);
            
            // Scale and position as needed
            this.logo.scale.set(0.05, 0.05, 0.05); // Adjust scale to fit scene
            
            // Center the model based on its bounding box
            const bbox = new THREE.Box3().setFromObject(this.logo);
            const center = bbox.getCenter(new THREE.Vector3());
            this.logo.position.x = -center.x;
            this.logo.position.y = -center.y;
            this.logo.position.z = -center.z;
            
            // Add environment map to enhance metallic look
            this.addEnvironmentMap();
            
            // Add to scene
            this.scene.add(this.logo);
        }, 
        // onProgress callback
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // onError callback
        (error) => {
            console.error('Error loading OBJ file:', error);
        });
    }
    
    addEnvironmentMap() {
        // Create a more vibrant environment map for stronger reflections
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const path = 'https://threejs.org/examples/textures/cube/MilkyWay/';
        const format = '.jpg';
        const urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ];
        
        const reflectionCube = cubeTextureLoader.load(urls);
        reflectionCube.intensity = 3.0; // Keep bright reflections
        this.scene.environment = reflectionCube;
    }
    
    update() {
        if (this.logo) {
            // Add slight rotation to make it more dynamic
            this.logo.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
            this.logo.rotation.x = Math.sin(Date.now() * 0.0003) * 0.05;
            
            // Traverse the logo group to find material to animate
            this.logo.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material) {
                    const material = child.material;
                    const pulseFactor = Math.sin(Date.now() * 0.001) * 0.2 + 0.95; // Enhanced pulse range
                    
                    if (material.envMapIntensity !== undefined) {
                        material.envMapIntensity = 2.5 * pulseFactor;
                    }
                    
                    // Add subtle color variation for metallic effect
                    if (material.color) {
                        // Slightly shift between silver tones
                        const silverBase = new THREE.Color(0xB8B8BD);
                        const silverHighlight = new THREE.Color(0xD6D6D6);
                        const colorFactor = Math.sin(Date.now() * 0.0008) * 0.5 + 0.5; // Value 0-1
                        material.color.lerpColors(silverBase, silverHighlight, colorFactor);
                    }
                    
                    // Add clearcoat variation if it's a physical material
                    if (material.clearcoat !== undefined) {
                        material.clearcoat = 0.3 + Math.sin(Date.now() * 0.001) * 0.15;
                    }
                }
            });
        }
    }
} 