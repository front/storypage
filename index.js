'use strict';

const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: 'build',
    rewrites: [{
      source: '**',
      destination: '/index.html',
    }],
  });
});

const port = process.env.PORT || 6677;
server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
