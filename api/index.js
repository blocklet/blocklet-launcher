/* eslint-disable arrow-parens */
/* eslint-disable no-console */
require('dotenv-flow').config();

const { server } = require('./functions/app');

const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment && process.env.ABT_NODE) {
  process.env.BLOCKLET_PORT = 3030;
}

const port = parseInt(process.env.BLOCKLET_PORT, 10) || 3030;
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Install on ABTNODE ready on ${port}`);
});
