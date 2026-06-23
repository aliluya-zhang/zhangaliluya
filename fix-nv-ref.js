const fs = require('fs');
const f = 'C:/Users/lili/Desktop/portfolio-new/work-nenovia.html';
let c = fs.readFileSync(f, 'utf8');
// Replace all #nv-ref with .nv-ref in CSS and JS
c = c.replace(/#nv-ref/g, '.nv-ref');
// Replace id="nv-ref" with class="nv-ref" in HTML
c = c.replace('id="nv-ref"', 'class="nv-ref"');
fs.writeFileSync(f, c, 'utf8');
console.log('Done. .nv-ref count:', (c.match(/\.nv-ref/g) || []).length);
