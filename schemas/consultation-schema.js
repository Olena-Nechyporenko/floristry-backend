const Joi = require("joi");

const consultationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .messages({ "any.required": "Missing 'first name' field" }),
  lastName: Joi.string()
    .required()
    .messages({ "any.required": "Missing 'last name' field" }),
  phoneNumber: Joi.string()
    .required()
    .messages({ "any.required": "Missing 'phone number' field" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing 'email' field" }),
});

module.exports = {
  consultationSchema,
};
