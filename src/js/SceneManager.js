import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class SceneManager {
    constructor(container) {
        this.container = container;
        
        // Set up scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a18);
        
        // Set up renderer
        this.setupRenderer();
        
        // Set up camera
        this.setupCamera();
        
        // Set up controls
        this.setupControls();
        
        // Set up lighting
        this.setupLighting();
        
        // Set up fog for depth but make it less dense
        this.scene.fog = new THREE.FogExp2(0x0a0a18, 0.0005);
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 2.0;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
    }
    
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 12);
        this.camera.lookAt(0, 0, 0);
    }
    
    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.autoRotate = false;
        this.controls.minPolarAngle = Math.PI / 2 - 0.3;
        this.controls.maxPolarAngle = Math.PI / 2 + 0.3;
        this.controls.minAzimuthAngle = -0.5;
        this.controls.maxAzimuthAngle = 0.5;
    }
    
    setupLighting() {
        // Clean existing lights
        this.scene.children.forEach(child => {
            if (child instanceof THREE.Light) {
                this.scene.remove(child);
            }
        });
        
        // Ambient light - increased intensity for better overall illumination
        const ambientLight = new THREE.AmbientLight(0x555566, 1.0);
        this.scene.add(ambientLight);
        
        // Main light from front-right-top - brighter
        const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
        mainLight.position.set(5, 5, 8);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.radius = 3;
        mainLight.shadow.bias = -0.0001;
        this.scene.add(mainLight);
        
        // Main front light for the logo - significantly brighter
        const logoLight = new THREE.SpotLight(0xffffff, 4.0);
        logoLight.position.set(0, 0, 15);
        logoLight.angle = Math.PI / 5;
        logoLight.penumbra = 0.7;
        logoLight.decay = 1.5;
        logoLight.distance = 100;
        this.scene.add(logoLight);
        
        // Add additional front fill light for better logo visibility
        const frontFillLight = new THREE.DirectionalLight(0xffffff, 1.5);
        frontFillLight.position.set(0, 0, 10);
        this.scene.add(frontFillLight);
        
        // CYBERPUNK NEON LIGHTS
        
        // Neon Red Light - from right side
        const neonRedLight = new THREE.PointLight(0xff0055, 4.0, 120);
        neonRedLight.position.set(15, 0, 5);
        this.scene.add(neonRedLight);
        
        // Add red spotlight for dramatic effect
        const redSpotlight = new THREE.SpotLight(0xff0055, 5.0, 120, Math.PI / 6, 0.5);
        redSpotlight.position.set(20, 5, 10);
        redSpotlight.target.position.set(0, 0, 0);
        this.scene.add(redSpotlight);
        this.scene.add(redSpotlight.target);
        
        // Neon Blue Light - from left side
        const neonBlueLight = new THREE.PointLight(0x00aaff, 4.0, 120);
        neonBlueLight.position.set(-15, 0, 5);
        this.scene.add(neonBlueLight);
        
        // Add blue spotlight for dramatic effect
        const blueSpotlight = new THREE.SpotLight(0x00aaff, 5.0, 120, Math.PI / 6, 0.5);
        blueSpotlight.position.set(-20, 5, 10);
        blueSpotlight.target.position.set(0, 0, 0);
        this.scene.add(blueSpotlight);
        this.scene.add(blueSpotlight.target);
        
        // Add some neon glow from below for dramatic cyberpunk lighting
        const bottomRedLight = new THREE.PointLight(0xff0055, 3.0, 70);
        bottomRedLight.position.set(5, -10, 5);
        this.scene.add(bottomRedLight);
        
        const bottomBlueLight = new THREE.PointLight(0x00aaff, 3.0, 70);
        bottomBlueLight.position.set(-5, -10, 5);
        this.scene.add(bottomBlueLight);
        
        // Pulsing lights - increased base intensity and range
        this.redNeonPulse = new THREE.PointLight(0xff0055, 2.0, 50);
        this.redNeonPulse.position.set(10, 0, 10);
        this.scene.add(this.redNeonPulse);
        
        this.blueNeonPulse = new THREE.PointLight(0x00aaff, 2.0, 50);
        this.blueNeonPulse.position.set(-10, 0, 10);
        this.scene.add(this.blueNeonPulse);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    render() {
        this.controls.update();
        
        // Animate the neon pulsing lights - increased pulse range
        if (this.redNeonPulse && this.blueNeonPulse) {
            const pulseFactor = Math.sin(Date.now() * 0.003) * 0.8 + 1.8;
            this.redNeonPulse.intensity = pulseFactor;
            
            // Offset the blue pulse to create alternating effect
            const pulseFactorBlue = Math.sin(Date.now() * 0.003 + Math.PI) * 0.8 + 1.8;
            this.blueNeonPulse.intensity = pulseFactorBlue;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
} 