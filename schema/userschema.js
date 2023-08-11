const Joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const userSchema = Joi.object().keys({
  username: Joi.string().required(),
  password:joiPassword
    .string()
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .required(),
  email: Joi.string().email().required(),
});

module.exports = userSchema;
