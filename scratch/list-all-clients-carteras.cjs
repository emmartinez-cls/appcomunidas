const http = require('http');

function makeRequest(url, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      method: method,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 80,
      path: parsedUrl.pathname + (parsedUrl.search || ''),
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
  const email = 'test_caja_1782394670818@clsoluciones.cl';
  const loginRes = await makeRequest('http://invapi.appcls.cl/api/Autenticacion/iniciar-sesion', 'POST', {
    identificadorAcceso: email,
    contrasenaPlano: 'Password123!'
  });
  const loginData = JSON.parse(loginRes.body);
  const token = loginData.tokenAcceso;
  const authHeaders = { 'Authorization': `Bearer ${token}` };

  console.log('=== CLIENTS ===');
  const clientListRes = await makeRequest('http://invapi.appcls.cl/api/Clientes', 'GET', null, authHeaders);
  console.log(clientListRes.body);

  console.log('=== CARTERAS ===');
  const carterasListRes = await makeRequest('http://invapi.appcls.cl/api/Carteras', 'GET', null, authHeaders);
  console.log(carterasListRes.body);

  console.log('=== AGFs ===');
  const agfListRes = await makeRequest('http://invapi.appcls.cl/api/AdmGralFondos', 'GET', null, authHeaders);
  console.log(agfListRes.body);
}

run();
