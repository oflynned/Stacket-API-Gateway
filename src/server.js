import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import uuid from 'node-uuid';

import apollo from './graphql';

import environmentConfig from './config/environmentConfig';
import authenticationConfig from './config/authenticationConfig';
import databaseConfig from './config/databaseConfig';
import { checkAuthorization } from './common/authentication';
import { createUser } from './controllers/user';

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv')
  .config();

require('./config/passportConfig');

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
  const port = app.get('port') || environmentConfig.port;
  app.listen(port, () => {
    console.log(`The server is running and listening at http://localhost:${port}`);
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: environmentConfig.corsDomain,
  optionsSuccessStatus: 200
}));

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.use(session({
  store: new MongoStore({ url: databaseConfig.databaseUri }),
  secret: authenticationConfig.sessionSecret,
  genid: () => uuid.v4()
}));

app.use(passport.initialize());
app.use(passport.session());

app.post(
  '/me',
  checkAuthorization,
  async (req, res) => {
    if (req.user) {
      res.status(200)
        .json(req.user);
    } else {
      try {
        const account = await createUser(req);
        res.status(201)
          .json(account);
      } catch (err) {
        console.log(err);
        res.status(400)
          .json({ error: err.message });
      }
    }
  }
);

app.post(
  '/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json(req.user);
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.status(204)
    .send();
});

apollo(app);

export default {
  getApp: () => app,
  setPort,
  listen
};
