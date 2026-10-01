const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { requestHandler } = require('../src/server');

function request(path) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(requestHandler);
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      http.get({ host: '127.0.0.1', port, path }, (res) => {
        let body = '';
        res.on('data', chunk => { body += chunk; });
        res.on('end', () => {
          server.close();
          resolve({ statusCode: res.statusCode, body });
        });
      }).on('error', (err) => { server.close(); reject(err); });
    });
  });
}

test('GET / returns the application page', async () => {
  const response = await request('/');
  assert.equal(response.statusCode, 200);
  assert.match(response.body, /Node\.js CI\/CD Demo/);
});

test('GET /health returns healthy status', async () => {
  const response = await request('/health');
  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { status: 'ok' });
});
