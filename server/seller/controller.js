const service = require('./service.js');
const validation = require('./validation.js');

const createCatalog = async (req, res, next) => {
  try {
    await validation.createCatalog(req.body);
    const {
      name,
      imgUrl,
      category,
      products
    } = req.body;

    const { statusCode, data } = await service.createCatalog({
      name,
      imgUrl,
      category,
      products,
      userId: req.user._id
    });
    return res.status(statusCode).send(data);
  } catch (ex) {
    console.log(ex);
    return res.status(400).send({
      message: ex.message ?? ex
    });
  }
};

const orders = async (req, res, next) => {
  try {
    const { statusCode, data } = await service.orders({
      sellerId: req.user._id
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
  orders,
  createCatalog
};
