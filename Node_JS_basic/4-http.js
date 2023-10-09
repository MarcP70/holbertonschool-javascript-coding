const http = require('http');

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello Holberton School!');
  return response.end();
});

app.listen(1245);

module.exports = app;
