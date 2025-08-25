import express from 'express';
import path from 'path';
import { spawn, type ChildProcessWithoutNullStreams } from 'child_process';
import fs from 'fs';
import { tmpdir } from 'os';

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(import.meta.dirname, 'public')));

let currentProcess: ChildProcessWithoutNullStreams | null = null;
const clients: express.Response[] = [];

app.post('/start', (req, res) => {
  if (currentProcess) {
    res.status(409).json({ error: 'Download already running' });
    return;
  }

  const { targetUrl, cookie, outDir } = req.body as {
    targetUrl?: string;
    cookie?: string;
    outDir?: string;
  };

  if (!targetUrl || !cookie) {
    res.status(400).json({ error: 'targetUrl and cookie required' });
    return;
  }

  const confPath = path.join(tmpdir(), 'webui.conf');
  const conf = `[downloader]\ntarget.url = ${targetUrl}\ncookie = ${cookie}\n\n[output]\nout.dir = ${outDir || '.'}\n`;
  fs.writeFileSync(confPath, conf);

  const cliPath = path.resolve(import.meta.dirname, '../../bin/patreon-dl.js');
  currentProcess = spawn('node', [cliPath, '-c', confPath]);

  currentProcess.stdout.on('data', (data) => {
    const message = data.toString();
    clients.forEach((client) => client.write(`data: ${message.replace(/\n/g, '\\n')}\n\n`));
  });
  currentProcess.stderr.on('data', (data) => {
    const message = data.toString();
    clients.forEach((client) => client.write(`data: ${message.replace(/\n/g, '\\n')}\n\n`));
  });
  currentProcess.on('close', () => {
    clients.forEach((client) => client.write('data: ##END##\n\n'));
    currentProcess = null;
  });

  res.json({ status: 'started' });
});

app.get('/logs', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write('\n');
  clients.push(res);
  req.on('close', () => {
    const index = clients.indexOf(res);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

const port = Number(process.env.PORT) || 8800;
app.listen(port, () => {
  console.log(`Web UI listening on port ${port}`);
});
