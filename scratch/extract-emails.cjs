const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        searchDir(fullPath);
      }
    } else if (file.endsWith('.js') || file.endsWith('.cjs') || file.endsWith('.json') || file.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const emails = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
      if (emails) {
        console.log(`File: ${fullPath}`);
        console.log(`Emails:`, Array.from(new Set(emails)));
      }
    }
  }
}

console.log('Searching scratch...');
searchDir('C:/Users/Clsoluciones/.gemini/antigravity/brain/4cdbfde5-881b-4e03-969d-1156846300ac');
console.log('Searching login-app...');
searchDir('C:/Users/Clsoluciones/.gemini/antigravity/scratch/login-app');
