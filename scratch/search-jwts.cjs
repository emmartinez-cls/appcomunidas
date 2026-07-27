const fs = require('fs');
const readline = require('readline');

async function run() {
  const fileStream = fs.createReadStream('C:/Users/Clsoluciones/.gemini/antigravity/brain/4cdbfde5-881b-4e03-969d-1156846300ac/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const jwts = new Set();
  const jwtRegex = /eyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]+/g;

  for await (const line of rl) {
    const matches = line.match(jwtRegex);
    if (matches) {
      for (const token of matches) {
        jwts.add(token);
      }
    }
  }

  for (const token of jwts) {
    try {
      const parts = token.split('.');
      const payload = Buffer.from(parts[1], 'base64').toString('utf8');
      console.log('JWT Payload:', payload);
    } catch (e) {
      // ignore
    }
  }
}

run();
