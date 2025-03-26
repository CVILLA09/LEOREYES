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
        this.scene.fog = new THREE.FogExp2(0x0a0a18, 0.0007);
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
        this.renderer.toneMappingExposure = 1.5;
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
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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
        
        // Ambient light - increased intensity but darker to emphasize neon
        const ambientLight = new THREE.AmbientLight(0x333344, 0.5);
        this.scene.add(ambientLight);
        
        // Main light from front-right-top - increased intensity
        const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
        mainLight.position.set(5, 5, 8);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);
        
        // Add a strong white light from the front specifically for the logo
        const logoLight = new THREE.SpotLight(0xffffff, 2.5);
        logoLight.position.set(0, 0, 15);
        logoLight.angle = Math.PI / 6;
        logoLight.penumbra = 0.5;
        logoLight.decay = 1;
        logoLight.distance = 100;
        this.scene.add(logoLight);
        
        // CYBERPUNK NEON LIGHTS
        
        // Neon Red Light - from right side
        const neonRedLight = new THREE.PointLight(0xff0055, 2, 100);
        neonRedLight.position.set(15, 0, 5);
        this.scene.add(neonRedLight);
        
        // Add red spotlight for dramatic effect
        const redSpotlight = new THREE.SpotLight(0xff0055, 3, 100, Math.PI / 6, 0.5);
        redSpotlight.position.set(20, 5, 10);
        redSpotlight.target.position.set(0, 0, 0);
        this.scene.add(redSpotlight);
        this.scene.add(redSpotlight.target);
        
        // Neon Blue Light - from left side
        const neonBlueLight = new THREE.PointLight(0x00aaff, 2, 100);
        neonBlueLight.position.set(-15, 0, 5);
        this.scene.add(neonBlueLight);
        
        // Add blue spotlight for dramatic effect
        const blueSpotlight = new THREE.SpotLight(0x00aaff, 3, 100, Math.PI / 6, 0.5);
        blueSpotlight.position.set(-20, 5, 10);
        blueSpotlight.target.position.set(0, 0, 0);
        this.scene.add(blueSpotlight);
        this.scene.add(blueSpotlight.target);
        
        // Add some neon glow from below for dramatic cyberpunk lighting
        const bottomRedLight = new THREE.PointLight(0xff0055, 1.5, 50);
        bottomRedLight.position.set(5, -10, 5);
        this.scene.add(bottomRedLight);
        
        const bottomBlueLight = new THREE.PointLight(0x00aaff, 1.5, 50);
        bottomBlueLight.position.set(-5, -10, 5);
        this.scene.add(bottomBlueLight);
        
        // Pulsing lights - will be animated in the render loop
        this.redNeonPulse = new THREE.PointLight(0xff0055, 1, 30);
        this.redNeonPulse.position.set(10, 0, 10);
        this.scene.add(this.redNeonPulse);
        
        this.blueNeonPulse = new THREE.PointLight(0x00aaff, 1, 30);
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
        
        // Animate the neon pulsing lights
        if (this.redNeonPulse && this.blueNeonPulse) {
            const pulseFactor = Math.sin(Date.now() * 0.003) * 0.5 + 1.0; // Value between 0.5 and 1.5
            this.redNeonPulse.intensity = pulseFactor;
            
            // Offset the blue pulse to create alternating effect
            const pulseFactorBlue = Math.sin(Date.now() * 0.003 + Math.PI) * 0.5 + 1.0;
            this.blueNeonPulse.intensity = pulseFactorBlue;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
} 