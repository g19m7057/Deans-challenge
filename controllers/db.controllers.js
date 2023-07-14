require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URL)

try{
    let conn = client.connect();
    console.log('Successfully connected to MongoDB');

} catch(err) {
    console.log(`failed to connect to Mongo:${err}`);
    return;
}

const db = client.db('Deans-challenge')

module.exports = {db, client};
