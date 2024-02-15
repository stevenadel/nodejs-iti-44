/* eslint-disable no-case-declarations */
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const todoPath = path.join(__dirname, '../Lab 1/todos.json');

  switch (req.url) {
    case '/':
    case '/index.html':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const htmlStream = fs.createReadStream(path.join(__dirname, 'pages/index.html'));
      htmlStream.pipe(res);
      break;
    case '/styles.css':
      res.writeHead(200, { 'Content-Type': 'text/css' });
      const cssStream = fs.createReadStream(path.join(__dirname, 'styles/styles.css'));
      cssStream.pipe(res);
      break;
    case '/todos.json':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const jsonStream = fs.createReadStream(todoPath);
      jsonStream.pipe(res);
      break;
    case '/astronomy':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const astronomyHtmlStream = fs.createReadStream(path.join(__dirname, 'pages/astronomy.html'));
      astronomyHtmlStream.pipe(res);
      break;
    case '/astronomy.css':
      res.writeHead(200, { 'Content-Type': 'text/css' });
      const styleStream = fs.createReadStream(path.join(__dirname, 'styles/astronomy.css'));
      styleStream.pipe(res);
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      const notFoundStream = fs.createReadStream(path.join(__dirname, 'pages/not-found.html'));
      notFoundStream.pipe(res);
      break;
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
