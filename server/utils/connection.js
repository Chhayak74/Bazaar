const MongoDbDriver = require('mongodb');

const { MongoClient } = MongoDbDriver;
const mongoDb = new MongoClient(process.env.MONGODB_URL_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connect = async(callback) => {
  console.log('Connecting to db...');
  await mongoDb.connect();
  console.log('Connected to db!');
  callback();
}
const get = (name) => {
  return mongoDb.db('bazaar').collection(name);
}

const close = () => {
  mongoDb.close();
}

module.exports = {
  connect,
  get,
  close
};