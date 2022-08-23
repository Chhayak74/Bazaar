const service = require( './service.js');
const listSellers = async (req, res, next) => {
  try {
    const data = await service.listSellers();
    return res.send(data);
  } catch (ex) {
    return next(ex);
  }
};

const getCatalog = async (req, res, next) => {
  try {
    const sellerId  = req.params.seller_id;;
    const data = await service.getCatalog({
      sellerId
    });
    return res.send(data);
  } catch (ex) {
    console.log(ex);
    return next(ex);
  }
}

const createOrder = async (req, res, next) => {
  try {
    const sellerId  = req.params.seller_id;
    const {
      products,
      address,
      status
    } = req.body;
    const data = await service.createOrder({
      sellerId,
      userId: req.user._id,
      products,
      address,
      status
    });
    return res.send(data);
  } catch (ex) {
    console.log(ex);
    return next(ex);
  }
}

module.exports =  {
  listSellers,
  getCatalog,
  createOrder
};
