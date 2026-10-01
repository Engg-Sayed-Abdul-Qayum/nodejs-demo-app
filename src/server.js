const http = require('node:http');

const PORT = process.env.PORT || 3000;

function requestHandler(req, res) {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Node.js CI/CD Demo</title><style>body{font-family:Arial,sans-serif;max-width:760px;margin:60px auto;padding:0 20px}.card{padding:32px;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.10)}</style></head><body><div class="card"><h1>Node.js CI/CD Demo</h1><p>Application deployed through a GitHub Actions CI/CD pipeline.</p><p>Status: <strong>Running</strong></p></div></body></html>`);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
}

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = { requestHandler };
