const {
  SESSION_SECRET, PORT, ENVIRONMENT, CORS_DOMAIN
} = process.env;

const FALLBACK_PORT = 3001;

const isProductionEnvironment = () => ENVIRONMENT === 'production';

const commonConfig = {
  environment: ENVIRONMENT || 'development',
  port: parseInt(PORT, 10) || FALLBACK_PORT,
  corsDomain: (isProductionEnvironment() ? CORS_DOMAIN : '*')
};

export default commonConfig;