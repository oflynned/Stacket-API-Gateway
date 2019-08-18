import {createRecord} from "../common/record";

const express = require('express');
const router = express.Router();

const collection = "waiting-list";

router.post('/', async (req, res) => {
    const {email} = req.body;
    await createRecord(collection, {email});
    res.status(204).send();
});

module.exports = router;
