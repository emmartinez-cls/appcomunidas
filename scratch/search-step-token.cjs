const fs = require('fs');
const readline = require('readline');

async function run() {
  const fileStream = fs.createReadStream('C:/Users/Clsoluciones/.gemini/antigravity/brain/4cdbfde5-881b-4e03-969d-1156846300ac/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImI2MzExMjkwLTUwMTAtNDEzOS1iNzRkLWY1ZDdhZGQzZWRhOCIsIklkQ3VlbnRhIjoiZjBjNmE5ZTItNWU2OS00NWY5LTk1NTItMzIwNDM3YzliODhhIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiZW1tYXJ0aW5lekBjbHNvbHVjaW9uZXMuY2wiLCJqdGkiOiI4NjljMTgyMC1lNGIzLTQ3NjktOWQxYS02NGI4YzczMGY5NGUiLCJleHAiOjE3ODE3MzE3NDgsImlzcyI6IlR1QXBsaWNhY2lvbiIsImF1ZCI6IlR1QXBsaWNhY2lvbiJ9')) {
      console.log('--- JWT MATCH ---');
      console.log(line.substring(0, 1000));
    }
  }
}

run();
