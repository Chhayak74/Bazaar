const service = require('./service.js');
const validation = require('./validation.js');

const register = async (req, res, next) => {
  try {
    await validation.register(req.body);
    const {
      email,
      password,
      type
    } = req.body;
    const { statusCode, data } = await service.register({
      email,
      password,
      type
    });
    return res.status(statusCode).send(data);
  } catch (ex) {
    console.log(ex);
    return res.status(400).send({
      message: ex.message ?? ex
    });
  }
};

const login = async (req, res, next) => {
  try {
    await validation.login(req.body);
    const { email, password } = req.body;
    const { statusCode, data } = await service.login({
      email, password
    });
    return res.status(statusCode).send(data);
  } catch (ex) {
    console.log(ex);
    return res.status(400).send({
      message: ex.message ?? ex
    });
  }
}
module.exports = {
  login,
  register
};
