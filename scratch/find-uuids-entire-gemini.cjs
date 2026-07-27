const fs = require('fs');
const path = require('path');

const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
const foundUUIDs = new Map();

function searchDir(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {
        continue;
      }
      if (stat.isDirectory()) {
        if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
          searchDir(fullPath);
        }
      } else if (file.endsWith('.js') || file.endsWith('.cjs') || file.endsWith('.json') || file.endsWith('.html') || file.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const matches = content.match(uuidRegex);
          if (matches) {
            for (const match of matches) {
              const cleaned = match.toLowerCase();
              if (!foundUUIDs.has(cleaned)) {
                foundUUIDs.set(cleaned, []);
              }
              foundUUIDs.get(cleaned).push(fullPath);
            }
          }
        } catch (e) {}
      }
    }
  } catch (e) {}
}

console.log('Searching entire .gemini directory...');
searchDir('C:\\Users\\Clsoluciones\\.gemini');

console.log('=== FOUND UUIDS ===');
for (const [uuid, files] of foundUUIDs.entries()) {
  console.log(`${uuid} -> in ${files.length} files. Some files: ${Array.from(new Set(files.map(f => path.basename(f)))).slice(0, 5).join(', ')}`);
}
