const { ObjectId } = require('mongodb');

const db = require('../utils/connection.js');

const listSellers = async () => {
  const sellersList = await db.get().collection('catalog').find();
  if(!sellersList || !Array.isArray(sellersList) || sellersList.length == 0) {
    return {
      status: 200,
      message: 'Something went wrong!'
    }
  }
  return {
    status: 200,
    sellersList
  }
}


const getCatalog = async ({
  sellerId
}) => {
  const catalog = await db.get().collection('catalog').find({ _id: ObjectId(sellerId) });
  if(!catalog || !Array.isArray(catalog) || catalog.length == 0) {
    return {
      status: 200,
      message: 'Something went wrong!'
    }
  }
  return {
    status: 200,
    catalog
  }
}

module.exports = {
  getCatalog,
  listSellers
};
