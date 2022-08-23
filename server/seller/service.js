const { ObjectId } = require('mongodb');
const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');
const db = require('../db/mongo/connection.js');
const jwt = require('./jwt.js');
const createCatalog = async ({
  name,
  imgUrl,
  category,
  userId
}) => {
  const { insertedId } = await db.get().collection('catalog').insertOne({
    name,
    imgUrl,
    category,
    userId: ObjectId(userId)
  }, {
    upsert: true
  });
  if (insertedId) return { success: true };
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
