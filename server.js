const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = 'c:/Users/lili/WorkBuddy/20260509080323';
const PORT = 8888;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url === '/' ? '/hewasborn-static.html' : req.url;
  let filePath = path.join(ROOT, urlPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    let ext = path.extname(filePath).toLowerCase();
    let contentType = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});
