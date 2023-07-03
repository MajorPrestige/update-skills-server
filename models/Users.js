const Joi = require('joi');

const userSchema = Joi.object({
  user: Joi.string().required(),
  avatar: Joi.string().required(),
  followers: Joi.number().required(),
  tweets: Joi.number().required(),
  id: Joi.string().required(),
});

module.exports = userSchema;