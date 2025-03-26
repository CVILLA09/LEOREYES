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
            // Create materials for the extruded text - brighter and more reflective
            const materials = [
                // Side material
                new THREE.MeshStandardMaterial({
                    color: 0x444444, 
                    metalness: 0.95,
                    roughness: 0.1, // More reflective
                    side: THREE.DoubleSide
                }),
                // Front material
                new THREE.MeshStandardMaterial({
                    color: 0xFFFFFF, // Pure white for brighter reflections
                    metalness: 1.0,
                    roughness: 0.05, // Very reflective
                    envMapIntensity: 1.5 // Increased reflection intensity
                })
            ];
            
            // First word: "LEO"
            const leoGeometry = new TextGeometry('LEO', {
                font: font,
                size: 1.0,
                height: 0.4,
                curveSegments: 6, // Slightly higher for smoother curves
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.03, // Slightly larger bevel
                bevelOffset: 0,
                bevelSegments: 5 // More segments for smoother bevel
            });
            
            // Second word: "REYES"
            const reyesGeometry = new TextGeometry('REYES', {
                font: font,
                size: 1.0,
                height: 0.4,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.03,
                bevelOffset: 0,
                bevelSegments: 5
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
        // Create a more vibrant environment map for reflection
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const path = 'https://threejs.org/examples/textures/cube/MilkyWay/';
        const format = '.jpg';
        const urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ];
        
        const reflectionCube = cubeTextureLoader.load(urls);
        reflectionCube.intensity = 2.0; // Brighter reflections
        this.scene.environment = reflectionCube;
    }
    
    update() {
        if (this.logo) {
            // Add slight rotation to make it more dynamic
            this.logo.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
            this.logo.rotation.x = Math.sin(Date.now() * 0.0003) * 0.05;
            
            // Add subtle shine effect by modifying material properties based on time
            if (this.logo.children[0] && this.logo.children[0].material && Array.isArray(this.logo.children[0].material)) {
                const frontMaterial = this.logo.children[0].material[1];
                const pulseFactor = Math.sin(Date.now() * 0.001) * 0.1 + 0.9; // Value between 0.8 and 1.0
                frontMaterial.envMapIntensity = 1.5 * pulseFactor;
            }
        }
    }
} 