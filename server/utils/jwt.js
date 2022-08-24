const jwt = require( 'jsonwebtoken');
const MongoDbDriver = require('mongodb');
const { ObjectId } = MongoDbDriver;
const  db  = require('./connection.js');

const token = (sub) => {
  return jwt.sign({ sub }, process.env.SECRET_KEY, { expiresIn: '1h'});
}

const  authVerify = async(token) =>  {
  const { sub } = jwt.decode(token);
  const user = await db.get('users').findOne({ _id: ObjectId(sub)});
  jwt.verify(token, process.env.SECRET_KEY, { expiresIn: '1h'});
  return { token: jwt.sign({ sub }, process.env.SECRET_KEY, { expiresIn: '1h'}), user };
}

module.exports =  {
  authVerify,
  token
};
