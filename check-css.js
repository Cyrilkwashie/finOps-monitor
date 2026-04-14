const fs = require('fs');
const t = fs.readFileSync('.next/static/chunks/16_kyppcjyd~w.css', 'utf8');
const bgWhite = t.indexOf('.bg-white{');
const darkBg2 = t.indexOf(':where(.dark');
console.log('CSS total length:', t.length);
console.log('bg-white position:', bgWhite);
console.log('first :where(.dark) position:', darkBg2);
if (bgWhite > -1) console.log('bg-white ctx:', t.substring(bgWhite, bgWhite + 50));
