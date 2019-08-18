const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.json({email: req.email || "email"});
});

module.exports = router;
