#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/components/LogoCarousel.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Reemplazar la línea problemática
content = content.replace(
  /<CurrentLogo className="h-20 w-20 max-h-\[80%\] max-w-\[80%\] object-contain md:h-32 md:w-32" \/>/g,
  '<img src={CurrentLogo} className="h-20 w-20 max-h-[80%] max-w-[80%] object-contain md:h-32 md:w-32" alt={logos[currentIndex].name} />'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Archivo corregido exitosamente!');
