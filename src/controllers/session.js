import { generateHmac } from '../common/hashing';
import Session from '../models/session/session';

const createSession = async (args) => {
  const { hmacToken: sessionId, rawToken } = await generateHmac();
  const payload = Object.assign({}, args, { sessionId });
  const session = await Session.create(payload)
    .save();
  return {
    session,
    rawToken
  };
};

export default createSession;
