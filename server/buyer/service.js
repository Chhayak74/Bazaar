const { ObjectId } = require('mongodb');

const db = require('../utils/connection.js');

const listSellers = async () => {
  const sellersList = await db.get('catalogs').find().toArray();
  if (!sellersList || !Array.isArray(sellersList) || sellersList.length == 0) {
    return {
      statusCode: 500,
      data: {
        message: 'Something went wrong!'
      }
    }
  }
  return {
    statusCode: 200,
    data: {
      sellersList: sellersList.map(({
        name,
        category,
        imgUrl,
        sellerId
      }) => ({
        name,
        category,
        imgUrl,
        sellerId
      }))
    }
  }
}


const getCatalog = async ({
  sellerId
}) => {
  const catalog = await db.get('catalogs').findOne({ sellerId: ObjectId(sellerId) });
  if (!catalog) {
    return {
      statusCode: 500,
      data: {
        message: 'Something went wrong!'
      }
    }
  }
  return {
    statusCode: 200,
    data: {
      products: catalog.products.map(product => ({
        productId: product._id,
        ...product
      }))
    }
  }
}

const createOrder = async ({
  sellerId,
  userId,
  products,
  address
}) => {
  const { lastErrorObject: { upserted, updatedExisting }, value } = await db.get('orders').findOneAndUpdate({
    sellerId: ObjectId(sellerId),
    userId: ObjectId(userId)
  }, {
    $setOnInsert: {
      sellerId: ObjectId(sellerId),
      userId: ObjectId(userId),
      address,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    $push: {
      products: {
        $each: products.map(({ productId, qty }) => ({
          productId: ObjectId(productId),
          status: process.env.DEFAULT_ORDER_STATUS,
          qty
        }))
      }
    }
  }, {
    upsert: true
  });
  if (upserted || updatedExisting) return {
    statusCode: 200,
    data: {
      message: 'order placed successfully'
    }
  };
  return {
    statusCode: 500,
    data: {
      message: 'Something went wrong!'
    }
  }
}

module.exports = {
  getCatalog,
  listSellers,
  createOrder
};
