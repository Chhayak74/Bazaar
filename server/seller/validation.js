const Joi = require('joi');

const validator = (schema) => async (payload) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (error) {
    const formattedMessage = error.details.map((err) => err.message);
    throw new Error(formattedMessage);
  }
};

const createCatalog = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2),
    imgUrl: Joi.string(),
    category: Joi.string().valid('Grocery', 'Stationary', 'Electrical').required(),
    products: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      avaiableQty: Joi.number().required(),
      price: Joi.number().required(),
      currency: Joi.string()
    }))
  });
  return validator(schema)(payload);
};

module.exports = {
  createCatalog
};
