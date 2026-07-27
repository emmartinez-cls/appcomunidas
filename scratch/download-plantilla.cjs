const http = require('http');
const fs = require('fs');

function makeRequest(url, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      method: method,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 80,
      path: parsedUrl.pathname + (parsedUrl.search || ''),
      headers: headers
    };
    const req = http.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => { chunks.push(chunk); });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks)
        });
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

async function run() {
  try {
    const email = 'test_caja_1782394670818@clsoluciones.cl';
    const loginRes = await makeRequest('http://invapi.appcls.cl/api/Autenticacion/iniciar-sesion', 'POST', JSON.stringify({
      identificadorAcceso: email,
      contrasenaPlano: 'Password123!'
    }), { 'Content-Type': 'application/json', 'Accept': 'application/json' });
    
    console.log('Login status:', loginRes.statusCode);
    const loginData = JSON.parse(loginRes.body.toString('utf8'));
    const token = loginData.tokenAcceso;
    const authHeaders = { 'Authorization': `Bearer ${token}` };

    // Get client to get idCliente
    const clientListRes = await makeRequest('http://invapi.appcls.cl/api/Clientes', 'GET', null, authHeaders);
    console.log('Client list status:', clientListRes.statusCode);
    const clientList = JSON.parse(clientListRes.body.toString('utf8')).clientes || [];
    const idCliente = clientList[0]?.idCliente;
    console.log('idCliente:', idCliente);

    if (!idCliente) {
      console.log('No client found');
      return;
    }

    console.log('Downloading plantilla...');
    const url = `http://invapi.appcls.cl/api/OperacionesInstrumento/carga-masiva/plantilla?idCliente=${idCliente}`;
    const res = await makeRequest(url, 'GET', null, authHeaders);
    console.log('Status:', res.statusCode);
    
    const filename = 'plantilla.xlsx';
    fs.writeFileSync(filename, res.body);
    console.log(`Saved as ${filename}, size: ${res.body.length} bytes`);

  } catch (err) {
    console.error(err);
  }
}

run();
