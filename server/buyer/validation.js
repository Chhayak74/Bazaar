const Joi = require('joi');

const validator = (schema) => async (payload) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (error) {
    const formattedMessage = error.details.map((err) => err.message);
    throw new Error(formattedMessage);
  }
};

const createOrder = (payload) => {
  const schema = Joi.object({
    sellerId: Joi.string().alphanum().min(24).max(24).required(),
    products: Joi.array().items(Joi.object({
      productId: Joi.string().alphanum().min(24).max(24).required(),
      qty: Joi.number().integer().positive().required()
    })),
    address: Joi.string().min(20).required()
  });
  return validator(schema)(payload);
};

const getCatalog = (payload) => {
  const schema = Joi.object({
    sellerId: Joi.string().alphanum().min(24).max(24).required()
  });
  return validator(schema)(payload);
};

module.exports = {
  getCatalog,
  createOrder
};
