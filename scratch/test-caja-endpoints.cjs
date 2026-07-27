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
  try {
    const email = 'test_caja_1782394670818@clsoluciones.cl';
    console.log('Skipping registration. Logging in with existing user:', email);
    const loginRes = await makeRequest('http://invapi.appcls.cl/api/Autenticacion/iniciar-sesion', 'POST', {
      identificadorAcceso: email,
      contrasenaPlano: 'Password123!'
    });
    const loginData = JSON.parse(loginRes.body);
    const token = loginData.tokenAcceso;
    console.log('   Token obtained successfully.');

    const authHeaders = { 'Authorization': `Bearer ${token}` };

    // 3. GET /api/Caja/tipos-movimiento
    console.log('3. Fetching tipos-movimiento...');
    const typesRes = await makeRequest('http://invapi.appcls.cl/api/Caja/tipos-movimiento', 'GET', null, authHeaders);
    console.log('   Status:', typesRes.statusCode);
    console.log('   Body:', typesRes.body);

    // 4. Get or Create client
    let idCliente = null;
    let clientListRes = await makeRequest('http://invapi.appcls.cl/api/Clientes', 'GET', null, authHeaders);
    const clientList = JSON.parse(clientListRes.body).clientes || [];
    if (clientList.length > 0) {
      idCliente = clientList[0].idCliente;
      console.log('4. Reusing existing client:', idCliente);
    } else {
      console.log('4. Creating test client...');
      const clientRes = await makeRequest('http://invapi.appcls.cl/api/Clientes/agregar', 'POST', {
        rut: '12345678-5',
        taxId: '12345678-5',
        nombreCliente: 'Test Client'
      }, authHeaders);
      console.log('   Client response status:', clientRes.statusCode);
      console.log('   Client response body:', clientRes.body);
      const clientData = JSON.parse(clientRes.body);
      idCliente = clientData.idCliente;
    }
    console.log('   idCliente:', idCliente);

    if (!idCliente) {
      console.error('Could not get idCliente');
      return;
    }

    // 5. Create AGF
    console.log('5. Creating AGF...');
    const createAgfRes = await makeRequest('http://invapi.appcls.cl/api/AdmGralFondos/agregar', 'POST', {
      nombreAdmGralFondos: 'Test AGF ' + Date.now(),
      rut: '77777777-3',
      activo: true
    }, authHeaders);
    console.log('   AGF Create status:', createAgfRes.statusCode, createAgfRes.body);
    const agfData = JSON.parse(createAgfRes.body);
    const idAgf = agfData.idAdmGralFondos;
    console.log('   idAdmGralFondos:', idAgf);

    // 6. Create Portfolio (Cartera)
    console.log('6. Creating Cartera...');
    const carteraRes = await makeRequest('http://invapi.appcls.cl/api/Carteras/agregar', 'POST', {
      idCliente: idCliente,
      idAdmGralFondos: idAgf,
      cuentaCartera: 'CC-123456',
      monedaCaja: 'CLP'
    }, authHeaders);
    console.log('   Cartera Create status:', carteraRes.statusCode, carteraRes.body);
    const cartData = JSON.parse(carteraRes.body);
    const idCartera = cartData.idCartera;
    console.log('   idCartera:', idCartera);

    if (!idCartera) {
      console.error('   Failed to get idCartera');
      return;
    }

    // 7. Try different payloads for Caja Movimiento
    const testPayloads = [
      {
        name: 'Payload 1: Null fields with APORTE',
        body: {
          idCartera,
          tipoMovimientoCaja: 'APORTE',
          monto: 1000,
          moneda: "CLP",
          tipoCambio: null,
          monedaTipoCambioPar: null,
          fechaMovimiento: new Date().toISOString(),
          idOperacionInstrumento: null,
          descripcion: 'Test'
        }
      },
      {
        name: 'Payload 2: Omitted null fields with APORTE',
        body: {
          idCartera,
          tipoMovimientoCaja: 'APORTE',
          monto: 1000,
          moneda: "CLP",
          fechaMovimiento: new Date().toISOString(),
          descripcion: 'Test'
        }
      },
      {
        name: 'Payload 3: Defaults with APORTE',
        body: {
          idCartera,
          tipoMovimientoCaja: 'APORTE',
          monto: 1000,
          moneda: "CLP",
          tipoCambio: 1.0,
          monedaTipoCambioPar: "CLP",
          fechaMovimiento: new Date().toISOString(),
          idOperacionInstrumento: 0,
          descripcion: 'Test'
        }
      },
      {
        name: 'Payload 4: lowercase / uppercase movement type (RETIRO)',
        body: {
          idCartera,
          tipoMovimientoCaja: 'RETIRO',
          monto: 500,
          moneda: "CLP",
          tipoCambio: null,
          monedaTipoCambioPar: null,
          fechaMovimiento: new Date().toISOString(),
          idOperacionInstrumento: null,
          descripcion: 'Test'
        }
      },
      {
        name: 'Payload 5: Depósito (Invalid string test)',
        body: {
          idCartera,
          tipoMovimientoCaja: 'Depósito',
          monto: 1000,
          moneda: "CLP",
          tipoCambio: null,
          monedaTipoCambioPar: null,
          fechaMovimiento: new Date().toISOString(),
          idOperacionInstrumento: null,
          descripcion: 'Test'
        }
      }
    ];

    for (const testCase of testPayloads) {
      console.log(`\nTesting ${testCase.name}...`);
      console.log('Sending payload:', JSON.stringify(testCase.body));
      const res = await makeRequest('http://invapi.appcls.cl/api/Caja/movimiento', 'POST', testCase.body, authHeaders);
      console.log('Status:', res.statusCode);
      console.log('Response Body:', res.body);
    }

  } catch (err) {
    console.error('Error occurred:', err);
  }
}

run();
