import { connect } from 'camo';
import { databaseConfig } from './config';

const databaseUrl = () => {
  const developmentUrl = `mongodb://localhost:27017/${databaseConfig.name}`;
  const productionUrl = process.env.MONGO_URL;
  return databaseConfig.environment === 'production' ? productionUrl : developmentUrl;
};

class Database {
  static async connect() {
    return connect(databaseUrl());
  }
}

export default Database;
