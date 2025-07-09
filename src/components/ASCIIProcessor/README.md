# 🎨 Beautiful ASCII Processor

Your beautiful ASCII art from port 5173, ready for integration!

## Quick Start

### React Integration
```jsx
import ASCIIProcessor from './ASCIIProcessor-clean';
import './style-clean.css';

function App() {
  return (
    <div style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
      <ASCIIProcessor width="100%" height="600px" transparent={true} />
    </div>
  );
}
```

### Vanilla JavaScript
```html
<link rel="stylesheet" href="style-clean.css">
<script src="ascii.js"></script>
<script src="app-clean.js"></script>
<div id="ascii-container"></div>
<script>
  const app = new ASCIIApp(document.getElementById('ascii-container'), {
    transparent: true,
    model: 'eth'
  });
  app.init();
</script>
```

## Files Included
- `app-clean.js` - Core Three.js application
- `ASCIIProcessor-clean.jsx` - React component
- `style-clean.css` - Clean styling
- `ascii.js` - ASCII effect library
- `public/` - 3D models and assets

## Dependencies
```bash
npm install three postprocessing
```
