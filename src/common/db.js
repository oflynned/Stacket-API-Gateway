import Marpat, { connect } from 'marpat';
import databaseConfig from '../config/databaseConfig';

class Database {
  static async connect() {
    return connect(databaseConfig.databaseUri);
  }

  static async db() {
    return Marpat.Client();
  }
}

export default Database;
