const express = require('express');

const router = express.Router({ mergeParams: true });

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
