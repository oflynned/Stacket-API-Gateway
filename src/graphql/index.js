import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import config from '../config';
import schema from './schema';

export default (app) => {
  if (config.env === 'development') {
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
};
