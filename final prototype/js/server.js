// DECO7180 Research Tool — Local server
// Run: node js/server.js from the final prototype folder
// Then open: http://localhost:3000

const http = require('http');
const fs   = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT      = 3000;
const ROOT_DIR  = path.resolve(__dirname, '..');
const DATA_DIR  = path.join(ROOT_DIR, 'data');
const DATA_FILE = path.join(DATA_DIR, 'responses.json');
const CODEX_BIN = process.env.CODEX_BIN || 'codex';
const USE_CODEX_AI = process.env.USE_CODEX_AI !== '0';
const CODEX_TIMEOUT_MS = Number(process.env.CODEX_TIMEOUT_MS || 25000);

function formatCompact(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '--';
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(number);
}

function formatSigned(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '--';
  const prefix = number > 0 ? '+' : '';
  return `${prefix}${number.toFixed(1)}pp`;
}

function formatPercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '--';
  const prefix = number > 0 ? '+' : '';
  return `${prefix}${number.toFixed(1)}%`;
}

function buildLocalExplanation(question, context = {}) {
  const text = String(question || '').toLowerCase();
  const country = context.country;
  const point = context.point;
  const selectedLabel = context.selectedLabel || 'the selected date';
  const sourceSummary = context.sourceSummary || 'the current dataset';

  if (!country || !point) {
    return 'Please select a country first. The explanation works best when it can read the selected country, time point, COVID values, and GDP indicators from the screen.';
  }

  if (text.includes('cause') || text.includes('causation') || text.includes('caused')) {
    return [
      `For ${country.name}, the current view can show that COVID indicators and GDP recovery indicators changed across the same broad period.`,
      'However, this is not enough to prove that COVID cases directly caused the GDP change. GDP recovery can also be affected by lockdown policy, trade, labour markets, tourism, fiscal support, and country-specific conditions.',
      'A safer interpretation is: the prototype helps compare health pressure and economic recovery over time, but any causal claim needs further evidence.'
    ].join(' ');
  }

  if (text.includes('shock') || text.includes('recovery') || text.includes('gdp')) {
    return [
      `GDP shock means the difference between ${country.name}'s 2020 GDP growth and its 2019 GDP growth. In this dataset, that shock is ${formatSigned(country.shock)}.`,
      `Recovery means the change from 2020 to 2023. For ${country.name}, the recovery value is ${formatSigned(country.recovery)}.`,
      'These values are useful for reading contraction and rebound, but they should be read together with the selected time point and COVID indicators.'
    ].join(' ');
  }

  if (text.includes('source') || text.includes('trust') || text.includes('data')) {
    return [
      `This prototype is using ${sourceSummary}.`,
      'The AI explanation should only interpret the values already shown on screen. It should not invent missing figures or replace source checking.',
      'For a final exhibit, keeping source labels beside the explanation is important because economic data can be interpreted differently depending on definitions and update timing.'
    ].join(' ');
  }

  return [
    `At ${selectedLabel}, ${country.name} shows about ${formatCompact(point.cases)} cumulative COVID cases and ${formatCompact(point.deaths)} deaths in this view.`,
    `The mapped GDP path is ${formatPercent(point.gdp)}, while the broader 2019-2020 GDP shock is ${formatSigned(country.shock)} and the 2020-2023 recovery is ${formatSigned(country.recovery)}.`,
    'This suggests the country can be read through both health pressure and economic rebound, but the relationship should be interpreted as a pattern for comparison rather than a direct causal conclusion.'
  ].join(' ');
}

function cleanCodexOutput(text) {
  return String(text || '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('WARNING:'))
    .join('\n')
    .trim();
}

function buildCodexPrompt(question, context = {}) {
  return [
    'You are the AI explanation panel inside a classroom prototype called COVID Economic Globe.',
    'The target users are students with basic economics knowledge but not professional data analysts.',
    'Answer the user in 3 to 5 short sentences.',
    'Use only the data context provided below. Do not invent figures, countries, sources, or events.',
    'Explain definitions, visible patterns, and limitations. Do not claim that COVID cases directly caused GDP recovery unless the provided context proves it, which it usually does not.',
    'If the user asks for causation, explain that the prototype supports comparison and interpretation, not proof of direct causality.',
    '',
    `Question: ${String(question || '').trim()}`,
    '',
    `Context JSON: ${JSON.stringify(context, null, 2)}`
  ].join('\n');
}

function askCodex(question, context) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      CODEX_BIN,
      [
        'exec',
        '--ephemeral',
        '--skip-git-repo-check',
        '--sandbox',
        'read-only',
        '-C',
        ROOT_DIR,
        '-'
      ],
      {
        cwd: ROOT_DIR,
        env: { ...process.env, NO_COLOR: '1' },
        stdio: ['pipe', 'pipe', 'pipe']
      }
    );

    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error('Codex explanation timed out'));
    }, CODEX_TIMEOUT_MS);

    child.stdout.on('data', chunk => stdout += chunk);
    child.stderr.on('data', chunk => stderr += chunk);
    child.on('error', error => {
      clearTimeout(timer);
      reject(error);
    });
    child.on('close', code => {
      clearTimeout(timer);
      const answer = cleanCodexOutput(stdout);
      if (code === 0 && answer) {
        resolve(answer);
        return;
      }
      reject(new Error(cleanCodexOutput(stderr) || `Codex exited with code ${code}`));
    });

    child.stdin.end(buildCodexPrompt(question, context));
  });
}

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

  // ── POST /api/explain — local guided explanation for the AI panel ───────
  if (req.method === 'POST' && req.url === '/api/explain') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        let mode = 'local-guided-explanation';
        let answer = buildLocalExplanation(payload.question, payload.context);

        if (USE_CODEX_AI) {
          try {
            answer = await askCodex(payload.question, payload.context);
            mode = 'codex-cli';
          } catch (codexError) {
            console.warn(`[AI fallback] ${codexError.message}`);
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, mode, answer }));
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
  const staticRoutes = {
    '/': 'html/index.html',
    '/index.html': 'html/index.html',
    '/results.html': 'html/results.html',
    '/survey_questions.html': 'html/survey_questions.html'
  };
  const filePath = path.join(ROOT_DIR, staticRoutes[urlPath] || urlPath);

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
  console.log(`  Results:    http://localhost:${PORT}/html/results.html`);
  console.log(`  Data file:  ${DATA_FILE}`);
  console.log('  ──────────────────────────────────────\n');
});
