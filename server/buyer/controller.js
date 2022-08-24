const service = require( './service.js');
const validation = require('./validation.js');

const listSellers = async (req, res, next) => {
  try {
    const { statusCode, data} = await service.listSellers();
    return res.status(statusCode).send(data);
  } catch (ex) {
    console.log(ex);
    return res.status(400).send({
      message: ex.message ?? ex
    });
  }
};

const getCatalog = async (req, res, next) => {
  try {
    const payload = {
      sellerId: req.params.seller_id
    }
    await validation.getCatalog(payload);
    const { statusCode, data} = await service.getCatalog(payload);
    return res.status(statusCode).send(data);
  } catch (ex) {
    console.log(ex);
    return res.status(400).send({
      message: ex.message ?? ex
    });
  }
}

const createOrder = async (req, res, next) => {
  try {
    const payload = {
      sellerId: req.params.seller_id,
      ...req.body
    }
    await validation.createOrder(payload);
    const {
      products,
      address
    } = req.body;
    const { statusCode, data} = await service.createOrder({
      sellerId: payload.sellerId,
      userId: req.user._id,
      products,
      address
    });
    return res.status(statusCode).send(data);
  } catch (ex) {
    console.log(ex);
    return res.status(400).send({
      message: ex.message ?? ex
    });
  }
}

module.exports =  {
  listSellers,
  getCatalog,
  createOrder
};
