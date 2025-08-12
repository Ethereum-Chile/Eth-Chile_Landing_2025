import * as THREE from 'three';
import { WebGLRenderer, Scene, PerspectiveCamera, Mesh, DirectionalLight, MeshStandardMaterial} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer, RenderPass, EffectPass } from "postprocessing";
import { ASCII } from './ascii.js';

class App {
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

    this.renderer = new THREE.WebGLRenderer({
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

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, this.canvas.width / this.canvas.height, 0.1, 1000);
    this.camera.position.z = 3;

    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);

    this.directLight = new THREE.DirectionalLight("#fff", 8.0);
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
    this.loader = new THREE.GLTFLoader();
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
      
      if (mesh) {
        console.log('Found mesh:', mesh);
        this.figure = mesh;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(this.figure);
        const center = box.getCenter(new THREE.Vector3());
        this.figure.position.sub(center);
        
        // Scale the model to fit nicely
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        this.figure.scale.setScalar(scale);
        
        this.scene.add(this.figure);
        
        // Start animation
        this.animate();
      } else {
        console.error('No mesh found in the loaded model');
      }
    }, 
    (progress) => {
      console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('Error loading model:', error);
    });
  }

  asciiInit() {
    this.ascii = new ASCII({
      resolution: 0.15,
      scale: 1,
      color: "#ffffff",
      characters: " .:,'-^=*+?!|0#X%WM@",
      cellSize: 16,
      invert: false
    });
    
    this.ascii.setSize(this.canvas.width, this.canvas.height);
    this.container.appendChild(this.ascii.domElement);
    
    // Hide the WebGL canvas since we're using ASCII
    this.renderer.domElement.style.display = 'none';
  }

  animate() {
    if (this.isDisposed || this.isPaused) return;
    
    requestAnimationFrame(() => this.animate());
    
    if (this.figure) {
      // Rotate the figure continuously
      this.figure.rotation.y += 0.01;
      this.figure.rotation.x += 0.005;
    }
    
    // Render the scene
    this.renderer.render(this.scene, this.camera);
    
    // Update ASCII effect
    if (this.ascii) {
      this.ascii.render(this.scene, this.camera);
    }
  }

  onResize(contentRect) {
    if (this.isDisposed) return;
    
    this.canvas.width = contentRect.width;
    this.canvas.height = contentRect.height;
    
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    
    if (this.ascii) {
      this.ascii.setSize(this.canvas.width, this.canvas.height);
    }
  }

  pause() {
    this.isPaused = true;
    console.log('Animation paused');
  }

  resume() {
    this.isPaused = false;
    this.animate();
    console.log('Animation resumed');
  }

  togglePause() {
    if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  forceRestart() {
    console.log('Force restarting...');
    
    // Dispose current resources
    this.dispose();
    
    // Reinitialize
    this.isDisposed = false;
    this.isPaused = false;
    
    // Clear container
    this.container.innerHTML = '';
    
    // Reinitialize everything
    this.initThree();
    this.asciiInit();
    this.loadModel();
  }

  getStatus() {
    return {
      isDisposed: this.isDisposed,
      isPaused: this.isPaused,
      hasFigure: !!this.figure,
      hasComposer: !!this.ascii,
      rotation: this.figure ? `${this.figure.rotation.x.toFixed(2)}, ${this.figure.rotation.y.toFixed(2)}, ${this.figure.rotation.z.toFixed(2)}` : 'N/A'
    };
  }

  updateConfig(config) {
    if (this.ascii && config) {
      if (config.resolution !== undefined) this.ascii.setResolution(config.resolution);
      if (config.scale !== undefined) this.ascii.setScale(config.scale);
      if (config.color !== undefined) this.ascii.setColor(config.color);
      if (config.characters !== undefined) this.ascii.setCharacters(config.characters);
      if (config.cellSize !== undefined) this.ascii.setCellSize(config.cellSize);
      if (config.invert !== undefined) this.ascii.setInvert(config.invert);
    }
  }

  dispose() {
    console.log('Disposing app...');
    this.isDisposed = true;
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.ascii) {
      this.ascii.dispose();
    }
    
    // Clear container
    if (this.container) {
      this.container.innerHTML = '';
    }
    
    console.log('App disposed');
  }
} 