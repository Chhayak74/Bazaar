const jwt = require('../utils/jwt.js');

const authenticate = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;
    const inputToken = (authorization && authorization.split(' ')[1]) || '';
    const { user, token } = await jwt.authVerify(inputToken);
    req.user = user;
    res.set('Authorization', `Bearer ${token}`);
    next();
  } catch (err) {
    next(new Error(err));
  }
}

module.exports =  {
  authenticate
};
