const service = require( './service.js');

const register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      type
    } = req.body;
    const token = await service.register({
      email,
      password,
      type
    });
    return res.send({
      statusCode: 200,
      token
    });
  } catch (ex) {
    return next(ex);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await service.login({
      email, password
    });
    return res.send({
      statusCode: 200,
      token
    });
  } catch (ex) {
    console.log(ex);
    return next(ex);
  }
}
module.exports =  {
  login,
  register
};
