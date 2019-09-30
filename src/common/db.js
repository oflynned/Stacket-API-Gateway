import { connect } from 'camo';
import databaseConfig from '../config/databaseConfig';

class Database {
  static async connect() {
    return connect(databaseConfig.databaseUri);
  }
}

export default Database;
