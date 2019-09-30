import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { json as parseJson } from 'body-parser';

import { isDevelopmentEnvironment, isProductionEnvironment } from '../config/environmentConfig';
import schema from './schema';

const isAuthenticated = (req, res, next) =>
  (req.isAuthenticated() ? next() : res.status(401));

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
    isAuthenticated,
    graphqlExpress(req => ({
      schema,
      debug: !isProductionEnvironment(),
      context: req
    }))
  );
};
