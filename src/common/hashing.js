import bcrypt from 'bcrypt';
import crypto from 'crypto';
import uuid from 'node-uuid';

import authenticationConfig from '../config/authenticationConfig';
import { isProductionEnvironment } from '../config/environmentConfig';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(authenticationConfig.hashIterations);
  return bcrypt.hash(password, salt);
};

export const generateHmac = async () => {
  const rawToken = uuid();
  const hmacToken = await generateHmacFromToken(rawToken);
  return {
    hmacToken,
    rawToken
  };
};

export const generateHmacFromToken = async token =>
  crypto.createHmac('sha256', authenticationConfig.sessionSecret)
    .update(token)
    .digest('hex');

export const isMatchingHmac = async (tokenAttempt, hmac) => {
  const attemptHash = await generateHmacFromToken(tokenAttempt);
  return attemptHash === hmac;
};

export const isMatchingPassword = async (passwordAttempt, hash) => {
  return bcrypt.compare(passwordAttempt, hash);
};

export const isPasswordFollowingRegulations = (password) => {
  if (isProductionEnvironment()) {
    // TODO replace with regex and actual rules
    return password.length >= 6 && password.length <= 256;
  }

  return password.length > 0;
};
