const environments = ['production', 'development', 'test'];

export function getEnvironment() {
  const { ENVIRONMENT } = process.env;
  const reportedEnvironment = ENVIRONMENT ? process.env.ENVIRONMENT.toLowerCase() : 'development';
  return environments.includes(reportedEnvironment) ? reportedEnvironment : 'development';
}

export const databaseConfig = {
  name: getEnvironment() === 'production' ? 'api_prod' : `api_${getEnvironment()}`,
  environment: getEnvironment()
};
