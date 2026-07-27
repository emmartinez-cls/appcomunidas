const fs = require('fs');
const readline = require('readline');

async function run() {
  const fileStream = fs.createReadStream('C:/Users/Clsoluciones/.gemini/antigravity/brain/4cdbfde5-881b-4e03-969d-1156846300ac/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('contrasenaPlano') || line.includes('contrasena') || line.includes('password')) {
      if (line.includes('main.js') || line.includes('swagger.json') || line.includes('VIEW_FILE')) {
        continue;
      }
      console.log('--- FOUND ---');
      console.log(line);
    }
  }
}

run();
