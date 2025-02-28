const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

module.exports = client;