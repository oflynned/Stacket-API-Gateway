const { PORT, ENVIRONMENT, CORS_DOMAIN } = process.env;

const FALLBACK_PORT = 3001;

const environment = ENVIRONMENT || 'development';

export const isProductionEnvironment = () => environment === 'production';

export const isDevelopmentEnvironment = () => environment === 'development';

const commonConfig = {
  environment,
  port: parseInt(PORT, 10) || FALLBACK_PORT,
  corsDomain: (isProductionEnvironment() ? CORS_DOMAIN : '*')
};

export default commonConfig;
