import { connect } from 'camo';
import { databaseConfig } from './databaseConfig';

class Database {
  static async connect() {
    return connect(databaseConfig.databaseUri);
  }
}

export default Database;
