const fs = require('fs');
const readline = require('readline');

async function run() {
  const fileStream = fs.createReadStream('C:\\Users\\Clsoluciones\\.gemini\\antigravity\\brain\\4cdbfde5-881b-4e03-969d-1156846300ac\\.system_generated\\logs\\transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('contrasenaPlano') || line.includes('identificadorAcceso')) {
      // Print only if it looks like a payload or user request
      if (line.includes('USER_INPUT') || line.includes('run_command') || line.includes('fetch')) {
        console.log(line.substring(0, 1000));
      }
    }
  }
}

run();
