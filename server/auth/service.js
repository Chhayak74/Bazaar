const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const db = require('../utils/connection.js');
const jwt = require('../utils/jwt.js');

const register = async ({
  email,
  password,
  type
}) => {
  const user = await db.get('users').findOne({ email });
  if (user) {
    return {
      statusCode: 400,
      data: {
        message: 'User is already registered'
      }
    };
  }
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = scryptSync(password, salt, 64).toString('hex');

  const { insertedId } = await db.get('users').insertOne({
    email,
    secret: `${salt}:${hashedPassword}`,
    type,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    upsert: true
  }).catch((dbErr) => {
    console.log(dbErr);
    return {
      statusCode: 500,
      data: {
        message: 'DB Insertion Error'
      }
    };
  });
  if (insertedId) return {
    statusCode: 200,
    data: {
      token: await getToken(insertedId)
    }
  };
  return {
    statusCode: 500,
    data: {
      message: 'Something went wrong!'
    }
  }
}


const login = async ({
  email,
  password
}) => {
  const user = await db.get('users').findOne({ email });
  if (!user) {
    return {
      statusCode: 400,
      data: {
        message: 'User not registered'
      }
    };
  }
  const [salt, key] = user.secret.split(':');
  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer(key, 'hex');
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  if (match) {
    return {
      statusCode: 200,
      data: {
        token: await getToken(user._id),
        message: 'Login success!'
      }
    };
  } else {
    return {
      statusCode: 500,
      data: {
        message: 'Something went wrong. Login failed!'
      }
    };
  }
}

const getToken = async (_id) => {
  return jwt.token(_id);
}
module.exports = {
  login,
  register
};
