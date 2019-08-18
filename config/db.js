const { getEnvironment, getCollection } = require("./collections");

const { dbName } = getCollection();

module.exports = {
  get dbName () {
    return dbName;
  },

  get mongoUrl () {
    const developmentUrl = `mongodb://localhost:27017/${dbName}`;
    const productionUrl = process.env.MONGO_URL;
    return getEnvironment() === "production" ? productionUrl : developmentUrl;
  }
};
