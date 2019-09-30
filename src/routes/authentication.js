import { checkAuthorization, enforceAuthorization } from '../common/authentication';
import { createUser } from '../controllers/user';
import createSession from '../controllers/session';

const express = require('express');

const router = express.Router({ mergeParams: true });

router.post(
  '/register',
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

router.get(
  '/login',
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

module.exports = router;
