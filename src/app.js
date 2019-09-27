import server from './server';
import Database from './persistence/db';

Database.connect()
  .then(() => {
    server.listen();
  })
  .catch((err) => {
    console.error(err);
  });

export default server;
