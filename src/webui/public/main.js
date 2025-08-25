document.getElementById('configForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const targetUrl = document.getElementById('targetUrl').value;
  const cookie = document.getElementById('cookie').value;
  const outDir = document.getElementById('outDir').value;
  await fetch('/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetUrl, cookie, outDir })
  });
  const logs = document.getElementById('logs');
  logs.textContent = '';
  const source = new EventSource('/logs');
  source.onmessage = (e) => {
    if (e.data === '##END##') {
      source.close();
    } else {
      logs.textContent += e.data + '\n';
      logs.scrollTop = logs.scrollHeight;
    }
  };
});
