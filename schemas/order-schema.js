const Joi = require("joi");

const orderSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .messages({ "any.required": "Missing 'first name' field" }),
  lastName: Joi.string()
    .required()
    .messages({ "any.required": "Missing 'last name' field" }),
  phoneNumber: Joi.string()
    .required()
    .messages({ "any.required": "Missing 'phone number' field" }),
  address: Joi.string()
    .required()
    .messages({ "any.required": "Missing 'address' field" }),
  deliveryDate: Joi.date()
    .required()
    .messages({ "any.required": "Missing 'delivery date' field" }),
  bouquets: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        url: Joi.string().required(),
        type: Joi.string().required(),
        new: Joi.boolean().required(),
        composition: Joi.array().required(),
      })
    )
    .min(1)
    .required(),
});

module.exports = {
  orderSchema,
};
