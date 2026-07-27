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
    const loginData = JSON.parse(loginRes.body);
    const token = loginData.tokenAcceso;
    const authHeaders = { 'Authorization': `Bearer ${token}` };

    // Get client to get idCliente
    const clientListRes = await makeRequest('http://invapi.appcls.cl/api/Clientes', 'GET', null, authHeaders);
    const clientList = JSON.parse(clientListRes.body).clientes || [];
    const idCliente = clientList[0]?.idCliente;
    console.log('idCliente:', idCliente);

    if (!idCliente) {
      console.log('No client found');
      return;
    }

    // Read the file
    const fileContent = fs.readFileSync('plantilla_test.xlsx');
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    
    const header = `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="archivo"; filename="plantilla_test.xlsx"\r\n` +
      `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\r\n\r\n`;
    
    const footer = `\r\n--${boundary}--\r\n`;
    
    const bodyBuffer = Buffer.concat([
      Buffer.from(header, 'utf8'),
      fileContent,
      Buffer.from(footer, 'utf8')
    ]);

    console.log('Uploading plantilla_test.xlsx...');
    const url = `http://invapi.appcls.cl/api/OperacionesInstrumento/carga-masiva?idCliente=${idCliente}`;
    
    const uploadRes = await makeRequest(url, 'POST', bodyBuffer, {
      'Authorization': `Bearer ${token}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': bodyBuffer.length
    });

    console.log('Upload status:', uploadRes.statusCode);
    console.log('Upload body:', uploadRes.body);

  } catch (err) {
    console.error(err);
  }
}

run();
