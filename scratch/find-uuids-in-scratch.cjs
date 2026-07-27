const fs = require('fs');
const path = require('path');

const scratchDir = 'C:\\Users\\Clsoluciones\\.gemini\\antigravity\\scratch\\login-app\\scratch';
const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;

const files = fs.readdirSync(scratchDir);
for (const file of files) {
  if (file.endsWith('.js') || file.endsWith('.cjs') || file.endsWith('.json')) {
    const fullPath = path.join(scratchDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const matches = content.match(uuidRegex);
    if (matches) {
      console.log(`File: ${file}`);
      console.log(`UUIDs:`, Array.from(new Set(matches)));
    }
  }
}
