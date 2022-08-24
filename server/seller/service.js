const { ObjectId } = require('mongodb');

const db = require('../utils/connection.js');

const createCatalog = async ({
  name,
  imgUrl,
  category,
  userId,
  products
}) => {
  const { lastErrorObject: { upserted, updatedExisting }, value } = await db.get('catalogs').findOneAndUpdate({
    name
  }, {
    $setOnInsert: {
      name,
      imgUrl,
      category,
      sellerId: ObjectId(userId),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    $push: {
      products: {
        $each: products.map(product => ({
          _id: new ObjectId(),
          currency: process.env.DEFAULT_PRODUCT_CURRENCY,
          ...product
        }))
      }
    }
  }, {
    upsert: true
  });
  if (upserted || updatedExisting) return {
    statusCode: 200,
    data: {
      message: 'Catalog created/updated successfully',
      catalogId: updatedExisting? String(value?._id) : String(upserted)
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
