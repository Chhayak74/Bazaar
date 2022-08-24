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
    next(res.status(400).send({ message: 'Authentication error' }));
  }
}

module.exports =  {
  authenticate
};
