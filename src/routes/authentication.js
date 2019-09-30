import { checkAuthorization, enforceAuthorization } from '../common/authentication';
import { createUser } from '../controllers/user';
import createSession from '../controllers/session';
import Session from '../models/session/session';

const express = require('express');

const router = express.Router({ mergeParams: true });

// soft-check to see if the email:password basic combination corresponds to a user account
// if not, then a new account is created
router.post(
  '/',
  checkAuthorization,
  async (req, res) => {
    if (req.user) {
      res.status(200)
        .json(req.user);
    } else {
      try {
        const account = await createUser(req);
        res.status(201)
          .json(account);
      } catch (err) {
        res.status(400)
          .json({ error: err.message });
      }
    }
  }
);

// for requesting a new session
// TODO should this be unlimited or restricted? Sessions expire within 8 hours anyway.
// TODO how should we deal with session blacklisting?
router.get(
  '/',
  enforceAuthorization,
  async (req, res) => {
    try {
      const { rawToken: sessionId } = await createSession({ user: req.user._id });
      res.status(201)
        .json({ sessionId });
    } catch (err) {
      res.status(401)
        .json({ error: err.message });
    }
  }
);

// for use on logging out so that an old session can be marked as inactive or destroyed
// TODO should sessions be stored with an active flag, or destroyed outright?
router.delete(
  '/',
  enforceAuthorization,
  async (req, res) => {
    await Session.purgeSession(req.headers['x-session-id']);
    res.status(204)
      .send();
  }
);

module.exports = router;
