// full_server/server.js

const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = 1245;

const databasePath = process.argv[2];

app.use((req, res, next) => {
  req.databasePath = path.resolve(databasePath);
  next();
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

module.exports = app;
