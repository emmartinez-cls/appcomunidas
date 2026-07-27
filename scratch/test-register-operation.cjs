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
    const loginRes = await makeRequest('http://invapi.appcls.cl/api/Autenticacion/iniciar-sesion', 'POST', {
      identificadorAcceso: email,
      contrasenaPlano: 'Password123!'
    });
    const loginData = JSON.parse(loginRes.body);
    const token = loginData.tokenAcceso;
    const authHeaders = { 'Authorization': `Bearer ${token}` };

    // Get portfolios
    let carterasListRes = await makeRequest(`http://invapi.appcls.cl/api/Carteras`, 'GET', null, authHeaders);
    let carterasList = [];
    try {
      carterasList = JSON.parse(carterasListRes.body).carteras || [];
    } catch(e) {}
    
    let idCartera = carterasList[0]?.idCartera;

    if (!idCartera) {
      console.log('No portfolios found. Creating client, AGF and portfolio...');
      // 1. Get or Create client
      let idCliente = null;
      let clientListRes = await makeRequest('http://invapi.appcls.cl/api/Clientes', 'GET', null, authHeaders);
      let clientList = [];
      try { clientList = JSON.parse(clientListRes.body).clientes || []; } catch(e) {}
      
      if (clientList.length > 0) {
        idCliente = clientList[0].idCliente;
      } else {
        const clientRes = await makeRequest('http://invapi.appcls.cl/api/Clientes/agregar', 'POST', {
          rut: '12345678-5',
          taxId: '12345678-5',
          nombreCliente: 'Test Client'
        }, authHeaders);
        idCliente = JSON.parse(clientRes.body).idCliente;
      }

      // 2. Create AGF
      const createAgfRes = await makeRequest('http://invapi.appcls.cl/api/AdmGralFondos/agregar', 'POST', {
        nombreAdmGralFondos: 'Test AGF ' + Date.now(),
        rut: '77777777-3',
        activo: true
      }, authHeaders);
      const idAgf = JSON.parse(createAgfRes.body).idAdmGralFondos;

      // 3. Create Cartera
      const carteraRes = await makeRequest('http://invapi.appcls.cl/api/Carteras/agregar', 'POST', {
        idCliente: idCliente,
        idAdmGralFondos: idAgf,
        cuentaCartera: 'CC-' + Date.now(),
        monedaCaja: 'CLP'
      }, authHeaders);
      idCartera = JSON.parse(carteraRes.body).idCartera;
    }

    console.log('Using idCartera:', idCartera);

    const payload = {
      idCartera: idCartera,
      idInstrumento: 'b8ca967a-df5f-432c-99bd-19b6e5a89398', // uploaded instrument UUID
      tipoOperacionInstrumento: 'COMPRA',
      fechaOperacion: new Date().toISOString(),
      cantidad: 10,
      precioUnitario: 100,
      comision: 5,
      otrosCargos: 0,
      impuestoRetenido: 0,
      registrarMovimientoCaja: false
    };

    console.log('Registering operation...');
    const regRes = await makeRequest('http://invapi.appcls.cl/api/OperacionesInstrumento/registrar', 'POST', payload, authHeaders);
    console.log('Status:', regRes.statusCode);
    console.log('Body:', regRes.body);

  } catch (err) {
    console.error(err);
  }
}

run();
