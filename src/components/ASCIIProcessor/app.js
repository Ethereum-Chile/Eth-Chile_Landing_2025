import * as THREE from 'three';
import { WebGLRenderer, Scene, PerspectiveCamera, Mesh, DirectionalLight, MeshStandardMaterial} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer, RenderPass, EffectPass } from "postprocessing";
import { ASCII } from './ascii.js';

export class App {
  constructor(container) {
    this.container = container;
    this.canvas = { 
      width: container.offsetWidth, 
      height: container.offsetHeight 
    };

    this.isDisposed = false;
    this.isPaused = false;
    
    this.initThree();
    this.loadModel();
    this.asciiInit();
  }

  initThree() {
    const pixelRatio = window.devicePixelRatio;
    let AA = true;
    if (window.matchMedia("(pointer: coarse)").matches) AA = false;
    if (pixelRatio > 2) AA = false;

    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      alpha: false,
      antialias: AA,
      stencil: false,
      clearColor: 0x000000,
      clearAlpha: 1
    });
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.renderer.setClearColor(0x000000, 1);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(60, this.canvas.width / this.canvas.height, 0.1, 1000);
    this.camera.position.z = 5; // Moved camera back for better view

    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    this.scene.add(ambientLight);

    this.directLight = new DirectionalLight("#fff", 1.5);
    this.directLight.position.set(5, 5, 5);
    this.directLight.castShadow = false;
    this.scene.add(this.directLight);

    // Add some colored lights for dramatic effect
    const blueLight = new THREE.PointLight(0x0066ff, 0.5, 10);
    blueLight.position.set(-3, 2, 2);
    this.scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x6600ff, 0.5, 10);
    purpleLight.position.set(3, -2, -2);
    this.scene.add(purpleLight);

    // Use ResizeObserver for the container instead of body
    const resizeObserver = new ResizeObserver((entries) => { 
      this.onResize(entries[0].contentRect) 
    });
    resizeObserver.observe(this.container);
  }

  loadModel() {
    console.log('Loading ETH model...');
    this.loader = new GLTFLoader();
    this.loader.load('/eth.glb', (response) => {
      if (this.isDisposed) return;
      
      console.log('Model loaded successfully:', response);
      console.log('Scene children:', response.scene.children);
      
      // Try to find the first mesh in the scene (recursively search through groups)
      let mesh = null;
      
      function findMesh(object) {
        if (object.type === 'Mesh') {
          return object;
        }
        for (let child of object.children) {
          const found = findMesh(child);
          if (found) return found;
        }
        return null;
      }
      
      mesh = findMesh(response.scene);
      
      if (!mesh) {
        console.error('No mesh found in the model');
        console.log('Scene structure:', response.scene);
        return;
      }
      
      console.log('Found mesh:', mesh);
      
      // Create a material that will work well with ASCII effect
      let material = new MeshStandardMaterial({
        metalness: 0.8,
        roughness: 0.2,
        color: 0xffffff,
        transparent: false,
        opacity: 1.0
      });
      
      this.figure = new Mesh(mesh.geometry, material);
      this.figure.castShadow = false;
      this.figure.receiveShadow = false;
      this.scene.add(this.figure);
      
      console.log('Figure added to scene');
      
      // Center the model based on its bounding box
      const box = new THREE.Box3().setFromObject(this.figure);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      console.log('Model bounds:', { center, size });
      
      // Move the model to center
      this.figure.position.sub(center);
      
      // Scale the model to make it bigger
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 4.5 / maxDim; // Increased scale for larger display
      this.figure.scale.setScalar(scale);
      
      console.log('Model scaled and positioned, starting animation');
      
      this.animate();
    }, (progress) => {
      console.log('Loading progress:', progress);
    }, (error) => {
      console.error('Error loading model:', error);
    });
  }

  asciiInit() {
    // Create ASCII effect with better settings for visibility
    const asciiEffect = new ASCII({ 
      fontSize: 18, // Smaller font size for more characters in larger area
      cellSize: 6, // Smaller cell size for more detail
      invert: true, // Invert for better visibility on black background
      color: "#ffffff", 
      characters: ` .:,'-^=*+?!|0#X%WM@`
    });

    this.composer = new EffectComposer(this.renderer);
    
    // Add render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    renderPass.clearPass.enabled = false; // Don't clear the background
    this.composer.addPass(renderPass);
    
    // Add ASCII effect pass
    this.composer.addPass(new EffectPass(this.camera, asciiEffect));
  }

  animate() {
    if (this.isDisposed || this.isPaused) return;
    
    requestAnimationFrame(this.animate.bind(this));
    
    if (this.figure) {
      // Faster rotation for more visible animation
      this.figure.rotation.y += 0.02;
      // Add some gentle floating motion
      this.figure.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    }
    
    if (this.composer) {
      // Clear with solid black background
      this.renderer.setClearColor(0x000000, 1);
      this.composer.render(this.scene, this.camera);
    } else {
      console.log('Composer not available for rendering');
    }
  }

  onResize(contentRect) {
    if (this.isDisposed) return;
    
    this.canvas = { width: contentRect.width, height: contentRect.height };
    this.camera.aspect = contentRect.width / contentRect.height;
    this.camera.updateProjectionMatrix();
    this.composer.setSize(contentRect.width, contentRect.height);
  }

  // Public methods for external control
  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    this.animate();
  }

  togglePause() {
    if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  updateConfig(config) {
    // Method to update ASCII effect configuration
    if (this.composer && config) {
      // Recreate ASCII effect with new config
      const asciiEffect = new ASCII({ 
        fontSize: config.fontSize || 35, 
        cellSize: config.cellSize || 16,
        invert: config.invert || false, 
        color: config.color || "#ffffff", 
        characters: config.characters || ` .:,'-^=*+?!|0#X%WM@`
      });

      // Remove old effect and add new one
      this.composer.removePass(this.composer.passes[1]);
      this.composer.addPass(new EffectPass(this.camera, asciiEffect));
    }
  }

  dispose() {
    this.isDisposed = true;
    this.isPaused = true;
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.container && this.renderer) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
} 