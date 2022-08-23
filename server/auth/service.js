const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const db = require('../utils/connection.js');
const jwt = require('../utils/jwt.js');

const register = async ({
  email,
  password,
  type
}) => {
  const user = await db.get().collection('users').findOne({ email });
  if (user) {
    throw new Error('User is already registered');
  }
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = scryptSync(password, salt, 64).toString('hex');

  const { insertedId } = await db.get().collection('users').findOneAndUpdate({
    email,
    secret: `${salt}:${hashedPassword}`,
    type
  }, {
    upsert: true
  });
  if (insertedId) return getToken(insertedId);
  return { success: false };
}


const login = async ({
  email,
  password
}) => {
  const user = await db.get().collection('users').findOne({ email });
  if (user) {
    const [salt, key] = user.secret.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
    const keyBuffer = Buffer(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) {
      const token = await getToken(user._id);
      return { success: true, token };
    } else {
      throw new Error('Login failed');
    }
  }
  throw new Error('User not registered');
}

const getToken = async (_id) => {
  return jwt.token(_id);
}
module.exports = {
  login,
  register
};
