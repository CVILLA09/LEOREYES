import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export class LogoManager {
    constructor(scene) {
        this.scene = scene;
        this.logo = null;
        this.loadLogo();
    }
    
    loadLogo() {
        const fontLoader = new FontLoader();
        
        // Load font and create text
        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
            // Create materials for the extruded text - silver metallic
            const materials = [
                // Side material - darker silver for sides
                new THREE.MeshStandardMaterial({
                    color: 0x444444, // Darker gray for sides for better contrast
                    metalness: 0.95,
                    roughness: 0.2, // Slightly rougher for metal depth
                    side: THREE.DoubleSide,
                    envMapIntensity: 2.0 // Keep strong reflections
                }),
                // Front material - silver metallic
                new THREE.MeshStandardMaterial({
                    color: 0xC0C0C0, // True silver color instead of white
                    metalness: 1.0,
                    roughness: 0.05, // Slight roughness for genuine metal look
                    envMapIntensity: 2.5, // Keep strong reflections
                    emissive: 0x111111, // Slight self-illumination
                    emissiveIntensity: 0.1 // Reduced for less "glow"
                })
            ];
            
            // Add silver gradient effect with special shader material
            const frontMaterialEnhanced = new THREE.MeshPhysicalMaterial({
                color: 0xB8B8BD, // Silver with slight blue tint
                metalness: 1.0,
                roughness: 0.07,
                reflectivity: 1.0,
                clearcoat: 0.3, // Add subtle clearcoat for shine
                clearcoatRoughness: 0.3,
                envMapIntensity: 2.5
            });
            
            // Replace the standard material with the enhanced one
            materials[1] = frontMaterialEnhanced;
            
            // First word: "LEO"
            const leoGeometry = new TextGeometry('LEO', {
                font: font,
                size: 1.0,
                height: 0.4,
                curveSegments: 8, // Keep high segments for smoother curves
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.03,
                bevelOffset: 0,
                bevelSegments: 6 // Keep high segments for smoother bevel
            });
            
            // Second word: "REYES"
            const reyesGeometry = new TextGeometry('REYES', {
                font: font,
                size: 1.0,
                height: 0.4,
                curveSegments: 8,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.03,
                bevelOffset: 0,
                bevelSegments: 6
            });
            
            // Center geometries
            leoGeometry.computeBoundingBox();
            reyesGeometry.computeBoundingBox();
            
            const leoWidth = leoGeometry.boundingBox.max.x - leoGeometry.boundingBox.min.x;
            const reyesWidth = reyesGeometry.boundingBox.max.x - reyesGeometry.boundingBox.min.x;
            
            // Create meshes with both materials
            const leoMesh = new THREE.Mesh(leoGeometry, materials);
            const reyesMesh = new THREE.Mesh(reyesGeometry, materials);
            
            // Position the meshes
            leoMesh.position.set(-leoWidth / 2, 0.6, 0);
            reyesMesh.position.set(-reyesWidth / 2, -0.6, 0);
            
            // Create a group for the logo
            this.logo = new THREE.Group();
            this.logo.add(leoMesh, reyesMesh);
            
            // Scale to desired size
            this.logo.scale.set(1.2, 1.2, 1.2);
            
            // Add environment map to enhance metallic look
            this.addEnvironmentMap();
            
            // Add to scene
            this.scene.add(this.logo);
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
            
            // Add enhanced shine effect by modifying material properties based on time
            if (this.logo.children[0] && this.logo.children[0].material && Array.isArray(this.logo.children[0].material)) {
                const frontMaterial = this.logo.children[0].material[1];
                const pulseFactor = Math.sin(Date.now() * 0.001) * 0.2 + 0.95; // Enhanced pulse range
                
                if (frontMaterial.envMapIntensity !== undefined) {
                    frontMaterial.envMapIntensity = 2.5 * pulseFactor;
                }
                
                // Add subtle color variation for metallic effect
                if (frontMaterial.color) {
                    // Slightly shift between silver tones
                    const silverBase = new THREE.Color(0xB8B8BD);
                    const silverHighlight = new THREE.Color(0xD6D6D6);
                    const colorFactor = Math.sin(Date.now() * 0.0008) * 0.5 + 0.5; // Value 0-1
                    frontMaterial.color.lerpColors(silverBase, silverHighlight, colorFactor);
                }
                
                // Add clearcoat variation if it's a physical material
                if (frontMaterial.clearcoat !== undefined) {
                    frontMaterial.clearcoat = 0.3 + Math.sin(Date.now() * 0.001) * 0.15;
                }
            }
        }
    }
} 