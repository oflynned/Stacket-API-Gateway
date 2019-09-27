import express from 'express';
import cors from 'cors';

import apollo from './graphql';
import config from './config';

const app = express();

const logger = require('morgan');

app.use(logger('dev'));

function setPort(port) {
  if (!port) {
    throw new Error('no port configured!');
  }

  app.set('port', parseInt(port, 10));
}

function listen() {
  const port = app.get('port') || config.port;
  app.listen(port, () => {
    console.log(`The server is running and listening at http://localhost:${port}`);
  });
}

app.use(cors({
  origin: config.corsDomain,
  optionsSuccessStatus: 200
}));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

apollo(app);

export default {
  getApp: () => app,
  setPort,
  listen
};
