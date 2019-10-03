import { isDevelopmentEnvironment } from '../config/environmentConfig';

const {
  DEV_ALLOW_EXPIRED_SESSIONS_OVERRIDE,
  DEV_ALLOW_ACCOUNT_PASSWORD_OVERRIDE
} = process.env;

// TODO move this to its own feature page to change per environment via the db

const isOverridingExpiredSessions = DEV_ALLOW_EXPIRED_SESSIONS_OVERRIDE || false;
export const allowExpiredSessions = () =>
  !(isOverridingExpiredSessions && isDevelopmentEnvironment());

const isOverridingAccountPassword = DEV_ALLOW_ACCOUNT_PASSWORD_OVERRIDE || false;

export const removeAccountPasswordMatch = () =>
  isOverridingAccountPassword && isDevelopmentEnvironment();
