const fs = require('fs');
const swagger = JSON.parse(fs.readFileSync('swagger_latest.json', 'utf8'));
console.log(Object.keys(swagger.components.schemas).sort());
