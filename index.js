
require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.json());
const db = require('./server/utils/connection.js');
const index = require('./server/index.js');
const port = process.env.TOKEN_SERVER_PORT;

db.connect(() => {
  app.listen(port, () => {
    app.use('/api/', index);
    console.log(`Authorization Server running on ${port}...`)
  });
});