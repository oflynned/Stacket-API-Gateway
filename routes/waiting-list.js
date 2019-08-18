import {createRecord, getRecords} from "../common/record";

const express = require('express');
const router = express.Router();

const collection = "waiting-list";

router.post('/', async (req, res) => {
    const {email} = req.body;
    if (!email) {
        res.status(400).send();
        return;
    }

    await createRecord(collection, {email});
    res.status(204).send();
});

router.get("/", async (req, res) => {
    const emails = await getRecords(collection, {});
    res.status(200).json(emails);
});

module.exports = router;
