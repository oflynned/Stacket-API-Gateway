import { isProductionEnvironment } from './environmentConfig';

const { SESSION_SECRET } = process.env;

const authenticationConfig = {
  sessionSecret: (isProductionEnvironment() ? SESSION_SECRET : 'secret'),
  hashIterations: (isProductionEnvironment() ? 12 : 1)
};

export default authenticationConfig;
