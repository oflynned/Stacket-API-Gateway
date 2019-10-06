import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import apollo from './graphql';

import environmentConfig from './config/environmentConfig';

require('dotenv')
  .config();

const app = express();
const logger = require('morgan');

// TODO set this appropriate for use in a production environment
app.use(logger('dev'));

function setPort(port) {
  if (!port) {
    throw new Error('no port configured!');
  }

  app.set('port', parseInt(port, 10));
}

function listen() {
  const port = app.get('port') || environmentConfig.port;
  app.listen(port, () => {
    console.log(`The server is running and listening at http://localhost:${port}`);
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({ origin: environmentConfig.corsDomain }));

const indexRouter = require('./routes/index');
const authRouter = require('./routes/authentication');

app.use('/', indexRouter);
app.use('/auth', authRouter);

apollo(app);

export default {
  getApp: () => app,
  setPort,
  listen
};
