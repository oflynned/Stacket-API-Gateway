import { isProductionEnvironment } from './environmentConfig';

const { ENVIRONMENT, MONGO_URL } = process.env;

const environments = ['production', 'development', 'test'];
export const collections = ['users', 'sessions', 'organisations'];

export function getEnvironment() {
  const reportedEnvironment = ENVIRONMENT ? ENVIRONMENT.toLowerCase() : 'development';
  return environments.includes(reportedEnvironment) ? reportedEnvironment : 'development';
}

const dbName = () => (isProductionEnvironment() ? 'api_prod' : `api_${getEnvironment()}`);

const mongodbUri = () => (isProductionEnvironment() ? MONGO_URL : `mongodb://localhost:27017/${dbName()}`);

const databaseConfig = {
  name: dbName(),
  databaseUri: mongodbUri(),
  environment: getEnvironment()
};

export default databaseConfig;
