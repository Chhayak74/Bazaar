const { ObjectId } = require('mongodb');

const db = require('../utils/connection.js');

const createCatalog = async ({
  name,
  imgUrl,
  category,
  userId,
  products
}) => {
  const response = await db.get('catalogs').findOneAndUpdate({
    name
  }, {
    $set: {
      name,
      imgUrl,
      category,
      products: products.map(product => ({
        _id: new ObjectId(),
        currency: process.env.DEFAULT_PRODUCT_CURRENCY,
        ...product
      })),
      sellerId: ObjectId(userId)
    }
  }, {
    upsert: true
  });
  if (response.lastErrorObject?.upserted || response.lastErrorObject.updatedExisting) return {
    statusCode: 200,
    data: {
      message: 'Catalog created/updated successfully',
      catalogId: String(response.value?._id)
    }
  };
  return {
    statusCode: 500,
    data: {
      message: 'Something went wrong'
    }
  };
}

const orders = async ({
  sellerId
}) => {
  const orders = await db.get('orders').find({ sellerId: ObjectId(sellerId) }).toArray();
  if (!orders || !Array.isArray(orders) || orders.length == 0) {
    return {
      statusCode: 200,
      data: {
        message: 'No new orders'
      }
    }
  }
  return {
    statusCode: 200,
    data: { orders }
  }
}

module.exports = {
  createCatalog,
  orders
};
