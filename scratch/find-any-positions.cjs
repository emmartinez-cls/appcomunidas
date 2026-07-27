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

  const carterasListRes = await makeRequest(`http://invapi.appcls.cl/api/Carteras`, 'GET', null, authHeaders);
  const carterasList = JSON.parse(carterasListRes.body).carteras || [];
  console.log(`Found ${carterasList.length} portfolios.`);

  for (const cartera of carterasList) {
    const posRes = await makeRequest(`http://invapi.appcls.cl/api/OperacionesInstrumento/posicion?idCartera=${cartera.idCartera}`, 'GET', null, authHeaders);
    console.log(`Cartera ${cartera.idCartera} (${cartera.cuentaCartera}) positions: ${posRes.body}`);
  }
}

run();
