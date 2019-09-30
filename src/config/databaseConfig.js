import { isProductionEnvironment } from '../config/environmentConfig';

const { ENVIRONMENT, MONGO_URL } = process.env;

const environments = ['production', 'development', 'test'];

export function getEnvironment() {
  const reportedEnvironment = ENVIRONMENT ? ENVIRONMENT.toLowerCase() : 'development';
  return environments.includes(reportedEnvironment) ? reportedEnvironment : 'development';
}

const dbName = () => (isProductionEnvironment() ? 'api_prod' : `api_${getEnvironment()}`);

const mongodbUri = () => (isProductionEnvironment() ? MONGO_URL : `mongodb://localhost:27017/${dbName()}`);

export const databaseConfig = {
  name: dbName(),
  databaseUri: mongodbUri(),
  environment: getEnvironment()
};
