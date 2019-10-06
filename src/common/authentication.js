import User from '../models/user/user';
import { removeAccountPasswordMatch } from './featureFlags';
import { isSessionValid } from '../controllers/session';

export const decodeAuthorization = (auth) => {
  const rawDigest = auth.replace('Basic ', '');
  const credentials = Buffer.from(rawDigest, 'base64')
    .toString('ascii')
    .split(':');
  return {
    email: credentials[0],
    password: credentials.slice(1)
      .join(':')
  };
};

function manageHeaders({ headers }) {
  const { authorization } = headers;
  if (authorization === undefined || authorization === null || !authorization.includes('Basic')) {
    throw new Error('bad_request');
  }

  Object.assign(headers, decodeAuthorization(authorization));
}

async function checkUserExists({ headers }) {
  const { email } = headers;
  return User.doesUserExist(email);
}

async function checkUserCredentials({ headers }) {
  const { email, password: passwordAttempt } = headers;
  return User.doesPasswordMatch(email, passwordAttempt);
}

export const checkAuthorization = async (req, res, next) => {
  try {
    await manageHeaders(req);
    const exists = await checkUserExists(req);

    let isValid;
    if (removeAccountPasswordMatch()) {
      isValid = true;
    } else {
      isValid = await checkUserCredentials(req);
    }

    if (exists && isValid) {
      req.user = await User.findByEmail(req.headers.email);
    } else {
      delete req.user;
    }

    next();
  } catch (err) {
    res.status(400)
      .send({ error: err.message });
  }
};

export const enforceValidSession = async (req, res, next) => {
  const isValid = await isSessionValid(req.headers['x-session-id']);
  if (!isValid) {
    return res.status(403)
      .json({ error: 'invalid_session_id' });
  }

  next();
};

export const enforceAuthorization = async (req, res, next) => {
  try {
    await manageHeaders(req);
    const exists = await checkUserExists(req);
    const isValid = await checkUserCredentials(req);
    if (!(exists && isValid)) {
      throw new Error('bad_credentials');
    }

    req.user = await User.findByEmail(req.headers.email);
    next();
  } catch (err) {
    switch (err.message) {
      default:
      case 'bad_request':
        res.status(400)
          .send({ error: err.message });
        break;
      case 'bad_credentials':
        res.status(401)
          .send({ error: err.message });
        break;
      case 'user_not_verified':
        res.status(403)
          .send({ error: err.message });
        break;
      case 'user_does_not_exist':
        res.status(404)
          .send({ error: err.message });
        break;
    }
  }
};
