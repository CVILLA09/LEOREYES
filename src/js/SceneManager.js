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
        
        // Ambient light - increased intensity
        const ambientLight = new THREE.AmbientLight(0x555566, 0.6);
        this.scene.add(ambientLight);
        
        // Main light from front-right-top - increased intensity
        const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
        mainLight.position.set(5, 5, 8);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);
        
        // Rim light from back - increased intensity
        const rimLight = new THREE.DirectionalLight(0x6666ff, 1.2);
        rimLight.position.set(-5, 2, -5);
        this.scene.add(rimLight);
        
        // Add a soft fill light from the front - increased intensity
        const fillLight = new THREE.DirectionalLight(0xaaaaff, 0.8);
        fillLight.position.set(0, -3, 10);
        this.scene.add(fillLight);
        
        // Add some point lights for flare effects - increased intensity
        const pointLight1 = new THREE.PointLight(0x5555ff, 2, 70);
        pointLight1.position.set(-10, 10, 10);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xff5555, 2, 70);
        pointLight2.position.set(10, -10, -10);
        this.scene.add(pointLight2);
        
        // Add a strong white light from the front specifically for the logo
        const logoLight = new THREE.SpotLight(0xffffff, 3);
        logoLight.position.set(0, 0, 20);
        logoLight.angle = Math.PI / 6;
        logoLight.penumbra = 0.5;
        logoLight.decay = 1;
        logoLight.distance = 100;
        this.scene.add(logoLight);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
} 