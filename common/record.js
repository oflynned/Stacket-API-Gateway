const config = require("../config/db");
const ObjectId = require("mongodb").ObjectId;
export const db = require("monk")(config.mongoUrl);

export const createRecord = async (collection, data) => {
    if (!collection) {
        throw new Error("empty_collection");
    }

    if (!data) {
        throw new Error("empty_data");
    }
    const record = Object.assign({}, {createdAt: Date.now(), updatedAt: null}, data);
    return db.get(collection).insert(record);
};

export const aggregateRecords = async (collection, query) =>
    db.get(collection).aggregate(query);

export const getRecords = async (collection, filter = {}, hiddenFields = {}) =>
    db.get(collection).find(filter, hiddenFields);

export const modifyRecord = async (collection, data, id) => {
    const record = await db.get(collection).findOne({_id: ObjectId(id)});
    await db.get(collection).update(
        {_id: ObjectId(id)},
        {
            "$set": Object.assign({}, record, data,
                {createdAt: record.createdAt, updatedAt: Date.now()})
        });
    return db.get(collection).findOne({_id: ObjectId(id)});
};

export const deleteRecord = async (collection, id) =>
    db.get(collection).remove({_id: ObjectId(id)});

export const deleteRecords = async (collection, filter) =>
    db.get(collection).remove(filter, {multi: true});
