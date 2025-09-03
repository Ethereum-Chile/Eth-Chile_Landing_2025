#!/usr/bin/env node

/**
 * Performance Testing Script for ETHChile
 * Run with: node scripts/performance-test.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 ETHChile Performance Analysis');
console.log('================================\n');

// Analyze bundle sizes
const assetsDir = path.join(__dirname, '../dist/_assets');
const jsFiles = [];

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  
  files.forEach(file => {
    if (file.endsWith('.js')) {
      const filePath = path.join(assetsDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      const gzipSize = Math.round(stats.size * 0.3 / 1024); // Rough gzip estimate
      
      jsFiles.push({
        name: file,
        size: parseFloat(sizeKB),
        gzip: gzipSize
      });
    }
  });
  
  // Sort by size
  jsFiles.sort((a, b) => b.size - a.size);
  
  console.log('📦 JavaScript Bundle Analysis:');
  console.log('--------------------------------');
  
  let totalSize = 0;
  let totalGzip = 0;
  
  jsFiles.forEach(file => {
    console.log(`${file.name.padEnd(40)} ${file.size.toString().padStart(8)} KB (${file.gzip} KB gzipped)`);
    totalSize += file.size;
    totalGzip += file.gzip;
  });
  
  console.log('--------------------------------');
  console.log(`Total JS Size: ${totalSize.toFixed(2)} KB (${totalGzip} KB gzipped)\n`);
  
  // Performance recommendations
  console.log('💡 Performance Recommendations:');
  console.log('--------------------------------');
  
  if (totalSize > 1000) {
    console.log('⚠️  Total bundle size is large. Consider:');
    console.log('   - Further code splitting');
    console.log('   - Tree shaking optimization');
    console.log('   - Lazy loading more components');
  }
  
  const largeFiles = jsFiles.filter(f => f.size > 50);
  if (largeFiles.length > 0) {
    console.log('⚠️  Large individual files detected:');
    largeFiles.forEach(f => {
      console.log(`   - ${f.name}: ${f.size} KB`);
    });
  }
  
  // Check for optimization opportunities
  const vendorFiles = jsFiles.filter(f => f.name.includes('vendor') || f.name.includes('react'));
  if (vendorFiles.length === 0) {
    console.log('💡 Consider creating vendor chunks for React and common libraries');
  }
  
  console.log('\n✅ Performance analysis complete!');
  
} else {
  console.log('❌ Build directory not found. Run "npm run build" first.');
}

// Additional checks
console.log('\n🔍 Additional Performance Checks:');
console.log('--------------------------------');

// Check if service worker exists
const swPath = path.join(__dirname, '../public/sw.js');
if (fs.existsSync(swPath)) {
  console.log('✅ Service Worker found');
} else {
  console.log('❌ Service Worker missing');
}

// Check for critical CSS
const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
if (cssFiles.length > 0) {
  console.log('✅ CSS files detected');
  cssFiles.forEach(f => {
    const stats = fs.statSync(path.join(assetsDir, f));
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   - ${f}: ${sizeKB} KB`);
  });
}

console.log('\n🎯 Next Steps:');
console.log('1. Run Lighthouse audit in Chrome DevTools');
console.log('2. Test on mobile devices');
console.log('3. Monitor Core Web Vitals');
console.log('4. Use the usePerformanceMonitor hook in development');
