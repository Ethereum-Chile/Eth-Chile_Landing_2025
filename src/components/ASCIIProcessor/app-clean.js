import * as THREE from 'three';
import { WebGLRenderer, Scene, PerspectiveCamera, Mesh, DirectionalLight, MeshStandardMaterial} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer, RenderPass, EffectPass } from "postprocessing";
import { ASCII } from './ascii.js';

export class App {
  constructor(container) {
    console.log('App constructor called with container:', container);
    this.container = container;
    this.canvas = { 
      width: container.offsetWidth, 
      height: container.offsetHeight 
    };

    console.log('Canvas dimensions:', this.canvas);

    this.isDisposed = false;
    this.isPaused = false;
    
    console.log('Initializing Three.js...');
    this.initThree();
    
    console.log('Initializing ASCII effect...');
    this.asciiInit();
    
    console.log('Loading 3D model...');
    this.loadModel();
    
    console.log('App constructor complete');
  }

  initThree() {
    const pixelRatio = window.devicePixelRatio;
    let AA = true;
    if (window.matchMedia("(pointer: coarse)").matches) AA = false;
    if (pixelRatio > 2) AA = false;

    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      alpha: true,
      antialias: AA,
      stencil: false,
      clearColor: 0x000000,
      clearAlpha: 0
    });
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.renderer.setClearColor(0x000000, 0); // Transparent background
    this.container.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(70, this.canvas.width / this.canvas.height, 0.1, 1000);
    this.camera.position.z = 3;

    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);

    this.directLight = new DirectionalLight("#fff", 8.0);
    this.directLight.position.set(0, 0, 7);
    this.directLight.castShadow = false;
    this.scene.add(this.directLight);

    // Use ResizeObserver for the container instead of body
    const resizeObserver = new ResizeObserver((entries) => { 
      this.onResize(entries[0].contentRect) 
    });
    resizeObserver.observe(this.container);
  }

  loadModel() {
    this.loader = new GLTFLoader();
    console.log('Starting to load model: /eth.glb');
    
    this.loader.load('/eth.glb', (response) => {
      if (this.isDisposed) {
        console.log('Model loaded but app is disposed, skipping...');
        return;
      }
      
      console.log('Model loaded successfully:', response);
      console.log('Scene children count:', response.scene.children.length);
      console.log('Scene children:', response.scene.children);
      
      // Try to find the first mesh in the scene (recursively search through groups)
      let mesh = null;
      
      function findMesh(object) {
        console.log('Checking object:', object.type, object.name);
        if (object.type === 'Mesh') {
          console.log('Found mesh:', object.name);
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
        
        // Create a fallback cube if no mesh is found
        console.log('Creating fallback cube...');
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ 
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.2
        });
        this.figure = new THREE.Mesh(geometry, material);
        this.scene.add(this.figure);
        
        // Start animation even with fallback
        if (this.composer) {
          this.animate();
        }
        return;
      }
      
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
      
      // Center the model based on its bounding box
      const box = new THREE.Box3().setFromObject(this.figure);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Move the model to center
      this.figure.position.sub(center);
      
      // Add vertical offset to move it down
      this.figure.position.y -= 2.6;
      
      // Scale the model to fit nicely in view
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 3.5 / maxDim; // Increased scale to make it bigger
      this.figure.scale.setScalar(scale);
      
      // Initialize rotation to ensure it starts properly
      this.figure.rotation.y = 0;
      console.log('Figure initialized with rotation:', this.figure.rotation.y);
      
      // Ensure ASCII effect is initialized before starting animation
      if (this.composer) {
        console.log('Starting animation with composer...');
        this.animate();
      } else {
        // If ASCII effect isn't ready yet, wait a bit and try again
        console.log('Composer not ready, waiting 100ms...');
        setTimeout(() => {
          if (!this.isDisposed) {
            console.log('Starting animation after delay...');
            this.animate();
          }
        }, 100);
      }
      
      // Also start animation after a longer delay as backup
      setTimeout(() => {
        if (!this.isDisposed && !this.animationId) {
          console.log('Starting animation as backup...');
          this.animate();
        }
      }, 2000);
    }, (progress) => {
      console.log('Loading progress:', progress);
    }, (error) => {
      console.error('Error loading model:', error);
    });
  }

  asciiInit() {
    console.log('Initializing ASCII effect...');
    
    // Create ASCII effect with better settings for clean background
    const asciiEffect = new ASCII({ 
      font: "monospace",
      fontSize: 28, 
      cellSize: 12,
      invert: false, 
      color: "#ffffff", 
      characters: ` .:,'-^=*+?!|0#X%WM@$&<>{}[]()@#$%^&*+=<>{}[]()@#$%^&*`
    });

    console.log('ASCII effect created:', asciiEffect);

    this.composer = new EffectComposer(this.renderer);
    console.log('EffectComposer created:', this.composer);
    
    // Add render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    renderPass.clearPass.enabled = false; // Don't clear the background
    this.composer.addPass(renderPass);
    console.log('RenderPass added');
    
    // Add ASCII effect pass
    this.composer.addPass(new EffectPass(this.camera, asciiEffect));
    console.log('ASCII EffectPass added');
    
    console.log('ASCII initialization complete');
  }

  animate() {
    if (this.isDisposed) {
      console.log('Animation stopped: isDisposed = true');
      return;
    }
    
    // Always schedule the next frame first
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    
    // Debug: log animation frame every 100 frames
    if (!this._frameCount) this._frameCount = 0;
    this._frameCount++;
    if (this._frameCount % 100 === 0) {
      console.log('Animation frame:', this._frameCount, 'figure:', !!this.figure, 'composer:', !!this.composer);
    }
    
    if (this.figure && !this.isPaused) {
      // Add rotation - let it continue infinitely without resetting
      this.figure.rotation.y += 0.01; // Increased rotation speed for better visibility
      
      // Debug: log rotation every 50 frames for better monitoring
      if (Math.floor(this.figure.rotation.y * 50) % 50 === 0) {
        console.log('Diamond rotation:', this.figure.rotation.y.toFixed(3), 'isPaused:', this.isPaused, 'isDisposed:', this.isDisposed);
      }
    } else {
      // Debug: log when animation is not running
      if (Math.random() < 0.005) { // Log 0.5% of the time to reduce spam
        console.log('Animation check - figure:', !!this.figure, 'isPaused:', this.isPaused, 'isDisposed:', this.isDisposed);
      }
    }
    
    // Always render if we have a composer, even if figure is not ready
    if (this.composer) {
      // Clear with transparent background
      this.renderer.setClearColor(0x000000, 0);
      this.composer.render(this.scene, this.camera);
    } else if (this.renderer) {
      // Fallback: render directly if composer is not ready
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.render(this.scene, this.camera);
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
    console.log('Resuming animation...');
    this.isPaused = false;
    
    // If animation is not running, start it
    if (!this.animationId) {
      this.animate();
    }
  }

  togglePause() {
    if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  forceRestart() {
    console.log('Force restarting animation...');
    this.isPaused = false;
    this.isDisposed = false;
    
    // Cancel any existing animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    if (this.figure) {
      this.figure.rotation.y = 0;
    }
    
    // Start the animation loop
    this.animate();
    
    // Log status after restart
    setTimeout(() => {
      console.log('Animation restart status:', this.getStatus());
    }, 100);
  }

  getStatus() {
    return {
      isDisposed: this.isDisposed,
      isPaused: this.isPaused,
      hasFigure: !!this.figure,
      hasComposer: !!this.composer,
      hasAnimationId: !!this.animationId,
      rotation: this.figure ? this.figure.rotation.y : 'no figure',
      animationRunning: !this.isDisposed && !this.isPaused && !!this.figure && !!this.animationId
    };
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
      this.composer.removePass(this.composer.passes[1]); // Remove old EffectPass
      this.composer.addPass(new EffectPass(this.camera, asciiEffect));
    }
  }

  dispose() {
    this.isDisposed = true;
    
    // Cancel the animation frame
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.composer) {
      this.composer.dispose();
    }
    
    // Clean up Three.js resources
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
  }
} 