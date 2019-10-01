import server from './server';
import Database from './common/db';

// Database.connect() does not need to be called per request in app.js
// this is just for passing a config in, the db object is accessible globally once it is called
// it is not required to retrieve the db object and pass to any functions
Database.connect()
  .then(() => {
    server.listen();
  })
  .catch((err) => {
    console.error(err);
  });

export default server;
