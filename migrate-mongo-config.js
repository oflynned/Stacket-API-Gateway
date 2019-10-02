require('@babel/register');
require('@babel/polyfill');

const { ConnectionStringParser } = require('connection-string-parser');

const dbConfig = require('./src/config/databaseConfig');

const connectionStringParser = new ConnectionStringParser({
  scheme: 'mongodb',
  hosts: []
});

const { endpoint: dbName } = connectionStringParser.parse(dbConfig.default.databaseUri);

const config = {
  mongodb: {
    url: dbConfig.default.databaseUri,
    databaseName: dbName,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'migrations'
};

module.exports = config;
