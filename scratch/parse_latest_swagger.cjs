const fs = require('fs');

const swagger = JSON.parse(fs.readFileSync('swagger_latest.json', 'utf8'));
const paths = swagger.paths;
const components = swagger.components.schemas;

const endpoints = [
  '/api/OperacionesInstrumento/registrar',
  '/api/OperacionesInstrumento/posicion',
  '/api/OperacionesInstrumento/resultado-realizado',
  '/api/OperacionesInstrumento/{idOperacionInstrumento}',
  '/api/OperacionesInstrumento/tipos',
  '/api/OperacionesInstrumento/carga-masiva/plantilla',
  '/api/OperacionesInstrumento/carga-masiva'
];

console.log('=== ENDPOINTS ===');
for (const endpoint of endpoints) {
  const pathObj = paths[endpoint];
  if (!pathObj) {
    console.log(`Endpoint ${endpoint} not found!`);
    continue;
  }
  for (const method in pathObj) {
    console.log(`\n${method.toUpperCase()} ${endpoint}`);
    const methodObj = pathObj[method];
    if (methodObj.parameters) {
      console.log('  Parameters:');
      for (const param of methodObj.parameters) {
        console.log(`    - ${param.name} (${param.in}): ${param.required ? 'required' : 'optional'}, type: ${param.schema?.type}`);
      }
    }
    if (methodObj.requestBody) {
      console.log('  RequestBody:');
      const content = methodObj.requestBody.content;
      for (const contentType in content) {
        const schema = content[contentType].schema;
        if (schema.$ref) {
          const refName = schema.$ref.split('/').pop();
          console.log(`    Content-Type: ${contentType}, Ref: ${refName}`);
          printSchema(refName);
        } else {
          console.log(`    Content-Type: ${contentType}, Schema:`, JSON.stringify(schema));
        }
      }
    }
  }
}

function printSchema(schemaName) {
  const schema = components[schemaName];
  if (!schema) {
    console.log(`    Schema ${schemaName} not found!`);
    return;
  }
  console.log(`    Properties for ${schemaName}:`);
  for (const propName in schema.properties) {
    const prop = schema.properties[propName];
    console.log(`      - ${propName}: type=${prop.type}, format=${prop.format || ''}, nullable=${prop.nullable || false}`);
  }
  console.log(`    AdditionalProperties: ${schema.additionalProperties}`);
}
