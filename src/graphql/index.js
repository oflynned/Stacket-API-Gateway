import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';

import config from '../config';
import schema from './schema';
import User from '../models/user/user';

export default (app) => {
  if (config.environment === 'development') {
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  }

  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(() => ({
      schema,
      debug: config.env === 'development'
    }))
  );

  app.use(async (req, res, next) => {
    // TODO swap out header token for req.user
    // const { email } = req;
    // req.user = email ? await User.findByEmail(email) : undefined;
    next();
  });
};
