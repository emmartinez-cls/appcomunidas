const http = require('http');

function makeRequest(url, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      method: method,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 80,
      path: parsedUrl.pathname + parsedUrl.search,
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
  const idCartera = carterasList[0]?.idCartera;
  console.log('Using idCartera:', idCartera);

  const candidateUUIDs = [
    '283f3f2f-a3df-4f4a-83a5-204564cf05b4',
    'f8171325-0976-4b74-a154-9923b96df7da',
    '6041f644-6efe-46bd-b1fe-070cbf0893a5',
    '35c1dc7a-ba9e-4151-b50e-d3131431e563',
    '36b23bcf-f429-4e3c-8a63-d23c99685213',
    'a3159fd5-15a1-47ea-a121-e8a11f40f706',
    '7f2f223c-3325-4263-9482-d1ebe0cecf29',
    'eecf57a2-e40a-4f8b-81bc-dcf9a64dfc45',
    '964d431f-43e3-4069-850d-d2bbb7caac45',
    'ed67758a-834a-4471-bb72-423cfe7c8ec8',
    '7f60f22f-66bd-455a-9b58-88ebce54f247',
    'd0d8e2e2-4cc1-4611-b44b-01ba4646390a'
  ];

  for (const uuid of candidateUUIDs) {
    const payload = {
      idCartera: idCartera,
      idInstrumento: uuid,
      tipoOperacionInstrumento: 'COMPRA',
      fechaOperacion: new Date().toISOString(),
      cantidad: 1,
      precioUnitario: 100,
      comision: 0,
      otrosCargos: 0,
      impuestoRetenido: 0,
      registrarMovimientoCaja: false
    };
    
    const regRes = await makeRequest('http://invapi.appcls.cl/api/OperacionesInstrumento/registrar', 'POST', payload, authHeaders);
    console.log(`UUID: ${uuid} -> Status: ${regRes.statusCode}, Body: ${regRes.body}`);
  }
}

run();
