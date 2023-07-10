const Joi = require("joi");

const userSchema = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = userSchema;
