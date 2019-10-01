import databaseConfig, { collections } from '../../src/config/databaseConfig';

const db = require('monk')(databaseConfig.databaseUri);

export const dropDb = async () =>
  Promise.all(collections.map(col => db.get(col)
    .drop()));

export const dropDbKeepCollections = async toIgnore =>
  Promise.all(collections.filter(col => !toIgnore.includes(col))
    .map(col => db.get(col)
      .drop()));
