const fs = require('fs');
const glob = require('fs').readdirSync('.').filter(f => f.endsWith('.html'));

let changedFiles = [];
for (const file of glob) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('src="logo.png"')) {
        content = content.replace(/src="logo\.png"/g, 'src="https://res.cloudinary.com/dts1f4835/image/upload/v1781101913/dialphone-logo-only_1_mks7lx.png"');
        fs.writeFileSync(file, content, 'utf8');
        changedFiles.push(file);
    }
}
console.log(`Updated ${changedFiles.length} files:`);
console.log(changedFiles.join('\n'));
