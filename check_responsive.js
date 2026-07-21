const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const missing = [];
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (!/@media\s*\(\s*max-width/i.test(c)) {
    missing.push(f);
  }
});
console.log('Missing files:', missing);
