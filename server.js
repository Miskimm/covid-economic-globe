// DECO7180 Research Tool — Local server
// Run: node server.js
// Then open: http://localhost:3000

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT      = 3000;
const DATA_DIR  = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'responses.json');

// Ensure data/responses.json exists
if (!fs.existsSync(DATA_DIR))  fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  // ── POST /api/response — save one response ──────────────────────────────
  if (req.method === 'POST' && req.url === '/api/response') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const entry    = JSON.parse(body);
        const all      = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        all.push(entry);
        fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf8');
        console.log(`[${new Date().toLocaleTimeString()}] Response saved — total: ${all.length}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, total: all.length }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // ── GET /api/responses — return all responses ───────────────────────────
  if (req.method === 'GET' && req.url === '/api/responses') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(fs.readFileSync(DATA_FILE, 'utf8'));
    return;
  }

  // ── POST /api/clear — wipe all responses ────────────────────────────────
  if (req.method === 'POST' && req.url === '/api/clear') {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
    console.log(`[${new Date().toLocaleTimeString()}] All responses cleared.`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // ── Serve static files ───────────────────────────────────────────────────
  const urlPath  = req.url.split('?')[0];
  const filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);

  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const mime = MIME[path.extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(content);
  });

}).listen(PORT, () => {
  console.log('\n  DECO7180 Research Tool');
  console.log('  ──────────────────────────────────────');
  console.log(`  Prototype:  http://localhost:${PORT}/`);
  console.log(`  Results:    http://localhost:${PORT}/results.html`);
  console.log(`  Data file:  ${DATA_FILE}`);
  console.log('  ──────────────────────────────────────\n');
});
