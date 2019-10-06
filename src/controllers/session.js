import { generateHmac } from '../common/hashing';
import Session from '../models/session/session';

export const createSession = async (args) => {
  const { hmacToken: sessionId, rawToken } = await generateHmac();
  const payload = Object.assign({}, args, { sessionId });
  const session = await Session.create(payload)
    .save();
  return {
    session,
    rawToken
  };
};

export const isSessionValid = async (sessionId) => {
  const session = await Session.findActiveBySessionId(sessionId);
  return session !== null;
};


export const extendSessionExpiry = async ({ headers }) =>
  Session.extendExpiry(headers['x-session-id']);
