import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { json as parseJson } from 'body-parser';

import { allowExpiredSessions } from '../common/featureFlags';
import { isDevelopmentEnvironment, isProductionEnvironment } from '../config/environmentConfig';
import schema from './schema';
import Session from '../models/session/session';

const enforceActiveSession = async (req, res, next) => {
  if (!Object.prototype.hasOwnProperty.call(req.headers, 'x-session-id')) {
    return res.status(400)
      .send();
  }

  const sessionId = req.headers['x-session-id'];
  const session = await Session.findBySessionId(sessionId);

  // if session has already been garbage collected
  if (session === null) {
    return res.status(401)
      .json({ error: 'session_does_not_exist' });
  }

  // if session has already expired
  if (!allowExpiredSessions() && session.isExpired()) {
    return res.status(403)
      .json({ error: 'session_expired' });
  }

  // TODO check if IP address matches lookup table of past logins
  // TODO look into CSRF tokens with sessions

  // session is valid, its ttl should be extended by 8 hours
  await Session.extendExpiry(sessionId);
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
