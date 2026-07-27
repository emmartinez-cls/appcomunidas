const http = require('http');

function makeRequest(url, method, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      method: method,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 80,
      path: parsedUrl.pathname,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers
      }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: data
        });
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function run() {
  const email = `testcaja_${Date.now()}@clsoluciones.cl`;
  const regPayload = {
    idPlan: 1,
    nombres: 'Caja',
    apellidoPaterno: 'Test',
    apellidoMaterno: 'User',
    correoElectronico: email,
    telefonoMovil: '+56999999999',
    contrasenaPlano: 'Password123!',
    tipoVerificacionInicial: 'CORREO'
  };

  try {
    console.log("Registering user:", email);
    const regRes = await makeRequest('http://invapi.appcls.cl/api/Autenticacion/registrar', 'POST', regPayload);
    console.log("Status:", regRes.statusCode);
    console.log("Body:", regRes.body);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
