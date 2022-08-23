const { ObjectId } = require('mongodb');
const db = require('../utils/connection.js');
const createCatalog = async ({
  name,
  imgUrl,
  category,
  userId,
  products
}) => {
  const response = await db.get().collection('catalogs').findOneAndUpdate({
    name
  }, {
    $set: {
      name,
      imgUrl,
      category,
      products,
      userId: ObjectId(userId)
    }
  }, {
    upsert: true
  });
  if (response.insertedId || response.lastErrorObject?.updatedExisting) return { success: true };
  return { success: false };
}


const orders = async ({
  sellerId
}) => {
  const orders = await db.get().collection('orders').find({ sellerId: ObjectId(sellerId) });
  if (!orders || !Array.isArray(orders) || orders.length == 0) {
    return {
      status: 200,
      message: 'no new orders'
    }
  }
  return {
    status: 200,
    orders
  }
}

module.exports = {
  createCatalog,
  orders
};
