const fs = require('fs');
const readline = require('readline');

async function run() {
  const fileStream = fs.createReadStream('C:\\Users\\Clsoluciones\\.gemini\\antigravity\\brain\\4cdbfde5-881b-4e03-969d-1156846300ac\\.system_generated\\logs\\transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const uuids = new Set();
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;

  for await (const line of rl) {
    if (line.toLowerCase().includes('instrumento') || line.toLowerCase().includes('posicion')) {
      let match;
      while ((match = uuidRegex.exec(line)) !== null) {
        uuids.add(match[0]);
      }
      // Print context if it has "instrument" and a UUID
      if (line.includes('200') || line.includes('exitoso') || line.includes('payload')) {
        console.log('Line matching context:', line.substring(0, 500));
      }
    }
  }

  console.log('Found UUIDs in instrument/posicion context:', Array.from(uuids));
}

run();
