const Joi = require('joi');

const validator = (schema) => async (payload) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (error) {
    const formattedMessage = error.details.map((err) => err.message);
    throw new Error(formattedMessage);
  }
};

const login = (payload) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: true }
    }).required(),
    password: Joi.string().min(8).required()
  });
  return validator(schema)(payload);
};

const register = (payload) => {
  const schema = Joi.object({
    type: Joi.string().valid('seller', 'buyer').required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: true }
      })
      .required(),
    password: Joi.string().min(8).required()
  });
  return validator(schema)(payload);
};

module.exports = {
  login,
  register
};
