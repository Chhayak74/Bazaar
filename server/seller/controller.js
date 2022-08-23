const service = require( './service.js');
const createCatalog = async (req, res, next) => {
  try {
    const {
      name,
      imgUrl,
      category,
      products
    } = req.body;

    const data = await service.createCatalog({
      name,
      imgUrl,
      category,
      products,
      userId: req.user._id
    });
    return res.send(data);
  } catch (ex) {
    return next(ex);
  }
};

const orders = async (req, res, next) => {
  try {
    const data = await service.orders(userId);
    return res.send(data);
  } catch (ex) {
    console.log(ex);
    return next(ex);
  }
}
module.exports =  {
  orders,
  createCatalog
};
