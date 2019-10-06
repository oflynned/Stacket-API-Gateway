import { checkAuthorization, enforceValidSession } from '../common/authentication';
import { createUser } from '../controllers/user';
import { createSession, extendSessionExpiry } from '../controllers/session';
import Session from '../models/session/session';

const express = require('express');

const router = express.Router();

// soft-check to see if the email:password basic combination corresponds to a user account
// if not, then a new account is created
// its use is for requesting a new session
router.post(
  '/',
  checkAuthorization,
  async (req, res) => {
    let { user } = req;
    let isNewUser = false;

    if (!user) {
      try {
        user = await createUser(req);
        isNewUser = true;
      } catch (err) {
        return res.status(400)
          .json({ error: err.message });
      }
    }

    const { _id, name } = user;
    const { rawToken } = await createSession(user);
    res.status(isNewUser ? 201 : 200)
      .json({
        session: rawToken,
        user: {
          _id,
          name
        }
      });
  }
);

// for checking if a session is valid or not for the FE in order to redirect
router.get(
  '/',
  enforceValidSession,
  async (req, res) => {
    await extendSessionExpiry(req);
    res.status(204)
      .send();
  }
);

// for use on logging out so that an old session can be marked as inactive or destroyed
// TODO should sessions be stored with an active flag, or destroyed outright?
router.delete(
  '/',
  enforceValidSession,
  async (req, res) => {
    await Session.purgeSession(req.headers['x-session-id']);
    res.status(204)
      .send();
  }
);

module.exports = router;
