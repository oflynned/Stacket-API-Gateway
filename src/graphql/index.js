import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { json as parseJson } from 'body-parser';

import { isDevelopmentEnvironment, isProductionEnvironment } from '../config/environmentConfig';
import schema from './schema';
import Session from '../models/session/session';

const enforceActiveSession = async (req, res, next) => {
  if (!req.headers.hasOwnProperty('x-session-id')) {
    return res.status(400)
      .send();
  }

  const sessionId = req.headers['x-session-id'];
  const session = await Session.findBySessionId(sessionId);
  if (session === null) {
    return res.status(401)
      .send();
  }

  req.user = session.user;
  next();
};

export default (app) => {
  if (isDevelopmentEnvironment()) {
    app.use(
      '/graphiql',
      graphiqlExpress({ endpointURL: '/graphql' })
    );
  }

  app.use(
    '/graphql',
    parseJson(),
    enforceActiveSession,
    graphqlExpress(req => ({
      schema,
      debug: !isProductionEnvironment(),
      context: req
    }))
  );
};
