// Three.js ascii effect - https://github.com/isladjan/ascii
'use strict';

class ASCII {
  constructor({
    font = "monospace",
    characters = ` .:,'-^=*+?!|0#X%WM@$&<>{}[]()@#$%^&*+=<>{}[]()@#$%^&*`,
    fontSize = 54,
    cellSize = 16,
    color = "#ffffff",
    invert = false,
    resolution = 0.15,
    scale = 1
  } = {}) {
    this.characters = characters;
    this.fontSize = fontSize;
    this.cellSize = cellSize;
    this.color = color;
    this.invert = invert;
    this.resolution = resolution;
    this.scale = scale;
    
    this.domElement = document.createElement('div');
    this.domElement.style.cssText = 'position: absolute; top: 0px; left: 0px; color: ' + this.color + '; font-family: ' + font + '; font-size: ' + this.fontSize + 'px; line-height: ' + this.fontSize + 'px; text-align: center; font-weight: bold;';
    
    this.setSize(256, 256);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    
    this.domElement.style.width = width + 'px';
    this.domElement.style.height = height + 'px';
    
    this.cellWidth = this.cellSize;
    this.cellHeight = this.cellSize;
    
    this.cols = Math.floor(width / this.cellWidth);
    this.rows = Math.floor(height / this.cellHeight);
    
    this.clear();
  }

  clear() {
    this.domElement.innerHTML = '';
    
    for (let i = 0; i < this.rows; i++) {
      const row = document.createElement('div');
      row.style.cssText = 'white-space: pre; display: block; margin: 0px; padding: 0px;';
      row.textContent = ' '.repeat(this.cols);
      this.domElement.appendChild(row);
    }
  }

  render(scene, camera) {
    if (!this.renderer) {
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.renderer.setSize(this.width, this.height);
      this.renderer.setClearColor(0x000000, 0);
    }
    
    // Render the scene to a render target
    const renderTarget = new THREE.WebGLRenderTarget(this.width, this.height);
    this.renderer.setRenderTarget(renderTarget);
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(null);
    
    // Get the pixel data
    const buffer = new Uint8Array(this.width * this.height * 4);
    this.renderer.readRenderTargetPixels(renderTarget, 0, 0, this.width, this.height, buffer);
    
    // Convert to ASCII
    this.convertToASCII(buffer);
    
    // Clean up
    renderTarget.dispose();
  }

  convertToASCII(buffer) {
    const rows = this.domElement.children;
    
    for (let row = 0; row < this.rows; row++) {
      let asciiRow = '';
      
      for (let col = 0; col < this.cols; col++) {
        const index = (row * this.width + col) * 4;
        const r = buffer[index];
        const g = buffer[index + 1];
        const b = buffer[index + 2];
        
        // Convert to grayscale
        const gray = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        
        // Map to ASCII character
        const charIndex = Math.floor(gray * (this.characters.length - 1));
        const char = this.characters[charIndex];
        
        asciiRow += char;
      }
      
      if (rows[row]) {
        rows[row].textContent = asciiRow;
      }
    }
  }

  setResolution(resolution) {
    this.resolution = resolution;
  }

  setScale(scale) {
    this.scale = scale;
  }

  setColor(color) {
    this.color = color;
    this.domElement.style.color = color;
  }

  setCharacters(characters) {
    this.characters = characters;
  }

  setCellSize(cellSize) {
    this.cellSize = cellSize;
    this.setSize(this.width, this.height);
  }

  setInvert(invert) {
    this.invert = invert;
  }

  dispose() {
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.domElement && this.domElement.parentNode) {
      this.domElement.parentNode.removeChild(this.domElement);
    }
  }
}
